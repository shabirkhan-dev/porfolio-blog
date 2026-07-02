import puppeteer from "puppeteer-core";

const url = process.env.SHOT_URL ?? "http://localhost:3115/";

const b = await puppeteer.launch({ channel: "chrome", headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(url, { waitUntil: "networkidle0" });
await p
  .waitForSelector("section[style*='height']", { timeout: 15000 })
  .catch(() => {});

const d = await p.evaluate(() => {
  const el = document.querySelector("section[style*='height']");
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, h: r.height, vh: window.innerHeight };
});
if (!d) {
  console.error("experience section not found");
  process.exit(1);
}
console.log(`runway height: ${Math.round(d.h)}px (${(d.h / d.vh).toFixed(1)} viewports)`);

for (const t of [0.1, 0.5, 0.9]) {
  await p.evaluate((y) => window.scrollTo(0, y), d.top + (d.h - d.vh) * t);
  await new Promise((r) => setTimeout(r, 1400));
  const out = `experience-${Math.round(t * 100)}.png`;
  await p.screenshot({ path: out });
  console.log(`saved ${out}`);
}
await b.close();
