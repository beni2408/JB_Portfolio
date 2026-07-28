import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = "Jascar Benish P — MERN-Stack Developer & Composer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1E1B4B 0%, #0B0A1A 60%, #3B1E54 130%)",
          color: "#F4F1E9",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#D4AF6A",
            fontFamily: "Verdana, sans-serif",
          }}
        >
          Full-Stack Developer &amp; Composer
        </div>
        <div style={{ display: "flex", fontSize: 92, marginTop: 24, lineHeight: 1.05 }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 28,
            color: "#A9A4C4",
            fontFamily: "Verdana, sans-serif",
            maxWidth: 900,
          }}
        >
          {profile.roleLine}
        </div>
      </div>
    ),
    { ...size }
  );
}
