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
          background: "linear-gradient(135deg, #FBF8F2 0%, #F2ECDF 60%, #EAE0F0 130%)",
          color: "#1C1836",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#96731F",
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
            color: "#635E80",
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
