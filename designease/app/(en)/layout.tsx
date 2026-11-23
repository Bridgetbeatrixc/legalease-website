import type { Metadata, Viewport } from "next";
import { dict } from "@/lib/content";
import "@/app/globals.css";
import "@/app/home.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://designease.pages.dev"),
  title: dict.en.meta.title,
  description: dict.en.meta.description,
  icons: { icon: "/favicon.svg" },
  alternates: { languages: { en: "/", id: "/id/" } },
  openGraph: { title: dict.en.meta.title, description: dict.en.meta.description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#05070d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
