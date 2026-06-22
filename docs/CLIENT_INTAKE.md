# Client intake — Aproch Health launch

Copy the sections below into an email or form for your client. Fill in answers before configuring Vercel and DNS.

---

## Domain & DNS

| Question | Client answer |
|----------|---------------|
| **Exact domain name** | e.g. `aprochhealth.com` |
| **Preferred canonical URL** | `https://aprochhealth.com` **or** `https://www.aprochhealth.com` |
| **Domain registrar** | GoDaddy / Namecheap / Hostinger / Google / other: ______ |
| **DNS access** | [ ] You will add DNS records we send  [ ] You will share registrar login (secure channel) |
| **Email already on this domain?** | [ ] No  [ ] Yes — provider: ______ (Google Workspace / Zoho / other) |

> If email is already on the domain, we will only **add** records for the website and Resend. We will **not** remove or change MX records without your approval.

---

## Business details (for website configuration)

| Question | Client answer |
|----------|---------------|
| **WhatsApp number for bookings** | +91 ________________ (used in Book flow) |
| **Official contact email** | hello@_______________ |
| **RCI registration number** (if shown on site) | RCI/CL/____/_____ |
| **Instagram URL** | https://instagram.com/_______________ (optional) |
| **LinkedIn URL** | https://linkedin.com/company/_______________ (optional) |

---

## Content (when ready for public launch)

| Question | Client answer |
|----------|---------------|
| **Final psychologist photos & bios** | [ ] Use placeholders for now  [ ] We will send real profiles by: ______ |
| **Crisis line number** (footer) | Currently iCall 9152987821 — change? [ ] Keep  [ ] Use: ______ |

---

## Accounts & access

| Question | Client answer |
|----------|---------------|
| **Who pays Vercel hosting?** | [ ] Kaltrix  [ ] Client (we will invite you as Viewer) |
| **Who owns Resend (contact form email)?** | [ ] Kaltrix sets up  [ ] Client creates account |
| **GitHub / code ownership** | [ ] Stays with Kaltrix  [ ] Transfer to client |

---

## DNS records we will send (after Vercel setup)

Once the site is deployed on Vercel, we will send **exact** records. Typically:

**Website (Vercel)**

| Type | Name | Value |
|------|------|-------|
| A | `@` | (Vercel IP — we will confirm) |
| CNAME | `www` | `cname.vercel-dns.com` |

**Contact form email (Resend)** — only if enabling the contact form:

| Type | Name | Value |
|------|------|-------|
| TXT / CNAME | (per Resend dashboard) | (we will send after domain is added in Resend) |

**Please do not delete existing MX, SPF, or DKIM records** unless we confirm a full email migration.

---

## What happens next

1. We deploy to a temporary `*.vercel.app` URL for your review  
2. You complete this form  
3. We send DNS records → you add them at your registrar  
4. Domain goes live with HTTPS (usually within a few hours)  
5. Final QA and handoff  

Questions? Contact Kaltrix at [https://kaltrix.live](https://kaltrix.live).
