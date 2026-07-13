import { ImageResponse } from "next/og";

export const alt =
  "Shabir Khan — Senior Full-Stack Engineer & Product Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const bg = "#211c16";
  const fg = "#f0ebe0";
  const muted = "#9a9080";
  const accent = "#d6a846";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: bg,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* corner frame accents */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: "1px solid rgba(236,228,210,0.1)",
            borderRadius: 12,
          }}
        />

        {/* top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: muted,
            fontFamily: "monospace",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: accent,
            }}
          />
          Portfolio &amp; Writing
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: fg,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            Shabir Khan
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 24,
              fontSize: 40,
              color: muted,
              lineHeight: 1.2,
              maxWidth: 880,
            }}
          >
            <span>Senior Full-Stack Engineer — calm UI, hard systems.</span>
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: muted,
            fontFamily: "monospace",
            letterSpacing: 1,
          }}
        >
          <span>shabirkhan.dev</span>
          <div style={{ display: "flex", gap: 28 }}>
            <span>TypeScript</span>
            <span style={{ color: accent }}>·</span>
            <span>Next.js</span>
            <span style={{ color: accent }}>·</span>
            <span>AI</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
