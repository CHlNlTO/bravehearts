import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { braveId } = await request.json();
    const userId = 2; // Hardcoded user ID for now

    // Get like count
    const { count, error: countError } = await supabase
      .from("like_counts")
      .select("*", { count: "exact" })
      .eq("brave_id", braveId);

    if (countError) throw countError;

    // Check if the user liked the post
    const { data: likeData, error: likeError } = await supabase
      .from("like_counts")
      .select("*")
      .match({ brave_id: braveId, user_id: userId })
      .single();

    if (likeError && likeError.code !== "PGRST116") throw likeError; // Ignore "not found" errors

    return NextResponse.json(
      { likeCount: count, isLiked: !!likeData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching like status:", error);
    return NextResponse.json(
      { error: "Failed to fetch like status" },
      { status: 500 }
    );
  }
}
