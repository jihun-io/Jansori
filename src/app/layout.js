import localFont from "next/font/local";
import dynamic from "next/dynamic";
import "./globals.css";

import Header from "@/components/header.js";
import Footer from "@/components/footer.js";

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

export const metadata = {
  title: "잔소리 키오스크",
  description:
    "그간 무료로 제공되었던 저에 대한 걱정은 올해부터 유료로 전환되었으니 선결제 후 이용 부탁드립니다!",
  icons: {
    icon: [
      { url: "/metadata/favicon.ico" },
      { url: "/metadata/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/metadata/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/metadata/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      {
        url: "/metadata/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        url: "/metadata/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/metadata/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/metadata/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/metadata/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/metadata/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/metadata/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/metadata/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/metadata/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/metadata/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
};

const bodyClasses =
  "min-h-[100vh], mx-4 grid, grid-rows-[auto,1fr,auto], break-keep";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
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
