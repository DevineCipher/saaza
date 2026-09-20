import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const DATA = path.join(ROOT, "src", "data");
const BASE = "https://saazapk2.odoo.com";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

const PRODUCT_URLS = [
  "/shop/saaza-wanted-oversized-tee-3",
  "/shop/saaza-the-world-is-yours-tee-4",
  "/shop/saaza-no-mercy-tee-5",
  "/shop/saaza-i-just-need-some-space-tee-6",
  "/shop/saaza-take-me-higher-oversized-tee-7",
  "/shop/saaza-fuck-the-system-oversized-tee-8",
  "/shop/saaza-made-by-society-oversized-tee-9",
  "/shop/saaza-spiderman-brand-new-oversized-tee-11",
  "/shop/saaza-plain-black-oversized-tee-12",
  "/shop/saaza-where-the-money-oversized-tee-14",
  "/shop/saaza-think-outside-oversized-tee-15",
  "/shop/saaza-undefeated-oversized-tee-16",
  "/shop/saaza-scarface-oversized-tee-17",
  "/shop/saaza-they-not-like-us-oversized-tee-18",
  "/shop/saaza-legends-never-fade-oversized-tee-19",
  "/shop/saaza-spaced-out-oversized-tee-20",
  "/shop/saaza-the-system-has-failed-us-oversized-tee-21",
  "/shop/saaza-rich-dreams-oversized-tee-22",
  "/shop/saaza-v9-oversized-graphic-tee-24",
  "/shop/saaza-oversized-graphic-tee-25",
  "/shop/saaza-plain-blue-oversized-tee-26",
  "/shop/saaza-plain-white-oversized-tee-27",
  "/shop/saaza-plain-grey-oversized-tee-28",
];

const SITE_ASSETS = [
  {
    url: `${BASE}/web/image/website/1/logo/Saaza.pk?unique=c9d74e4`,
    dest: "images/logo.png",
  },
  {
    url: `${BASE}/web/image/705-911ad380/WhatsApp%20Image%202026-08-06%20at%205.15.39%20PM.webp`,
    dest: "images/hero.webp",
  },
  {
    url: `${BASE}/web/image/710-44bf072b/WhatsApp%20Image%202026-08-06%20at%205.15.40%20PM.webp`,
    dest: "images/cta.webp",
  },
  {
    url: `${BASE}/web/image/1127-24629d03/ChatGPT%20Image%20Aug%2020%2C%202026%2C%2001_02_34%20PM%20%281%29.webp`,
    dest: "images/duo-front.webp",
  },
  {
    url: `${BASE}/web/image/1128-2e97ec46/WhatsApp%20Image%202026-08-20%20at%201.08.53%20PM.webp`,
    dest: "images/duo-back.webp",
  },
  {
    url: `${BASE}/web/image/1627-071d017c/WhatsApp%20Image%202026-08-28%20at%202.47.39%20PM.webp`,
    dest: "images/graphic-left.webp",
  },
  {
    url: `${BASE}/web/image/1626-d667cad8/WhatsApp%20Image%202026-08-28%20at%202.49.18%20PM.webp`,
    dest: "images/graphic-right.webp",
  },
];

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html,application/json" },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function download(url, destRel) {
  const dest = path.join(PUBLIC, destRel);
  await mkdir(path.dirname(dest), { recursive: true });
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log("saved", destRel, buf.length);
  return destRel;
}

