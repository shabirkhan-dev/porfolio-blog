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
          background: "#4ade80",
          color: "#0c2916",
          borderRadius: 8,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -1,
          fontFamily: "monospace",
        }}
      >
        SK
      </div>
    ),
    size,
  );
}
