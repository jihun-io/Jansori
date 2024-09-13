import { Suspense } from "react";
import dynamic from "next/dynamic";

const CreativeDetails = dynamic(() => import("@/app/create/createDetails.js"), {
  ssr: false,
});

export default function CreatePage() {
  return (
    <Suspense fallback={<div>로드 중...</div>}>
      <CreativeDetails />
    </Suspense>
  );
}
