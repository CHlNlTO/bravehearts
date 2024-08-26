import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { braveId } = await request.json();

    const { count, error } = await supabase
      .from("like_counts")
      .select("*", { count: "exact", head: true })
      .eq("brave_id", braveId);

    if (error) throw error;

    return NextResponse.json({ likeCount: count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching like count:", error);
    return NextResponse.json(
      { error: "Failed to fetch like count" },
      { status: 500 }
    );
  }
}
