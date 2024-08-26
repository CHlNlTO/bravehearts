"use server";

import { revalidatePath } from "next/cache";

export async function addBrave(formData: FormData) {
  const brave = formData.get("brave") as string;
  const userId = 2; // You might want to get this dynamically

  // Determine the base URL
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://bravehearts.vercel.app`
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/social/post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brave, user_id: userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add record");
    }

    const result = await response.json();

    // Revalidate the home page to show the new data
    revalidatePath("/");

    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding record:", error);
    return { success: false, error: "Failed to add record" };
  }
}
