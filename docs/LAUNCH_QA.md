# Post-launch QA checklist — Aproch Health

Run on **production URL** after custom domain and `NEXT_PUBLIC_SITE_URL` are set.  
Check each box before client sign-off.

**Production URL:** `https://___________________`  
**Date:** ___________________  
**Tester:** ___________________

---

## Infrastructure

- [ ] Site loads at canonical URL with valid HTTPS (padlock)
- [ ] `www` redirects to canonical (or reverse, per client preference)
- [ ] `https://<domain>/sitemap.xml` lists production URLs (not `vercel.app`)
- [ ] `https://<domain>/robots.txt` references correct sitemap URL
- [ ] `/humans.txt` loads (optional developer credit)

---

## Home page

- [ ] Hero video plays (desktop); fallback image on mobile
- [ ] Day/night theme: auto schedule (7 PM–6 AM IST) or manual toggle
- [ ] Cat “Book Appointment” image loads (`/images/hero-book-cat.png`)
- [ ] Navbar: live IST clock with seconds
- [ ] Navbar: theme toggle works
- [ ] “Meet our psychologists” — 5 cards, images load
- [ ] No console hydration errors (open DevTools)

---

## Psychologists

- [ ] `/our-psychologist` — team grid loads
- [ ] `/our-psychologist/dr-priya-nair` (and other slugs) — profile pages load
- [ ] Invalid slug → 404
- [ ] “Book a Session” from card → `/book?psychologist=<slug>`

---

## Booking flow

- [ ] `/book` — psychologist picker appears first
- [ ] `/book?psychologist=dr-rohit-mehta` — skips picker
- [ ] Full flow: session → date/time → details → review
- [ ] Review shows correct psychologist name and photo
- [ ] WhatsApp opens with correct name, date, time, session, mode
- [ ] Confirmation page shows correct psychologist
- [ ] Mobile booking flow usable

---

## Contact & legal

- [ ] `/contact` — form submits successfully (requires Resend configured)
- [ ] Contact form shows helpful error if Resend not configured (503 message)
- [ ] `/privacy` and `/terms` render correctly
- [ ] Footer crisis line visible
- [ ] Footer social icons (if URLs set in env)
- [ ] Footer “Website by Kaltrix” link (if not disabled)

---

## SEO & sharing

- [ ] Page `<title>` shows “Aproch Health” (not Kaltrix)
- [ ] Share homepage on WhatsApp — preview title/description look correct
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) — note mobile score: ______

---

## Sign-off

- [ ] Client reviewed production URL
- [ ] Env vars documented (names only; secrets secured)
- [ ] DNS records documented for client registrar

**Notes / issues:**

_________________________________________________________________

_________________________________________________________________
