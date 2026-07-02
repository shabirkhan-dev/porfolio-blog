import puppeteer from "puppeteer-core";

const url = process.env.SHOT_URL ?? "http://localhost:3116/";
const b = await puppeteer.launch({ channel: "chrome", headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
p.on("console", (msg) => {
  const type = msg.type();
  if (type === "error" || type === "warn") console.log(`[${type}] ${msg.text()}`);
});
p.on("pageerror", (err) => console.log(`[pageerror] ${err.stack ?? err.message}`));
await p.setViewport({ width: 1440, height: 900 });
await p.goto(url, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 3000));
const info = await p.evaluate(() => {
  const sections = [...document.querySelectorAll("section")].map((s) => ({
    id: s.id || null,
    cls: (s.className || "").slice(0, 60),
    style: s.getAttribute("style"),
  }));
  return sections;
});
console.log(JSON.stringify(info, null, 2));
await b.close();
