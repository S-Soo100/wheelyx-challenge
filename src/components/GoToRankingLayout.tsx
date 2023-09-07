"use client";

import { useRouter } from "next/navigation";
export default function GoToRankingLayout() {
  const router = useRouter();
  return (
    <button
      className="p-4 m-4 text-white bg-slate-600 hover:bg-slate-800 rounded-3xl"
      onClick={() => router.push("/layout")}
    >
      GoToRankingLayout
    </button>
  );
}
