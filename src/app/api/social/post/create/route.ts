import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust import path as needed

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Get the JSON body of the request
    const { brave, user_id } = body; // Extract fields from the request body

    // Validate input
    if (!brave || !user_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("braves")
      .insert([{ brave, user_id }]);

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error adding record:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
