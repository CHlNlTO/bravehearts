import { NextApiRequest, NextApiResponse } from "next";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const webhookSecret = process.env.WEBHOOK_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;

  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, headers as Record<string, string>) as WebhookEvent;
  } catch (err) {
    return res.status(400).json({ message: "Invalid webhook signature" });
  }

  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, username, first_name, last_name } = evt.data;

    const primaryEmail = email_addresses.find(
      (email) => email.id === evt.data.primary_email_address_id
    );

    if (
      !primaryEmail ||
      !primaryEmail.email_address.endsWith("@firstasia.edu.ph")
    ) {
      console.log("User email does not match the required domain");
      return res.status(400).json({ message: "Invalid email domain" });
    }

    const { data, error } = await supabase.from("users").upsert(
      {
        id: id,
        email: primaryEmail.email_address,
        name: `${first_name} ${last_name}`,
        handle: username || `user_${id.slice(0, 8)}`,
        created_at: new Date().toISOString(),
      },
      {
        onConflict: "id",
      }
    );

    if (error) {
      console.error("Error upserting user:", error);
      return res
        .status(500)
        .json({ message: "Error creating user in Supabase" });
    }

    console.log("User upserted successfully:", data);
    return res
      .status(200)
      .json({ message: "User created/updated in Supabase" });
  }

  return res.status(200).json({ message: "Webhook received" });
}
