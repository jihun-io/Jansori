import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export const size = {
  width: "auto",
  height: "auto",
};

const getUrl = () => {
  if (process.env.CF_PAGES) {
    return process.env.CF_PAGES_BRANCH === "main"
      ? "https://jansori.jihun.io"
      : `${process.env.CF_PAGES_URL}`;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
};

export async function POST(request) {
  const baseUrl = getUrl();
  const fontUrl = `${baseUrl}/fonts/Galmuri14.ttf`;
  const jansoriee = request.headers.get("x-jansoriee");

  const data = await request.json();
  const checkedProducts = data["items"];
  let fontData;
  try {
    const fontResponse = await fetch(new URL(fontUrl));
    if (!fontResponse.ok) throw new Error("Font fetch failed");
    fontData = await fontResponse.arrayBuffer();
  } catch (e) {
    console.error("Font loading error:", e);
  }

  const width = 640;
  const baseHeight = 630;
  const itemHeight = 128;
  const height = baseHeight + checkedProducts.length * itemHeight;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          width: "100%",
          height: "100%",
          padding: "32px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 0,
          alignItems: "center",
          fontFamily: fontData ? "galmuri" : "system-ui",
          position: "relative",
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <p style={{ textAlign: "center" }}>영 수 증</p>
        <p style={{ textAlign: "center" }}>
          {jansoriee}님에게 구매한 잔소리입니다.
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: "3" }}>
          {checkedProducts.map((product) => (
            <li
              key={product.id}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                flexShrink: "0",

                justifyContent: "space-between",
                alignItems: "flex-start",
                wordBreak: "break-all",
              }}
            >
              <p style={{ flexBasis: "380px" }}>{product.name}</p>
              <p
                style={{
                  flexShrink: "0",
                  textAlign: "center",
                }}
              >
                {parseInt(product.price).toLocaleString("ko-KR")}원
              </p>
            </li>
          ))}
          <li
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>합계</p>
            <p style={{ flexShrink: "0" }}>
              {checkedProducts
                .reduce((acc, cur) => acc + parseInt(cur.price), 0)
                .toLocaleString("ko-KR")}
              원
            </p>
          </li>
        </ul>
      </div>
    ),
    {
      width,
      height,
      fonts: fontData
        ? [
            {
              name: "galmuri",
              data: await fontData,
              style: "normal",
            },
          ]
        : [],
    }
  );
}
