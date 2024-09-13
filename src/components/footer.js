"use client";

import Link from "next/link";

export default function Footer({ className }) {
  const defaultClasses = "";

  return (
    <footer className="flex flex-col items-center justify-end text-[0.6rem] px-12 pt-8 pb-4 break-keep">
      <h2 className="font-bold py-2">잔소리 키오스크</h2>
      <p className="text-center">
        잔소리 키오스크는 단순히 카카오페이 송금하기 링크를 중개하는 서비스이며,
        이용자의 개인정보 및 민감정보는 <span className="font-bold">절대</span>{" "}
        수집되지 않습니다.{" "}
        <Link
          className="underline text-blue-500"
          href="https://github.com/jihun-io/Jansori"
        >
          GitHub에서 자세히 알아보기...
        </Link>
      </p>
      <p className="text-center my-1">
        잔소리 키오스크는 카카오페이와 무관하며, 서비스 이용자에게는 수수료를
        포함한 이용 요금이 부과되지 않습니다.
      </p>
      <p>Copyright © 2024 Jihun Kim. All rights reserved.</p>
    </footer>
  );
}
