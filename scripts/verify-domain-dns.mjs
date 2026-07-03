#!/usr/bin/env node
/**
 * Verify GoDaddy → Vercel DNS for apex + www.
 * Usage: node scripts/verify-domain-dns.mjs yourdomain.com
 */

import { promises as dns } from "node:dns";

const VERCEL_APEX_IP = "76.76.21.21";
const VERCEL_WWW_CNAME = "cname.vercel-dns.com";

const domain = process.argv[2]?.replace(/^https?:\/\//, "").replace(/\/$/, "");

if (!domain) {
  console.error("Usage: node scripts/verify-domain-dns.mjs <domain>");
  console.error("Example: node scripts/verify-domain-dns.mjs aprochhealth.com");
  process.exit(1);
}

function ok(msg) {
  console.log(`  OK  ${msg}`);
}

function fail(msg) {
  console.log(`  FAIL  ${msg}`);
}

async function main() {
  console.log(`\nDNS check for ${domain}\n`);

  let passed = 0;
  let failed = 0;

  try {
    const aRecords = await dns.resolve4(domain);
    const matchesVercel = aRecords.includes(VERCEL_APEX_IP);
    if (matchesVercel) {
      ok(`A @ → ${aRecords.join(", ")} (includes ${VERCEL_APEX_IP})`);
      passed++;
    } else {
      fail(`A @ → ${aRecords.join(", ") || "(none)"} — expected ${VERCEL_APEX_IP}`);
      failed++;
    }
  } catch (err) {
    fail(`A @ — ${err.code || err.message}`);
    failed++;
  }

  try {
    const cnames = await dns.resolveCname(`www.${domain}`);
    const target = cnames[0]?.replace(/\.$/, "") ?? "";
    if (target === VERCEL_WWW_CNAME) {
      ok(`CNAME www → ${target}`);
      passed++;
    } else {
      fail(`CNAME www → ${target || "(none)"} — expected ${VERCEL_WWW_CNAME}`);
      failed++;
    }
  } catch (err) {
    fail(`CNAME www — ${err.code || err.message}`);
    failed++;
  }

  console.log(`\n${passed} passed, ${failed} failed\n`);

  if (failed > 0) {
    console.log("Next steps:");
    console.log("  1. Add domain in Vercel → Settings → Domains");
    console.log("  2. Add A + CNAME in GoDaddy (see docs/GODADDY_VERCEL_DNS.md)");
    console.log("  3. Wait for propagation and run this script again\n");
    process.exit(1);
  }

  console.log("DNS looks correct. Confirm Valid Configuration in Vercel Domains,");
  console.log("set NEXT_PUBLIC_SITE_URL, and redeploy.\n");
}

main();
