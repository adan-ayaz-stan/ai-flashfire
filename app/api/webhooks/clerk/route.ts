import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/lib/db/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error(
        "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
      );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      return new Response("Error occured", {
        status: 400,
      });
    }

    // Get the ID and type
    const eventType = evt.type;

    switch (eventType) {
      // If user is created
      case "user.created":
        try {
          // CREATE THE USER
          await setDoc(doc(db, "users", evt.data.id), evt.data);
        } catch (err) {
          return new NextResponse("Could not sync database. Reason:" + err, {
            status: 501,
          });
        }
        break;
      // If user is updated
      case "user.updated":
        try {
          // UPDATE THE USER
          await updateDoc(doc(db, "users", evt.data.id), {
            ...evt.data,
            // Add a type assertion to the evt.data object to tell TypeScript that it matches the expected type
            ...(evt.data as { [key: string]: any }),
          });
        } catch (err) {
          return new NextResponse("Could not sync database. Reason:" + err, {
            status: 501,
          });
        }
        break;
    }

    return new Response(
      `Success: Event ${eventType} - User ID: ${evt.data.id}`,
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response("Internal Server Error: " + err, {
      status: 400,
    });
  }
}
