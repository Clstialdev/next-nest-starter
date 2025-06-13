import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: {
    default: "ZENN Stack | A Type-Safe Monorepo for Next.js & Nest.js",
    template: "%s | ZENN Stack",
  },
  description:
    "Achieve developer nirvana with the ZENN Stack. A maybe production-ready, type-safe monorepo starter featuring Next.js, Nest.js, Zustand, Drizzle ORM, and Tailwind CSS.",
  keywords: [
    "Next.js",
    "Nest.js",
    "Zustand",
    "Drizzle ORM",
    "TypeScript",
    "Monorepo",
    "Full-stack",
    "Starter Kit",
    "Boilerplate",
    "Tailwind CSS",
    "ZENN Stack",
  ],
  authors: [{ name: "Itri", url: "https://itri.studio/" }],
  creator: "Neurocrow from Itri",

  openGraph: {
    title: "ZENN Stack | A Type-Safe Monorepo for Next.js & Nest.js",
    description:
      "A production-ready starter kit designed for developer focus and productivity.",
    url: siteUrl,
    siteName: "ZENN Stack",
    images: [
      {
        url: `${siteUrl}/thumbnails/ZENN_1200_630.png`,
        width: 1200,
        height: 630,
        alt: "ZENN Stack Logo and Tech Stack",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
