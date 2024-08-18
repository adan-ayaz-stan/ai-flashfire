"use server";

import {
  ProductWithPrices,
  SubscriptionWithProduct,
} from "@/app/p/upgrade/_components/Pricing";
import { db } from "@/lib/db/firebase";
import { Price, Product, Subscription } from "@/types/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { cache } from "react";

export const getUser = cache(async () => {
  const user = await currentUser();
  return user;
});

export const getSubscription = cache(async () => {
  const { userId } = auth();

  const q = query(
    collection(db, "users"),
    where("userId", "==", userId),
    where("status", "==", "active")
  );
  const subscription = await getDocs(q);

  const data = subscription.docs.map((ele) => {
    const d = ele.data();

    return {
      id: ele.id,
      ...d,
    } as SubscriptionWithProduct;
  });

  return data[0];
});

export const getProducts = cache(async () => {
  const q = query(
    collection(db, "products"),
    where("active", "==", true),
    orderBy("metadata", "desc")
  );

  const products = await getDocs(q);

  const qPrices = query(
    collection(db, "prices"),
    where("active", "==", true),
    orderBy("unit_amount", "desc")
  );

  const prices = await getDocs(qPrices);
  const pData = prices.docs.map((ele) => {
    const d = ele.data();

    return {
      id: ele.id,
      ...d,
    } as Price;
  });

  const data = products.docs.map((ele) => {
    const d = ele.data();

    const price = pData.find((p) => p.product_id === d.id);

    return {
      id: ele.id,
      ...d,
      prices: [price],
    } as ProductWithPrices;
  });

  return data;
});

export const getUserData = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const q = query(collection(db, "users"), where("userId", "==", userId));

  const user = await getDocs(q);

  const data = user.docs.map((ele) => {
    const d = ele.data();

    return {
      id: ele.id,
      ...d,
    };
  });

  return data[0];
});
