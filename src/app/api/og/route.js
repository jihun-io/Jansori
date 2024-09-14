import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

const getUrl = () => {
  if (process.env.CF_PAGES) {
    return process.env.CF_PAGES_BRANCH === "main"
      ? "https://jansori.jihun.io"
      : `${process.env.CF_PAGES_URL}`;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("name") || "저";

  const baseUrl = getUrl();
  const fontUrl = `${baseUrl}/fonts/chungjukimsaeng1.ttf`;

  let fontData;
  try {
    const fontResponse = await fetch(new URL(fontUrl));
    if (!fontResponse.ok) throw new Error("Font fetch failed");
    fontData = await fontResponse.arrayBuffer();
  } catch (e) {
    console.error("Font loading error:", e);
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "rgb(250, 193, 58)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 0,
          alignItems: "center",
          fontFamily: fontData ? "chungjuKimsaeng" : "system-ui",
        }}
      >
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "1.4",
          }}
        >
          <span style={{ display: "block" }}>{username}에게</span>
          <span style={{ display: "block" }}>잔소리를 해주세요!</span>
          <span style={{ fontSize: 48, display: "block" }}>
            (최소 49,000원)
          </span>
        </p>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "chungjuKimsaeng",
              data: await fontData,
              style: "normal",
            },
          ]
        : [],
    }
  );
}
