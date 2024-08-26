import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { braveId, liked } = await request.json();
    const userId = 2; // Hardcoded user ID for now

    // Check if the record already exists
    const { data: existingLike, error: checkError } = await supabase
      .from("like_counts")
      .select("*")
      .match({ brave_id: braveId, user_id: userId })
      .single();

    if (checkError && checkError.code !== "PGRST116") throw checkError; // Throw error if it's not a "not found" error

    if (liked) {
      // Add like if it doesn't exist
      if (!existingLike) {
        const { error } = await supabase
          .from("like_counts")
          .insert({ brave_id: braveId, user_id: userId });

        if (error) throw error;
      }
    } else {
      // Remove like if it exists
      if (existingLike) {
        const { error } = await supabase
          .from("like_counts")
          .delete()
          .match({ brave_id: braveId, user_id: userId });

        if (error) throw error;
      }
    }

    // Get updated like count
    const { count, error: countError } = await supabase
      .from("like_counts")
      .select("*", { count: "exact" })
      .eq("brave_id", braveId);

    if (countError) throw countError;

    // The isLiked status is based on the action we just performed
    const isLiked = liked;

    return NextResponse.json(
      { likeCount: count, isLiked: isLiked },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating like:", error);
    return NextResponse.json(
      { error: "Failed to update like" },
      { status: 500 }
    );
  }
}
