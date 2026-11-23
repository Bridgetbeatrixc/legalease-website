import type { Metadata, Viewport } from "next";
import { dict } from "@/lib/content";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://designease.pages.dev"),
  title: dict.id.meta.title,
  description: dict.id.meta.description,
  icons: { icon: "/favicon.svg" },
  alternates: { languages: { en: "/", id: "/id/" } },
  openGraph: { title: dict.id.meta.title, description: dict.id.meta.description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#05070d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
