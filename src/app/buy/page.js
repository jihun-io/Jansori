import { Suspense } from "react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

export const runtime = "edge";

const BuyDetails = dynamic(() => import("./buyDetails"), {
  ssr: false,
});

export default function BuyPage({ searchParams }) {
  const token = searchParams.token;
  const name = searchParams.name;

  if (!token || !name) {
    return redirect("/");
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BuyDetails token={token} name={name} />
      </Suspense>
    </div>
  );
}
