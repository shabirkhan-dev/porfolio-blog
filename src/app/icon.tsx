import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e9b069",
          color: "#1a1814",
          borderRadius: 11,
          fontSize: 27,
          fontWeight: 800,
          letterSpacing: -1.5,
          fontFamily: "sans-serif",
        }}
      >
        SK
      </div>
    ),
    size,
  );
}
