"use server";

import { stripe } from "@/lib/payment/stripe";
import { Price, Product } from "@/types/stripe";
import Stripe from "stripe";
import { db } from "@/lib/db/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

// Change to control trial period length
const TRIAL_PERIOD_DAYS = 0;

export const toDateTime = (secs: number) => {
  var t = new Date(+0); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

async function upsertProductRecord(product: Stripe.Product) {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata,
  };

  try {
    const productDb = await getDoc(doc(db, "products", product.id));

    if (productDb.exists()) {
      await updateDoc(doc(db, "products", product.id), productData);
    } else {
      await setDoc(doc(db, "products", product.id), productData);
    }

    return productData;
  } catch (error) {
    console.error("Error upserting product record:", error);
  }
}

const upsertPriceRecord = async (
  price: Stripe.Price,
  retryCount = 0,
  maxRetries = 3
) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === "string" ? price.product : "",
    active: price.active,
    currency: price.currency,
    type: price.type,
    unit_amount: price.unit_amount ?? null,
    interval: price.recurring?.interval ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    trial_period_days: price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS,
  };

  try {
    const priceDb = await getDoc(doc(db, "prices", price.id));

    if (priceDb.exists()) {
      await updateDoc(doc(db, "prices", price.id), priceData);
    } else {
      await setDoc(doc(db, "prices", price.id), priceData);
    }

    return priceData;
  } catch (error) {
    if (retryCount < maxRetries) {
      console.error("Error upserting price record:", error);
      return upsertPriceRecord(price, retryCount + 1, maxRetries);
    } else {
      throw error;
    }
  }
};

const deleteProductRecord = async (product: Stripe.Product) => {
  try {
    await deleteDoc(doc(db, "products", product.id));
  } catch (error) {
    console.error("Error deleting product record:", error);
  }
};

const deletePriceRecord = async (price: Stripe.Price) => {
  try {
    await deleteDoc(doc(db, "prices", price.id));
  } catch (error) {
    console.error("Error deleting price record:", error);
  }
};

const upsertCustomerToFirebase = async (uuid: string, customerId: string) => {
  try {
    await setDoc(
      doc(db, "customers", uuid),
      { stripe_customer_id: customerId },
      { merge: true }
    );
  } catch (error) {
    console.error("Error upserting customer to Supabase:", error);
  }
};

const createCustomerInStripe = async (uuid: string, email: string) => {
  const customerData = { metadata: { firebaseUUID: uuid }, email: email };
  const newCustomer = await stripe.customers.create(customerData);

  console.log("Creating new customer in Stripe:", newCustomer);

  if (!newCustomer) throw new Error("Stripe customer creation failed.");

  return newCustomer.id;
};

/**
 * Creates or retrieves a customer in Stripe, using the provided email and Firebase UUID.
 * If the customer already exists in the database, their Stripe customer ID is returned.
 * If not, the function attempts to retrieve the Stripe customer ID using the Firebase customer ID or email,
 * and creates a new customer in Stripe if necessary.
 *
 * @param {Object} params - An object containing the customer's email and Firebase UUID.
 * @param {string} params.email - The customer's email address.
 * @param {string} params.uuid - The customer's Firebase UUID.
 * @return {string} The customer's Stripe customer ID.
 */
const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  console.log("Running function: Create or Retrieve Customer");

  try {
    // Check if the customer already exists in db
    const customerDb = await getDoc(doc(db, "customers", uuid));
    if (customerDb.exists()) {
      console.log("Customer exists");
      return customerDb.data().stripe_customer_id;
    }

    // Retrieve the Stripe customer ID using the Firebase customer ID, with email fallback
    let stripeCustomerId: string | undefined;
    if (customerDb.data()?.stripe_customer_id) {
      console.log("Retrieving customer through stripe.customers.retrieve");
      const existingStripeCustomer = await stripe.customers.retrieve(
        customerDb.data()?.stripe_customer_id
      );
      stripeCustomerId = existingStripeCustomer.id;
    } else {
      // If Stripe ID is missing from Firebase, try to retrieve Stripe customer ID by email
      console.log(
        "Customer is missing Stripe ID. Retrieving customer through stripe w/ email via stripe.customers.list"
      );
      const stripeCustomers = await stripe.customers.list({ email: email });
      stripeCustomerId =
        stripeCustomers.data.length > 0
          ? stripeCustomers.data[0].id
          : undefined;
    }

    console.log("Stripe customer ID:", stripeCustomerId);

    // If still no stripeCustomerId, create a new customer in Stripe
    const stripeIdToInsert = stripeCustomerId
      ? stripeCustomerId
      : await createCustomerInStripe(uuid, email);

    if (!stripeIdToInsert) {
      console.log("Stripe customer creation failed.");
      throw new Error("Stripe customer creation failed.");
    }

    stripeCustomerId = stripeIdToInsert;

    console.log("Updated stripe customer ID:", stripeCustomerId);
    //
    if (customerDb.exists() && stripeCustomerId) {
      console.log("Updating customer in Firebase");
      // If Firebase has a record but doesn't match Stripe, update Firebase record
      if (customerDb.data().stripe_customer_id !== stripeCustomerId) {
        await updateDoc(doc(db, "customers", uuid), {
          stripe_customer_id: stripeCustomerId,
        });
        console.log(
          `Firebase customer record mismatched Stripe ID. Firebase record updated.`
        );
        return stripeCustomerId;
      }
    } else {
      console.log(
        `Firebase customer record was missing. A new record was created.`
      );

      // If Firebase has no record, create a new record and return Stripe customer ID
      await upsertCustomerToFirebase(uuid, stripeCustomerId);
      return stripeCustomerId;
    }
    //
  } catch (error) {
    console.error("Error creating or retrieving customer:", error);
  }
};

const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //Todo: check this assertion
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  //@ts-ignore
  await stripe.customers.update(customer, { name, phone, address });
  await updateDoc(doc(db, "users", uuid), {
    billing_address: {
      ...address,
    },
    payment_method: {
      ...payment_method[payment_method.type],
    },
  });
};

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from db
  const customerRef = query(
    collection(db, "customers"),
    where("stripe_customer_id", "==", customerId)
  );
  const customer = (await getDocs(customerRef)).docs[0];

  if (!customer) return;
  const uuid = customer.id;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  });

  console.log("Subscription update date:", subscription.current_period_end);

  // Upsert the latest status of the subscription object.
  const subscriptionData = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    //TODO check quantity on subscription
    // @ts-ignore
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at
      ? toDateTime(subscription.cancel_at)
      : null,
    canceled_at: subscription.canceled_at
      ? toDateTime(subscription.canceled_at)
      : null,
    current_period_start: toDateTime(subscription.current_period_start),
    current_period_end: toDateTime(subscription.current_period_end),
    created: toDateTime(subscription.created),
    ended_at: subscription.ended_at ? toDateTime(subscription.ended_at) : null,
    trial_start: subscription.trial_start
      ? toDateTime(subscription.trial_start)
      : null,
    trial_end: subscription.trial_end
      ? toDateTime(subscription.trial_end)
      : null,
  };

  await setDoc(
    doc(db, "subscriptions", subscription.id),
    {
      subscription: subscriptionData,
    },
    { merge: true }
  );

  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
};

export {
  upsertProductRecord,
  upsertPriceRecord,
  deleteProductRecord,
  deletePriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
};
