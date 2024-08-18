"use server";

import { Price } from "@/types/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createOrRetrieveCustomer } from "./admin.actions";
import Stripe from "stripe";
import { stripe } from "@/lib/payment/stripe";

type TPrice = Price;

type CheckoutResponse = {
  errorRedirect?: string;
  sessionId?: string;
};

export const getURL = (path: string = "") => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
      process?.env?.NEXT_PUBLIC_VERCEL_URL &&
        process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : // If neither is set, default to localhost for local development.
        "http://localhost:3000/";

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, "");
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, "");

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

export const calculateTrialEndUnixTimestamp = (
  trialPeriodDays: number | null | undefined
) => {
  // Check if trialPeriodDays is null, undefined, or less than 2 days
  if (
    trialPeriodDays === null ||
    trialPeriodDays === undefined ||
    trialPeriodDays < 2
  ) {
    return undefined;
  }

  const currentDate = new Date(); // Current date and time
  const trialEnd = new Date(
    currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000
  ); // Add trial days
  return Math.floor(trialEnd.getTime() / 1000); // Convert to Unix timestamp in seconds
};

export async function checkoutWithStripe(
  price: Price,
  redirectPath: string = "/pricing/success"
): Promise<CheckoutResponse> {
  try {
    // Get the user
    const user = await currentUser();
    const { userId } = auth();

    // Get email

    if (!userId) {
      throw new Error("User not authenticated");
    }
    // Retrieve or create the customer in Stripe
    let customer: string;

    try {
      customer = await createOrRetrieveCustomer({
        uuid: userId,
        email: user?.primaryEmailAddress?.emailAddress || "",
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to access customer record.");
    }

    if (customer == undefined) {
      throw new Error("Could not get customer.");
    }

    let params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      billing_address_collection: "required",
      customer,
      customer_update: {
        address: "auto",
      },
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      cancel_url: process.env.BASE_URL,
      success_url: process.env.BASE_URL + redirectPath,
    };

    console.log(
      "Trial end:",
      calculateTrialEndUnixTimestamp(price.trial_period_days)
    );

    if (price.type === "recurring") {
      params = {
        ...params,
        mode: "subscription",
        subscription_data: {
          trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days),
        },
      };
    } else if (price.type === "one_time") {
      params = {
        ...params,
        mode: "payment",
      };
    }

    // Create a checkout session in Stripe
    let session;
    try {
      session = await stripe.checkout.sessions.create(params);
    } catch (err) {
      console.error(err);
      throw new Error("Unable to create checkout session.");
    }

    // Instead of returning a Response, just return the data or error.
    if (session) {
      return { sessionId: session.id };
    } else {
      throw new Error("Unable to create checkout session.");
    }
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          error.message,
          "Please try again later or contact a system administrator."
        ),
      };
    } else {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        ),
      };
    }
  }
}

export async function createStripePortal(currentPath: string) {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    let customer;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user.id || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to access customer record.");
    }

    if (!customer) {
      throw new Error("Could not get customer.");
    }

    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: process.env.BASE_URL + "/p/profile",
      });
      if (!url) {
        throw new Error("Could not create billing portal");
      }
      return url;
    } catch (err) {
      console.error(err);
      throw new Error("Could not create billing portal");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return getErrorRedirect(
        currentPath,
        error.message,
        "Please try again later or contact a system administrator."
      );
    } else {
      return getErrorRedirect(
        currentPath,
        "An unknown error occurred.",
        "Please try again later or contact a system administrator."
      );
    }
  }
}

const toastKeyMap: { [key: string]: string[] } = {
  status: ["status", "status_description"],
  error: ["error", "error_description"],
};

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType];

  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`;

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(
      toastDescription
    )}`;
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`;
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`;
  }

  return redirectPath;
};

export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
) =>
  getToastRedirect(
    path,
    "status",
    statusName,
    statusDescription,
    disableButton,
    arbitraryParams
  );

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
) =>
  getToastRedirect(
    path,
    "error",
    errorName,
    errorDescription,
    disableButton,
    arbitraryParams
  );
