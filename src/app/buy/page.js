import { Suspense } from "react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { generateMetadata as baseMetadata } from "/utils/metadata";

export const runtime = "edge";

const BuyDetails = dynamic(() => import("./buyDetails"), {
  ssr: false,
});

export async function generateMetadata({ searchParams }) {
  const name = searchParams.name || "저";
  const title = `${name}에게 잔소리하기 - 잔소리 키오스크`;
  const description = `잔소리는 선결제 후 이용하세요!`;

  const getMetadataBase = () => {
    if (process.env.CF_PAGES) {
      // Cloudflare Pages 환경
      if (process.env.CF_PAGES_BRANCH === "main") {
        // 프로덕션 배포
        return `https://jansori.jihun.io`;
      } else {
        // 프리뷰 배포
        return `${process.env.CF_PAGES_URL}`;
      }
    }
    // 로컬 개발 환경
    return `http://localhost:${process.env.PORT || 3000}`;
  };

  const url = getMetadataBase();

  return {
    ...baseMetadata(title, description),
    openGraph: {
      images: [
        {
          url: `${url}/api/og?name=${name}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function BuyPage({ searchParams }) {
  const token = searchParams.token;
  const name = searchParams.name;

  if (!token || !name) {
    redirect("/");
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BuyDetails token={token} name={name} />
      </Suspense>
    </div>
  );
}
