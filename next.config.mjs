/** @type {import('next').NextConfig} */
const nextConfig = {
  // Builds a plain static site into `out/`, so it can be hosted anywhere (Vercel, Netlify, cPanel).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
