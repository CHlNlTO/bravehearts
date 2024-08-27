import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("braves")
    .select(
      `
      id,
      brave,
      users (
        name,
        handle
      )
    `
    )
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const formattedData = data.map((item: any) => ({
    id: item.id,
    brave: item.brave,
    name: item.users?.name || "Unknown",
    handle: item.users?.handle || "Unknown",
  }));

  console.log("Formatted Data: ", formattedData);

  const response = NextResponse.json(formattedData);
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
}
