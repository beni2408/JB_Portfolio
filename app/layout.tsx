import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Nav } from "@/components/ui/Nav";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { siteUrl } from "@/lib/siteUrl";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jascar Benish P — MERN-Stack Developer & Composer",
  description:
    "Full-stack developer shipping production-ready MERN & SvelteKit products — with a composer's eye for craft. Portfolio of Jascar Benish P.",
  keywords: [
    "Jascar Benish",
    "MERN Stack Developer",
    "SvelteKit Developer",
    "Full-Stack Developer",
    "React Developer",
    "Composer",
    "Audio Engineer",
  ],
  authors: [{ name: "Jascar Benish P", url: profile.github }],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Jascar Benish P — MERN-Stack Developer & Composer",
    description: profile.valueProp,
    url: siteUrl,
    siteName: "Jascar Benish P",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jascar Benish P — MERN-Stack Developer & Composer",
    description: profile.valueProp,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#fbf8f2",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "MERN-Stack Developer",
  url: siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  knowsAbout: skillGroups.flatMap((group) => group.items),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-pearl text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          <Nav />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
