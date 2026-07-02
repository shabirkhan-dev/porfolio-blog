/**
 * Capture the homepage as a series of viewport screenshots.
 * Usage: bun scripts/shot-fullpage.mjs [prefix]
 */
import puppeteer from "puppeteer-core";

const url = process.env.SHOT_URL ?? "http://localhost:3122/";
const prefix = process.argv[2] ?? "page";

const b = await puppeteer.launch({ channel: "chrome", headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(url, { waitUntil: "networkidle0" });

const total = await p.evaluate(() => document.body.scrollHeight);
const vh = 900;
const shots = Math.ceil(total / vh);
console.log(`page height: ${total}px → ${shots} shots`);

for (let i = 0; i < shots; i++) {
  await p.evaluate((y) => window.scrollTo(0, y), i * vh);
  await new Promise((r) => setTimeout(r, 700));
  const out = `${prefix}-${String(i).padStart(2, "0")}.png`;
  await p.screenshot({ path: out });
  console.log(`saved ${out}`);
}
await b.close();
