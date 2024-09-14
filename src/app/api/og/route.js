import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("name") || "저";

  try {
    const fontData = await fetch(
      new URL("../../fonts/chungjuKimsaeng.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

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
                data: fontData,
                style: "normal",
              },
            ]
          : [],
      }
    );
  } catch (e) {
    console.error("Font loading error:", e);
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
      }
    );
  }
}
