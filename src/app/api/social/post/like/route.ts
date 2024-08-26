import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { braveId, liked } = await request.json();
    const userId = 2; // Hardcoded user ID for now

    let { error } = await supabase
      .from("like_counts")
      .upsert({ brave_id: braveId, user_id: userId });

    if (error) throw error;

    // Get updated like count
    const { count, error: countError } = await supabase
      .from("like_counts")
      .select("*", { count: "exact", head: true })
      .eq("brave_id", braveId);

    if (countError) throw countError;

    return NextResponse.json({ likeCount: count }, { status: 200 });
  } catch (error) {
    console.error("Error updating like:", error);
    return NextResponse.json(
      { error: "Failed to update like" },
      { status: 500 }
    );
  }
}
