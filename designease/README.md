# DesignEase website

Next.js static site for DesignEase (brand of PT Ease Solusi Indonesia). Lives in its own folder so it never touches the LegalEase site in the repo root.

- `npm ci && npm run build` → static site in `out/`
- English at `/`, Indonesian at `/id/`
- All copy and portfolio data: `lib/content.ts` (prices are empty on purpose until confirmed)
- Styles: `app/globals.css` (DesignEase editorial system: textures, Inter Display, #7fa2ff)

Deploy (Cloudflare Pages project `designease`):

    npx wrangler pages deploy out --project-name designease --branch main
