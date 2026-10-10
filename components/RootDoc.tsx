import { HTML_LANG, type Lang } from "@/lib/i18n";

const MONTSERRAT = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap";
const NOTO_SC = "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap";

// The <html> shell for each language's root layout.
export function RootDoc({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={HTML_LANG[lang]}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={MONTSERRAT} />
        {lang === "zh" && <link rel="stylesheet" href={NOTO_SC} />}
      </head>
      <body>{children}</body>
    </html>
  );
}
