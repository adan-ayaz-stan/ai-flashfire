"use client";

import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/payment/stripe.client";
import { cn } from "@/lib/utils";
import {
  checkoutWithStripe,
  createStripePortal,
  getErrorRedirect,
} from "@/server/actions/stripe.actions";
import { Price, Product, Subscription } from "@/types/stripe";
import { useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { Cloud } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type TProduct = Product;
type TPrice = Price;
export interface ProductWithPrices extends Product {
  prices: Price[];
}
export interface PriceWithProduct extends Price {
  products: Product | null;
}

export interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "lifetime" | "year" | "month";

export default function Pricing({ products, subscription }: Props) {
  const { user } = useUser();
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push("/sign-in");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    console.log({ errorRedirect, sessionId });

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  const handleManageSubscription = async () => {
    toast.loading("Redirecting to your subscription portal...", {
      id: "sub-portal",
    });
    const url = await createStripePortal("/p/upgrade");

    if (url) {
      router.push(url);
    } else {
      toast.error(
        "Error redirecting to subscription portal. Please try again."
      );
    }

    toast.dismiss("sub-portal");
  };

  if (!products.length) {
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{" "}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
        <Cloud />
      </section>
    );
  } else {
    return (
      <section className="bg-white">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl">
              Pricing Plans
            </h1>
            <div className="relative self-center mt-6 bg-coolWhite rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
              {intervals.includes("month") && (
                <button
                  onClick={() => setBillingInterval("month")}
                  type="button"
                  className={`${
                    billingInterval === "month"
                      ? "relative w-1/2 bg-davy shadow-sm text-white"
                      : "ml-0.5 relative w-1/2 border border-transparent text-zinc-400"
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Monthly billing
                </button>
              )}
              {intervals.includes("year") && (
                <button
                  onClick={() => setBillingInterval("year")}
                  type="button"
                  className={`${
                    billingInterval === "year"
                      ? "relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white"
                      : "ml-0.5 relative w-1/2 border border-transparent text-zinc-400"
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Yearly billing
                </button>
              )}
            </div>
          </div>
          <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {products.map((product) => {
              const price = product?.prices?.find(
                (price) => price?.interval === billingInterval
              );
              if (!price) return null;
              const priceString = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: price.currency!,
                minimumFractionDigits: 0,
              }).format((price?.unit_amount || 0) / 100);
              return (
                <div
                  key={product.id}
                  className={cn(
                    "flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900",
                    {
                      "border border-pink-500": subscription
                        ? product.name === subscription?.prices?.products?.name
                        : product.name === "Freelancer",
                    },
                    "flex-1", // This makes the flex item grow to fill the space
                    "basis-1/3", // Assuming you want each card to take up roughly a third of the container's width
                    "max-w-xs" // Sets a maximum width to the cards to prevent them from getting too large
                  )}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold leading-6 text-white">
                      {product.name}
                    </h2>
                    <p className="mt-4 text-zinc-300">{product.description}</p>
                    <p className="mt-8">
                      <span className="text-5xl font-extrabold text-white">
                        {priceString}
                      </span>
                      <span className="text-base font-medium text-zinc-100">
                        /{billingInterval}
                      </span>
                    </p>
                    <Button
                      variant="red"
                      type="button"
                      disabled={priceIdLoading === price.id}
                      onClick={() => {
                        if (subscription) {
                          handleManageSubscription();
                        } else {
                          handleStripeCheckout(price);
                        }
                      }}
                      className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md"
                    >
                      {subscription ? "Manage" : "Subscribe"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
