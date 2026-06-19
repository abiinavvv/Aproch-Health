# Deploying Aproch Health to Vercel

## Prerequisites

- GitHub repository connected to Vercel
- Production domain (optional at first deploy)

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | Example |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://aprochhealth.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Yes** | `919562170975` |
| `NEXT_PUBLIC_RCI_NUMBER` | Recommended | `RCI/CL/2021/XXXXX` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Optional | `https://instagram.com/...` |
| `NEXT_PUBLIC_LINKEDIN_URL` | Optional | `https://linkedin.com/company/...` |
| `RESEND_API_KEY` | For contact form | From [resend.com](https://resend.com) |
| `RESEND_FROM_EMAIL` | For contact form | Verified sender, e.g. `hello@aprochhealth.com` |

Copy from [`.env.example`](.env.example) for local development.

## Deploy steps

1. Push to `main` (or your production branch).
2. Vercel auto-builds with `npm run build`.
3. Open the **Preview** URL and smoke-test:
   - Home hero (day/night toggle, no console hydration errors)
   - Full `/book` flow → WhatsApp opens with correct message
   - Contact form (only works when `RESEND_API_KEY` is set)
   - `/privacy`, `/terms`, `/our-psychologist`
4. Promote to **Production** when preview looks good.
5. Add custom domain under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to match.

## Post-deploy checks

- Run [PageSpeed Insights](https://pagespeed.web.dev/) on production URL (mobile + desktop)
- Target: Performance ≥ 85, LCP < 2.5s on mobile
- Share homepage link on WhatsApp — confirm Open Graph preview renders
- Verify `https://your-domain.com/sitemap.xml` and `robots.txt`

## Asset notes

- Hero videos live in `public/videos/` (~2.4 MB each). Only the active theme video loads on first paint.
- Run `npm run compress:hero-images` and `npm run compress:psychologist` after updating images.
- Optional: re-encode MP4s with ffmpeg for smaller files:
  `ffmpeg -i input.mp4 -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -an output.mp4`

## Local production test

```bash
npm run build
npm run start
```

Open `http://localhost:3000` and repeat smoke tests before deploying.
