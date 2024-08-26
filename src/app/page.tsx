"use client";

import BraveCard from "@/components/component/brave-card";
import Navbar from "@/components/component/navbar";
import { BraveCardInterface } from "@/lib/interface";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<BraveCardInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    fetch("/api/social/users/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-0 sm:pt-[55px]">
      <Navbar refetch={fetchData} />
      {error && <p className="text-red-500">{error}</p>}
      {data.map((item) => (
        <BraveCard key={item.id.toString()} user={item} />
      ))}
    </main>
  );
}
