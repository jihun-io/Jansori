"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRef } from "react";

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

  const scrollRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollLeft = () => {
    if (scrollIndex > 0) {
      const next = scrollIndex - 1;
      setScrollIndex(next);
      scrollRef.current.children[next].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const scrollRight = () => {
    if (
      scrollRef.current &&
      scrollIndex < scrollRef.current.children.length - 1
    ) {
      const next = scrollIndex + 1;
      setScrollIndex(next);

      scrollRef.current.children[next].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
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
          <section className=" flex flex-col items-start w-full">
            <h3 className="text-xl font-bold">만드는 법</h3>
            <div className="relative w-full">
              <div className="flex flex-row isolate justify-start md:justify-center overflow-hidden w-full h-fit snap-x snap-mandatory scrollbar-hide">
                <ul
                  className="flex flex-row w-fit justify-start md:justify-center h-fit snap-x gap-x-6 snap-mandatory scrollbar-hide pl-[320px] pr-[320px] md:pl-0 md:pr-0"
                  ref={scrollRef}
                >
                  <li className="block w-[50vw] md:w-[20vw] lg:w-[20vw] max-w-[15rem]  aspect-[320/630] md:ml-0 relative flex-shrink-0">
                    <Image
                      src={"/images/how-to-create-1.png"}
                      fill
                      alt="카카오톡 더보기 탭에서 카카오페이 송금 버튼을 누릅니다."
                      className="snap-center"
                    />
                  </li>
                  <li className="block w-[50vw] md:w-[20vw] lg:w-[20vw] max-w-[15rem] aspect-[320/630] relative flex-shrink-0">
                    <Image
                      src={"/images/how-to-create-2.png"}
                      fill
                      alt="계좌송금 화면에서 하단의 QR 버튼을 누릅니다."
                      className="snap-center"
                    />
                  </li>
                  <li className="block w-[50vw] md:w-[20vw] lg:w-[20vw] max-w-[15rem] aspect-[320/630] md:mr-0 relative flex-shrink-0">
                    <Image
                      src={"/images/how-to-create-3.png"}
                      fill
                      alt="QR 코드 스캔 화면에서 하단의 나의 송금 버튼을 누릅니다."
                      className="snap-center"
                    />
                  </li>
                  <li className="block w-[50vw] md:w-[20vw] lg:w-[20vw] max-w-[15rem] aspect-[320/630] md:mr-0 relative flex-shrink-0">
                    <Image
                      src={"/images/how-to-create-4.png"}
                      fill
                      alt="송금받기 화면에서 링크 복사 버튼을 누릅니다."
                      className="snap-center"
                    />
                  </li>
                </ul>
              </div>
              <ul className="absolute w-full flex flex-row justify-between top-1/2 left-0 right-0 -translate-y-1/2 z-10 md:hidden pointer-events-none">
                <li>
                  <button
                    className="border-2 dark:border-armadillo-200 p-3 bg-white hover:bg-gray-100 dark:bg-armadillo-400 dark:hover:bg-armadillo-200 transition-all shadow-xl rounded-full relative pointer-events-auto"
                    onClick={scrollLeft}
                    style={{ opacity: scrollIndex === 0 ? 0 : 1 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="3"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    className="border-2 dark:border-armadillo-200 p-3 bg-white hover:bg-gray-100 dark:bg-armadillo-400 dark:hover:bg-armadillo-200 transition-all shadow-xl rounded-full relative pointer-events-auto"
                    onClick={scrollRight}
                    style={{ opacity: scrollIndex === 3 ? 0 : 1 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="3"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
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
                잔소리 키오스크는 단순히 카카오페이 송금하기 링크를 중개하는 웹
                페이지이며, 이용자의 개인정보 및 민감정보는{" "}
                <span className="font-bold">절대</span> 수집되지 않습니다.{" "}
                <Link
                  className="underline text-blue-500 dark:text-blue-400"
                  href="https://github.com/jihun-io/Jansori"
                >
                  GitHub에서 자세히 알아보기...
                </Link>
              </li>
              <li>
                잔소리 키오스크는 카카오페이와 무관하며, 웹 페이지 이용자에게는
                수수료를 포함한 이용 요금이 부과되지 않습니다.
              </li>
            </ol>
          </section>
        </main>
      ) : (
        <main className="mx-6 flex flex-col items-center justify-center gap-16">
          <section className="flex flex-col items-center gap-4">
            <img
              src={`/api/og?name=${username}`}
              alt={`${username}에게 잔소리를 해주세요! (최소 49,000원)`}
              className="max-h-96"
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
