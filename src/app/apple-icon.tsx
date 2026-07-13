import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#211c16",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#d6a846",
            color: "#211c16",
            borderRadius: 22,
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: -3,
            fontFamily: "monospace",
          }}
        >
          SK
        </div>
      </div>
    ),
    size,
  );
}
