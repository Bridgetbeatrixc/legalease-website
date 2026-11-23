/** @type {import('next').NextConfig} */
const nextConfig = {
  // Plain static site in `out/`, so it can be hosted anywhere (Cloudflare Pages, Vercel, cPanel).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
