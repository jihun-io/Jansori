"use client";
import Button from "./button";
import { useEffect } from "react";

const api = process.env.NEXT_PUBLIC_KAKAO_KEY;

const sendMessage = async ({ username, token }) => {
  if (!Kakao.isInitialized()) {
    Kakao.init(api);
  }

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "잔소리 키오스크",
      description:
        "그간 무료로 제공되었던 저에 대한 걱정은 올해부터 유료로 전환되었으니 선결제 후 이용 부탁드립니다 🙏",
      imageUrl: `https://jansori.jihun.io/api/kakao?name=${username}`,
      link: {
        mobileWebUrl: `https://jansori.jihun.io/buy?name=${username}&token=${token}`,
        webUrl: `https://jansori.jihun.io/buy?name=${username}&token=${token}`,
      },
    },
    buttons: [
      {
        title: "구매하러 가기!",
        link: {
          mobileWebUrl: `https://jansori.jihun.io/buy?name=${username}&token=${token}`,
          webUrl: `https://jansori.jihun.io/buy?name=${username}&token=${token}`,
        },
      },
    ],
  });
};

export default function KakaoShare({ username, token, children }) {
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(api);
    }
  }, []);

  return (
    <>
      <Button onClick={() => sendMessage({ username, token })}>
        {children}
      </Button>
    </>
  );
}
