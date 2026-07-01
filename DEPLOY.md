# Hosting & Deployment — Aproch Health

Full launch playbook for **Vercel** + custom domain + **Resend** email.

**Quick links**

- [Client intake form](docs/CLIENT_INTAKE.md) — send to client before DNS setup
- [Post-launch QA checklist](docs/LAUNCH_QA.md) — run after domain is live

---

## Phase 1 — Pre-deploy (developer)

- [x] `npm run build` passes locally
- [ ] `npm run start` → smoke-test at `http://localhost:3000`
- [ ] Code pushed to GitHub (`main` or production branch)
- [ ] Hero videos and images present under `public/` (videos ~2.4 MB each)
- [ ] Decide account ownership: Vercel, Resend, GitHub (you vs client)

**Local production test**

```bash
npm run build
npm run start
```

Smoke-test: home (hero, day/night), `/book`, `/our-psychologist`, `/contact`, `/privacy`, `/terms`.

---

## Phase 2 — Vercel project setup

1. [vercel.com](https://vercel.com) → **Add New Project** → import GitHub repo `Aproch-Health`
2. Framework: **Next.js** (auto-detected)
3. Build command: `npm run build` (default)
4. Add environment variables (**Production** + **Preview**):

| Variable | Required | Example / notes |
|----------|----------|-----------------|
| `NEXT_PUBLIC_SITE_URL` | **Yes at launch** | `https://aprochhealth.com` — no trailing slash |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Yes** | `918921849028` (digits + country code, no `+`) |
| `NEXT_PUBLIC_RCI_NUMBER` | Recommended | `RCI/CL/2021/XXXXX` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Optional | Footer hidden if unset |
| `NEXT_PUBLIC_LINKEDIN_URL` | Optional | Footer hidden if unset |
| `RESEND_API_KEY` | Contact form | From [resend.com](https://resend.com) |
| `RESEND_FROM_EMAIL` | Contact form | Verified sender, e.g. `hello@aprochhealth.com` |
| `NEXT_PUBLIC_AGENCY_URL` | Optional | Default `https://kaltrix.live` |
| `NEXT_PUBLIC_SHOW_AGENCY_CREDIT` | Optional | `false` hides Kaltrix footer line |

Copy from [`.env.example`](.env.example) for local development.

5. Deploy → note the `*.vercel.app` preview URL
6. Smoke-test preview **before** adding custom domain (see [LAUNCH_QA.md](docs/LAUNCH_QA.md))

---

## Phase 3 — Client intake

Send [docs/CLIENT_INTAKE.md](docs/CLIENT_INTAKE.md) to the client. You need:

- Exact domain + www preference
- Registrar name + DNS access (login or they add records you send)
- Whether email already runs on the domain (Google Workspace / Zoho — do not break MX)
- WhatsApp number, contact email, RCI number, social URLs

---

## Phase 4 — Custom domain (DNS)

**Vercel:** Project → **Settings → Domains** → add apex + `www` (e.g. `aprochhealth.com` and `www.aprochhealth.com`).

Vercel shows exact records. Confirm values in the Vercel UI (IPs can change).

### Option A — Vercel nameservers (simplest)

At registrar, set nameservers to Vercel’s (e.g. `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).

### Option B — Keep registrar DNS (common)

| Type | Name | Value |
|------|------|-------|
| **A** | `@` | `76.76.21.21` (confirm in Vercel) |
| **CNAME** | `www` | `cname.vercel-dns.com` |

- Propagation: 5 minutes – 48 hours
- Vercel issues **free SSL** when DNS validates
- Set redirect: `www` → apex (or reverse) in Vercel Domains
- Set `NEXT_PUBLIC_SITE_URL` to canonical URL → **Redeploy**

---

## Phase 5 — Resend (contact form)

Without `RESEND_API_KEY`, `/api/contact` returns **503**.

1. Create Resend account (client-owned recommended)
2. **Domains** → add client domain
3. Add Resend DNS records (SPF/DKIM) — **do not remove existing MX** if they receive email on `@domain`
4. Verify domain
5. Set `RESEND_FROM_EMAIL` to verified address
6. Test contact form on production

---

## Phase 6 — Post-launch QA

Run [docs/LAUNCH_QA.md](docs/LAUNCH_QA.md) on the production URL.

Highlights:

- HTTPS + www redirect
- Sitemap/robots use production domain (not `vercel.app`)
- WhatsApp booking message correct
- [PageSpeed Insights](https://pagespeed.web.dev/) (target Performance ≥ 85 mobile)

---

## Phase 7 — Client handoff

Deliver:

- Production URL + Vercel access (Viewer or transfer)
- Env var list (names only; secrets in password manager)
- DNS record summary
- How to request content updates (Kaltrix support / GitHub)

---

## Asset notes

- Run `npm run compress:hero-images` and `npm run compress:psychologist` after image updates
- Optional video re-encode:  
  `ffmpeg -i input.mp4 -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -an output.mp4`

---

## Common pitfalls

| Issue | Fix |
|-------|-----|
| Sitemap/OG shows `vercel.app` | Set `NEXT_PUBLIC_SITE_URL` and redeploy |
| Contact form 503 | Add `RESEND_API_KEY` + verified `RESEND_FROM_EMAIL` |
| Client inbox broken after Resend | Only add Resend records; keep existing MX |
| WhatsApp wrong number | Env: digits only, `91` prefix, no spaces |
| Placeholder psychologists | OK for staging; swap `lib/psychologists.ts` before marketing |

---

## Suggested timeline

| Day | Task |
|-----|------|
| 1 | Vercel preview deploy; send client intake |
| 2 | Client adds DNS; configure Resend |
| 3 | DNS live; set `NEXT_PUBLIC_SITE_URL`; QA |
| 4 | Client sign-off; handoff |
