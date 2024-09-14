import localFont from "next/font/local";
import dynamic from "next/dynamic";
import "./globals.css";

import Header from "@/components/header.js";
import Footer from "@/components/footer.js";
import { generateMetadata } from "/utils/metadata";

const CartBtn = dynamic(() => import("@/components/cart-button.js"), {
  ssr: false,
});

import { ProductProvider } from "/contexts/ProductContext";
import classNames from "classnames";

const chungjuKimsaeng = localFont({
  src: "./fonts/ChungjuKimSaengTTF.woff2",
  weight: "400",
});

const galmuri = localFont({
  src: "./fonts/Galmuri14.woff2",
});

const hallymMjo = localFont({
  src: [
    {
      path: "./fonts/HallymMjo-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/HallymMjo-Bold.woff2",
      weight: "700",
    },
  ],
});

const title = "잔소리 키오스크";
const description =
  "그간 무료로 제공되었던 저에 대한 걱정은 올해부터 유료로 전환되었으니 선결제 후 이용 부탁드립니다!";

export const metadata = generateMetadata(title, description);

const bodyClasses =
  "min-h-[100vh], mx-4 grid, grid-rows-[auto,1fr,auto], break-keep";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
          crossorigin="anonymous"
        ></script>
      </head>
      <ProductProvider>
        <body className={classNames(bodyClasses, hallymMjo.className)}>
          <Header className={chungjuKimsaeng.className} />
          {children}
          <Footer />
          <CartBtn font={galmuri.className} />
        </body>
      </ProductProvider>
    </html>
  );
}
