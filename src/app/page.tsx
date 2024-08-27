import { Suspense } from "react";
import BraveCard from "@/components/component/brave-card";
import Navbar from "@/components/component/navbar";
import { BraveCardInterface } from "@/lib/interface";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

async function getData(): Promise<BraveCardInterface[]> {
  const { userId } = auth();

  if (!userId) {
    return [];
  }

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
    throw new Error("Failed to fetch data");
  }

  return data.map((item: any) => ({
    id: item.id,
    brave: item.brave,
    name: item.users?.name || "Unknown",
    handle: item.users?.handle || "Unknown",
  }));
}

function BraveList({ data }: { data: BraveCardInterface[] }) {
  return (
    <>
      {data.map((item) => (
        <BraveCard key={item.id.toString()} user={item} />
      ))}
    </>
  );
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-0 sm:pt-[55px]">
      <Navbar />
      <Suspense fallback={<p>Loading...</p>}>
        <BraveList data={data} />
      </Suspense>
    </main>
  );
}
