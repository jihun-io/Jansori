"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import Button from "@/components/button.js";
import KakaoShare from "@/components/kakaoShare";

export default function CreateDetails() {
  const [formData, setFormData] = useState({
    username: "",
    kakaopay: "",
  });

  const [link, setLink] = useState("");
  const [username, setUserName] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, kakaopay } = formData;
    setUserName(username);
    setToken(kakaopay);
    const url = new URL(window.location.href);
    const origin = url.origin;
    const link = `${origin}/buy?name=${username}&token=${kakaopay}`;
    setLink(link);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert("복사되었습니다!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      {!link ? (
        <main className="mx-6 flex flex-col items-center gap-8">
          <h2 className="text-center font-bold text-2xl">
            잔소리 키오스크 만들기
          </h2>
          <section className="w-full flex mb-12 flex-col items-center">
            <h3 className="sr-only">키오스크 생성하기</h3>
            <form
              className="flex flex-col w-full gap-y-4 items-center max-w-sm"
              onSubmit={handleSubmit}
            >
              <label className="sr-only" htmlFor="username">
                이름
              </label>
              <input
                className="border-2 rounded-lg px-6 py-2 w-full bg-gray-50 dark:bg-[--background]"
                type="text"
                id="username"
                name="username"
                placeholder="이름"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label className="sr-only" htmlFor="kakaopay">
                카카오페이 송금 링크
              </label>
              <input
                className="border-2 rounded-lg px-6 py-2  w-full bg-gray-50 dark:bg-[--background]"
                type="url"
                id="kakaopay"
                name="kakaopay"
                value={formData.kakaopay}
                onChange={handleChange}
                placeholder="카카오페이 송금 링크"
                required
              />
              <Button type="submit">링크 만들기</Button>
            </form>
          </section>
          <section>
            <h3 className="text-xl font-bold">만드는 법</h3>
            <ol className="flex flex-col gap-y-2 mt-2 mb-6 list-decimal ml-5">
              <li>
                카카오톡의 &apos;
                <span className="font-bold underline">더보기</span>&apos; 탭에서
                카카오페이 아이콘 밑의 &apos;
                <span className="font-bold underline">송금</span>&apos; 버튼을
                눌러요.
              </li>
              <li>
                계좌송금 화면에서 하단의 &apos;
                <span className="font-bold underline">QR</span>&apos; 버튼을
                눌러요.
              </li>
              <li>
                QR 코드 스캔 화면에서 하단의 &apos;
                <span className="font-bold underline">나의 송금코드</span>&apos;
                버튼을 눌러요.
              </li>
              <li>
                송금받기 화면에서 &apos;
                <span className="font-bold underline">링크 복사</span>&apos;
                버튼을 눌러요.
              </li>
              <li>
                잔소리 키오스크로 돌아 와서 이 페이지 상단에 이름을 작성하고,
                카카오페이 송금 링크를 붙여 넣어요.
              </li>
              <li>
                &apos;<span className="font-bold underline">링크 만들기</span>
                &apos; 버튼을 누르면 나만의 잔소리 키오스크 링크가 만들어집니다!
              </li>
            </ol>
            <h3 className="text-xl font-bold">참고 사항</h3>
            <ol className="flex flex-col gap-y-2 mt-2 mb-6 list-decimal ml-5">
              <li>
                잔소리 키오스크는 단순히 카카오페이 송금하기 링크를 중개하는
                서비스이며, 이용자의 개인정보 및 민감정보는{" "}
                <span className="font-bold">절대</span> 수집되지 않습니다.
              </li>
              <li>
                잔소리 키오스크는 카카오페이와 무관하며, 서비스 이용자에게는
                수수료를 포함한 이용 요금이 부과되지 않습니다.
              </li>
            </ol>
          </section>
        </main>
      ) : (
        <main className="mx-6 flex flex-col items-center justify-center gap-16">
          <section className="flex flex-col items-center gap-4">
            <Image
              src={`/api/og?name=${username}`}
              width={1200}
              height={630}
              alt={`${username}에게 잔소리를 해주세요! (최소 49,000원)`}
            />
            <h2 className="text-center font-bold text-2xl">생성 완료!</h2>
            <input
              className="border-2 rounded-lg px-6 py-2  w-full bg-gray-50 dark:bg-[--background]"
              type="url"
              name="generatedUrl"
              id="generatedUrl"
              value={link}
              onClick={(e) => e.target.select()}
              readOnly
            />
            <ul className="flex flex-row gap-x-8 gap-y-4 justify-center flex-wrap">
              <li>
                <Button onClick={copyToClipboard}>복사하기</Button>
              </li>
              <li>
                <KakaoShare username={username} token={token}>
                  카카오톡으로 공유하기
                </KakaoShare>
              </li>
              <li>
                <Link
                  className="block dark:text-black font-bold transition-colors rounded-lg px-6 py-2 bg-supernova-500 hover:bg-supernova-600 active:bg-supernova-700 hover:text-supernova-50 active:text-supernova-50"
                  href={link}
                >
                  직접 방문하기...
                </Link>{" "}
              </li>
            </ul>
            <p className="text-center">
              위의 링크를 전달하거나 직접 방문해서 잔소리 키오스크를 사용하실 수
              있습니다!
            </p>
          </section>
          <section className="flex flex-col items-center gap-4">
            <Link
              className="block dark:text-black font-bold transition-colors rounded-lg px-6 py-2 bg-supernova-500 hover:bg-supernova-600 active:bg-supernova-700 hover:text-supernova-50 active:text-supernova-50"
              href="/"
            >
              <h2>처음으로 이동하기...</h2>
            </Link>
          </section>
        </main>
      )}
    </>
  );
}
