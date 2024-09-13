"use client";

import Button from "@/components/button.js";
import localFont from "next/font/local";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProduct } from "/contexts/ProductContext";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

import classNames from "classnames";
import QRCode from "react-qr-code";

const billStyle = "flex flex-col gap-3 max-w-96";

export default function CartBtn({ font }) {
  const toHexValue = (value) => {
    const multipliedValue = value * 524288;
    return Math.floor(multipliedValue).toString(16);
  };

  const pathname = usePathname();
  if (pathname !== "/buy") {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);

  const [kakaoUrl, setKakaoUrl] = useState("");

  const [qrData, setQrData] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setPurchase(false);
  };

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const { checkedItems, getCheckedProducts } = useProduct();
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const checkedProducts = getCheckedProducts();

  const [purchase, setPurchase] = useState(false);

  const buyJansori = () => {
    const modalContent = document.getElementById("modalContent");
    modalContent.scrollTo(0, 0);
    setPurchase(true);
  };

  useEffect(() => {
    const amount = checkedProducts.reduce(
      (acc, cur) => acc + parseInt(cur.price),
      0
    );
    if (token === "https://dev.jihun.io") {
      setQrData(token);
    } else {
      const hexAmount = toHexValue(amount);
      setKakaoUrl(`${token}${hexAmount}`);
      setQrData(kakaoUrl);
    }
  }, [checkedProducts, token]);

  const thanks = [
    ["잔소리의 품격, 현금으로 증명해주셔서 감사합니다."],
    ["잔소리 창구에 입금해주셔서 감사합니다😊 항상 영업 중이에요!"],
  ];

  const random = Math.floor(Math.random() * thanks.length);
  const randomThanks = thanks[random];

  return (
    <>
      <div className="btn-container fixed right-8 bottom-28 ">
        <button
          className="border-2 dark:border-armadillo-200 p-4 bg-white hover:bg-gray-100 dark:bg-armadillo-400 dark:hover:bg-armadillo-200 transition-colors shadow-xl rounded-full relative"
          onClick={openModal}
        >
          <p className="sr-only">장바구니</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
        <div
          className={`size-8 dark:text-black  bg-supernova-500 justify-center items-center rounded-full absolute top-[10%] left-[75%] translate-x-[-50%] translate-y-[-50%] transition-opacity ${
            !!checkedCount ? "opacity-100 flex" : "opacity-0 hidden"
          }
          `}
        >
          <p className="text-center text-sm font-bold">{checkedCount}</p>
        </div>
      </div>
      {isOpen && (
        <dialog className="text-[1rem] fixed w-dvw h-dvh inset-0 bg-white dark:bg-armadillo-800 bg-opacity-50 dark:bg-opacity-30 flex items-center justify-center overflow-hidden z-50 transition-opacity">
          <div
            id="modalContent"
            className="bg-white dark:bg-armadillo-600 dark:text-armadillo-50 w-4/5 sm:w-3/5 md:w-2/5 px-8 py-8 rounded-lg flex flex-col justify-start gap-y-4 shadow-md relative max-h-[80%] overflow-scroll"
          >
            <header className="flex flex-row ">
              <h2 className="w-full text-center font-bold px-8 text-xl">
                {!!purchase ? "구매하기" : "장바구니"}
              </h2>
              <button className="absolute top-8 right-8" onClick={closeModal}>
                <p className="sr-only">닫기</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </header>

            {!!purchase ? (
              <div className="flex flex-col items-center gap-y-6">
                <QRCode
                  className="size-32 min-w-32 min-h-32 ml-auto mr-auto"
                  value={qrData}
                />
                <p className="text-center">
                  위의 QR 코드를 스캔하거나,
                  <br />
                  아래 송금하기를 눌러주세요!
                </p>
                <Link
                  className=" dark:text-black size-fit ml-auto mr-auto block font-bold transition-colors rounded-lg px-6 py-2 bg-supernova-500 hover:bg-supernova-600 active:bg-supernova-700 hover:text-supernova-50 active:text-supernova-50"
                  href={token}
                  target="_blank"
                >
                  송금하기
                </Link>
                <p className="break-keep text-center">{randomThanks}</p>
                <p className="text-center pt-8">영수증</p>
                {checkedCount > 0 && (
                  <ul className={classNames(billStyle, font)}>
                    {checkedProducts.map((product) => (
                      <li
                        key={product.id}
                        className="flex flex-row gap-3 justify-between items-start"
                      >
                        <p>{product.name}</p>
                        <p className="flex-shrink-0">
                          {parseInt(product.price).toLocaleString("ko-KR")}원
                        </p>
                      </li>
                    ))}
                    <li className="flex flex-row gap-3 mt-3 justify-between items-center">
                      <p>합계</p>
                      <p className="flex-shrink-0">
                        {checkedProducts
                          .reduce((acc, cur) => acc + parseInt(cur.price), 0)
                          .toLocaleString("ko-KR")}
                        원
                      </p>
                    </li>
                  </ul>
                )}
                <div className="flex flex-row flex-wrap justify-center gap-5">
                  <Link
                    className=" dark:text-black block font-bold transition-colors rounded-lg px-6 py-2 bg-supernova-500 hover:bg-supernova-600 active:bg-supernova-700 hover:text-supernova-50 active:text-supernova-50"
                    onClick={closeModal}
                    href="/"
                  >
                    나도 만들어 볼래요!
                  </Link>
                  <Button onClick={closeModal}>닫기</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-y-6">
                <p className="text-center">
                  {checkedCount
                    ? `장바구니에 ${checkedCount}개의 상품이 있어요!`
                    : "장바구니가 비었어요!"}
                </p>
                {checkedCount > 0 && (
                  <ul className={classNames(billStyle, font)}>
                    {checkedProducts.map((product) => (
                      <li
                        key={product.id}
                        className="flex flex-row gap-3 justify-between items-start"
                      >
                        <p>{product.name}</p>
                        <p className="flex-shrink-0">
                          {parseInt(product.price).toLocaleString("ko-KR")}원
                        </p>
                      </li>
                    ))}
                    <li className="flex flex-row gap-3 mt-3 justify-between items-center">
                      <p>합계</p>
                      <p className="flex-shrink-0">
                        {checkedProducts
                          .reduce((acc, cur) => acc + parseInt(cur.price), 0)
                          .toLocaleString("ko-KR")}
                        원
                      </p>
                    </li>
                  </ul>
                )}
                <div className="flex flex-row justify-center gap-4 break-keep">
                  {!checkedCount ? (
                    <Button onClick={closeModal}>닫기</Button>
                  ) : (
                    <>
                      <Button onClick={closeModal}>취소</Button>
                      <Button onClick={buyJansori}>구매하기!</Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}
