# Connect GoDaddy domain to Vercel — Aproch Health

Step-by-step for linking a GoDaddy-purchased domain to the Vercel deployment.

**Before starting:** confirm the exact domain with the client (e.g. `aprochhealth.com`) and whether they use email on `@domain` (do not remove MX records).

---

## 1. Add domain in Vercel

1. Open [vercel.com](https://vercel.com) → **Aproch Health** project
2. **Settings → Domains**
3. Add:
   - `yourdomain.com` (apex)
   - `www.yourdomain.com`
4. Status will show **Invalid Configuration** until GoDaddy DNS is updated — expected
5. Copy the **exact** values from Vercel (IPs can change; always use the dashboard)

**Typical records Vercel shows:**

| Type | Name / Host | Value |
|------|-------------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

---

## 2. Configure DNS in GoDaddy

1. [godaddy.com](https://www.godaddy.com) → **My Products** → domain → **DNS** / **Manage DNS**
2. **Turn off** Domain Forwarding and Website Builder if enabled (conflicts with Vercel)
3. **Remove** conflicting records:
   - Existing **A** on `@` (parking / old host)
   - Existing **CNAME** on `www`
4. **Add** records from Vercel:

### A record (root / apex)

| Field | Value |
|-------|-------|
| Type | A |
| Name | `@` |
| Value | `76.76.21.21` (confirm in Vercel) |
| TTL | 600 seconds or 1 Hour |

### CNAME record (www)

| Field | Value |
|-------|-------|
| Type | CNAME |
| Name | `www` |
| Value | `cname.vercel-dns.com` |
| TTL | 1 Hour |

5. **Save** — do not delete **MX**, **TXT** (SPF/DKIM), or other email records unless migrating email

---

## 3. Wait for DNS + SSL

- Propagation: **5 minutes – 48 hours** (often under 1 hour)
- Vercel **Domains** → status becomes **Valid Configuration**
- HTTPS certificate is issued automatically after DNS validates
- Click **Refresh** on the Domains page if it stays pending

Verify from your machine:

```bash
npm run verify:dns -- yourdomain.com
```

---

## 4. Set primary domain and redirect

In Vercel **Settings → Domains**:

1. Choose primary URL (recommended: apex `https://yourdomain.com`)
2. Redirect `www` → apex (or the reverse, per client preference)

---

## 5. Environment variable + redeploy

1. Vercel → **Settings → Environment Variables**
2. Add or update (Production):

   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

   No trailing slash. Use the same URL as the primary domain from step 4.

3. **Deployments** → latest → **⋯ → Redeploy**

This fixes sitemap, Open Graph, and metadata URLs (see `lib/site.ts`).

---

## 6. Post-launch QA

Run [LAUNCH_QA.md](./LAUNCH_QA.md) on the live domain:

- HTTPS padlock on apex and www redirect
- `/sitemap.xml` uses production domain (not `*.vercel.app`)
- Contact form (if Resend is configured)

---

## Troubleshooting

| Symptom | Action |
|---------|--------|
| Invalid Configuration in Vercel | Re-check A `@` and CNAME `www` in GoDaddy match Vercel exactly |
| GoDaddy parking page | Disable forwarding; point A `@` to Vercel IP |
| SSL stuck on Pending | Wait for DNS; up to 24h |
| Sitemap shows `vercel.app` | Set `NEXT_PUBLIC_SITE_URL` and redeploy |
| Email stopped working | Restore MX records in GoDaddy |

---

## Email to send the client (copy/paste)

Subject: DNS records needed for your website

Hi,

Please add these DNS records in your GoDaddy account (My Products → your domain → DNS). Do not delete any existing MX or email records.

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

(Confirm values in our Vercel dashboard before sending — IP must match.)

After you save, the site will go live at your domain within a few hours. Reply when done so we can verify.

Thanks
