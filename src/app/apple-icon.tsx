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
          background: "#1a1814",
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
            background: "#e9b069",
            color: "#1a1814",
            borderRadius: 40,
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -4,
            fontFamily: "sans-serif",
          }}
        >
          SK
        </div>
      </div>
    ),
    size,
  );
}
