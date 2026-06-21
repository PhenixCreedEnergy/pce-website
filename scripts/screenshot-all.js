const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = "http://localhost:3001";
const OUT = path.join(__dirname, "../screenshots");

const pages = [
  { name: "home",             path: "/" },
  { name: "charging-network", path: "/charging-network" },
  { name: "pce-app",          path: "/pce-app" },
  { name: "investors",        path: "/investors" },
  { name: "about",            path: "/about" },
  { name: "contact",          path: "/contact" },
];

// Scroll through the whole page at real viewport so IntersectionObserver fires,
// then take a full-page screenshot.
async function scrollAndShot(page, filePath) {
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportH  = page.viewportSize().height;
  let pos = 0;
  while (pos < pageHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), pos);
    await page.waitForTimeout(350);
    pos += Math.floor(viewportH * 0.6);
  }
  // Scroll back to top for clean full-page shot
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: filePath, fullPage: true });
}

async function run() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const report  = {};

  for (const pg of pages) {
    console.log(`\n── ${pg.name} ──`);

    // ── Desktop (1440×900) ──────────────────────────────────────
    {
      const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const consoleErrors = [];
      page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
      page.on("pageerror", (e) => consoleErrors.push(e.message));

      await page.goto(`${BASE}${pg.path}`, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(800);

      const file = path.join(OUT, `${pg.name}-desktop.png`);
      await scrollAndShot(page, file);
      console.log(`  ✓ desktop  → ${file}`);

      const brokenImgs = await page.evaluate(() =>
        Array.from(document.images)
          .filter(img => !img.complete || img.naturalWidth === 0)
          .map(img => img.src)
      );
      const bodyBg   = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      const logoFound = await page.evaluate(() =>
        Array.from(document.images).some(img => img.src.includes("pce-logo"))
      );

      report[pg.name] = { consoleErrors, brokenImgs, bodyBg, logoFound };
      await ctx.close();
    }

    // ── Mobile (390×844) ────────────────────────────────────────
    {
      const ctx  = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await ctx.newPage();
      await page.goto(`${BASE}${pg.path}`, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(800);
      const file = path.join(OUT, `${pg.name}-mobile.png`);
      await scrollAndShot(page, file);
      console.log(`  ✓ mobile   → ${file}`);
      await ctx.close();
    }

    // ── Tablet (768×1024) ───────────────────────────────────────
    {
      const ctx  = await browser.newContext({ viewport: { width: 768, height: 1024 } });
      const page = await ctx.newPage();
      await page.goto(`${BASE}${pg.path}`, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(800);
      const file = path.join(OUT, `${pg.name}-tablet.png`);
      await scrollAndShot(page, file);
      console.log(`  ✓ tablet   → ${file}`);
      await ctx.close();
    }
  }

  await browser.close();

  console.log("\n\n═══════════════════════════════════════");
  console.log("           VERIFICATION REPORT          ");
  console.log("═══════════════════════════════════════");

  let allOk = true;
  for (const [name, d] of Object.entries(report)) {
    const ok  = (v) => v ? "✓" : "✗";
    const white = d.bodyBg === "rgb(255, 255, 255)";
    const noErr = d.consoleErrors.length === 0;
    const noImg = d.brokenImgs.length === 0;

    console.log(`\n[${name}]`);
    console.log(`  ${ok(d.logoFound)} Logo present    (pce-logo.png)`);
    console.log(`  ${ok(white)}  White bg        (${d.bodyBg})`);
    console.log(`  ${ok(noImg)}  No broken imgs${!noImg ? "  BROKEN: " + d.brokenImgs.join(", ") : ""}`);
    console.log(`  ${ok(noErr)}  No console errs${!noErr ? "\n     " + d.consoleErrors.slice(0,3).join("\n     ") : ""}`);

    if (!d.logoFound || !white || !noImg || !noErr) allOk = false;
  }
  console.log("\n═══════════════════════════════════════");
  console.log(allOk ? "  ✅  ALL CHECKS PASSED" : "  ❌  ISSUES FOUND — see above");
  console.log("═══════════════════════════════════════\n");
}

run().catch((e) => { console.error(e); process.exit(1); });
