# LegalEase website (Next.js)

## Run it on your computer

1. Install Node.js (the LTS version) from nodejs.org.
2. Open a terminal in this folder and run:

   ```
   npm install
   npm run dev
   ```

3. Open http://localhost:3000 in your browser. Changes you save show up right away.

## Where things live

- `lib/content.ts`: all the text, services, FAQ, WhatsApp number and Instagram link.
- `app/globals.css`: colours, fonts and layout.
- `app/page.tsx`: the order of the sections on the page.
- `components/`: the interactive parts (menu, tabs, FAQ, contact form).
- `public/images/`: put the six photos here, using the file names in `image-prompts.md`.
- `public/assets/legalease-logo.png`: the logo.

## Put it online

The easiest way is Vercel (free): push this folder to a GitHub repository,
then import it at vercel.com. It builds automatically.

To make plain files for any other host, run `npm run build`. The finished
site is in the `out` folder; upload everything inside it. `npm run preview`
shows that built version locally.
