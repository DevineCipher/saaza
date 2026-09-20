export const SITE = {
  name: "Saaza.pk",
  tagline: "Where comfort meets style.",
  email: "saaza.pk1@gmail.com",
  phone: "+92 329 8699415",
  phoneHref: "tel:+923298699415",
  whatsapp: "https://wa.me/message/MLAOL2VSWEANK1",
  facebook: "https://www.facebook.com/share/1HSZ7fmdCr/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/saaza.pk?igsh=Y2QxbWlhMzExbmRv",
  footerTitle: "Designed for Trendsetters, Crafted for Comfort.",
  footerBody:
    "Every Saaza piece is crafted with premium fabric and high-quality prints that are made to last. Shop with confidence and enjoy a 7-day exchange if needed.",
};

export function asset(path) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${String(path).replace(/^\//, "")}`;
}

export function formatPrice(amount) {
  return `Rs. ${Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function productImages(product) {
  if (!product?.images?.length) return [];
  return product.images.filter((src, index) => index === 0 || !src.includes("/alt-1."));
}

export function whatsappOrderUrl(lines) {
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/923298699415?text=${text}`;
}
