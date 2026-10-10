import "../globals.css";
import { RootDoc } from "@/components/RootDoc";

// Indonesian pages live at the root of the site.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDoc lang="id">{children}</RootDoc>;
}
