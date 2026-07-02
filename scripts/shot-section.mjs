/**
 * Screenshot any section by CSS selector.
 * Usage: bun scripts/shot-section.mjs <selector> <out.png> [width] [height]
 */
import puppeteer from "puppeteer-core";

const selector = process.argv[2] ?? "#contact";
const out = process.argv[3] ?? "section.png";
const width = Number(process.argv[4] ?? 1440);
const height = Number(process.argv[5] ?? 900);

const b = await puppeteer.launch({ channel: "chrome", headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width, height });
await p.goto(process.env.SHOT_URL ?? "http://localhost:3111/", { waitUntil: "networkidle0" });

await p.evaluate((sel) => {
  const el = document.querySelector(sel);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 60;
  window.scrollTo({ top, behavior: "instant" });
}, selector);
await new Promise((r) => setTimeout(r, 1200));
await p.screenshot({ path: out });
await b.close();
console.log(`saved ${out}`);