function upgradeImage(url) {
  return url
    .replace(/\/image_128\//, "/image_1920/")
    .replace(/\/image_256\//, "/image_1920/")
    .replace(/\/image_512\//, "/image_1920/")
    .replace(/\/image_1024\//, "/image_1920/");
}

function abs(url) {
  if (!url) return null;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return BASE + url;
  return url;
}

function slugFromUrl(url) {
  return url
    .split("/")
    .pop()
    .replace(/-\d+$/, "")
    .replace(/^saaza-/, "");
}

function extFromUrl(url) {
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".png")) return "png";
  if (clean.endsWith(".jpg") || clean.endsWith(".jpeg")) return "jpg";
  if (clean.endsWith(".webp")) return "webp";
  return "jpg";
}

function unique(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function parseProduct(html, pageUrl) {
  let jsonld = [];
  const ldMatches = html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  );
  for (const m of ldMatches) {
    try {
      jsonld.push(JSON.parse(m[1]));
    } catch {
      /* ignore */
    }
  }
  const graph = jsonld.flatMap((j) => j["@graph"] || [j]);
  const product = graph.find((n) => n["@type"] === "Product") || {};
  const offer = product.offers || {};

  const nameMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const name = (product.name || nameMatch?.[1] || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

  const price = Number(offer.price) || Number(
    (html.match(/Rs[.\s\u00a0]*([\d,]+(?:\.\d+)?)/) || [])[1]?.replace(/,/g, "")
  );

  const imageUrls = [];
  if (product.image) imageUrls.push(abs(product.image));

  const imgRe =
    /(?:src|data-src|content)="(\/web\/image\/(?:product\.(?:product|image)\/\d+\/image_\d+[^"]+|website\/1\/logo[^"]*))"/g;
  let m;
  while ((m = imgRe.exec(html))) {
    const u = abs(m[1].replace(/&amp;/g, "&"));
    if (!u.includes("logo")) imageUrls.push(u);
  }

  const extraRe =
    /\/web\/image\/product\.image\/\d+\/image_\d+[^"'\\\s]*/g;
  const mainRe =
    /\/web\/image\/product\.product\/\d+\/image_\d+[^"'\\\s]*/g;
  for (const re of [extraRe, mainRe]) {
    const found = html.match(re) || [];
    for (const f of found) imageUrls.push(abs(f.replace(/&amp;/g, "&")));
  }

  const upgraded = unique(imageUrls.map(upgradeImage));
  const mains = upgraded.filter((u) => u.includes("product.product"));
  const extras = upgraded.filter((u) => u.includes("product.image"));
  const images = unique([...mains, ...extras]);

  return {
    name,
    slug: slugFromUrl(pageUrl),
    sourceUrl: pageUrl,
    price: price || 1499,
    currency: offer.priceCurrency || "PKR",
    inStock: String(offer.availability || "").includes("InStock"),
    imageUrls: images,
  };
}

async function main() {
  await mkdir(path.join(PUBLIC, "images", "products"), { recursive: true });
  await mkdir(DATA, { recursive: true });

  for (const asset of SITE_ASSETS) {
    try {
      await download(asset.url, asset.dest);
    } catch (err) {
      console.error("asset fail", asset.dest, err.message);
    }
  }

  const products = [];
  for (const rel of PRODUCT_URLS) {
    const url = BASE + rel;
    console.log("fetch", url);
    try {
      const html = await fetchText(url);
      const product = parseProduct(html, url);
      const localImages = [];
      for (let i = 0; i < product.imageUrls.length; i++) {
        const imgUrl = product.imageUrls[i];
        const ext = extFromUrl(imgUrl);
        const filename = i === 0 ? `main.${ext}` : `alt-${i}.${ext}`;
        const destRel = `images/products/${product.slug}/${filename}`;
        try {
          await download(imgUrl, destRel);
          localImages.push(`/${destRel}`);
        } catch (err) {
          console.error("img fail", imgUrl, err.message);
        }
      }
      products.push({
        id: product.slug,
        slug: product.slug,
        name: product.name,
        price: product.price,
        currency: "PKR",
        inStock: product.inStock,
        category: product.price === 999 ? "plain" : "graphic",
        images: localImages,
        shipping: "2-3 Business Days",
        guarantee: "7-day exchange if needed",
      });
    } catch (err) {
      console.error("product fail", url, err.message);
    }
  }

  await writeFile(
    path.join(DATA, "products.json"),
    JSON.stringify(products, null, 2)
  );
  console.log("wrote", products.length, "products");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
