import { createContext, useContext, useEffect, useMemo, useState } from "react";
import products from "./data/products.json";

const StoreContext = createContext(null);
const CART_KEY = "saaza-cart";
const WISH_KEY = "saaza-wishlist";

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load(CART_KEY, []));
  const [wishlist, setWishlist] = useState(() => load(WISH_KEY, []));

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo(() => {
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartTotal = cart.reduce((sum, item) => {
      const product = products.find((p) => p.slug === item.slug);
      return sum + (product?.price || 0) * item.qty;
    }, 0);

    return {
      products,
      cart,
      wishlist,
      cartCount,
      cartTotal,
      addToCart(slug, qty = 1) {
        setCart((prev) => {
          const existing = prev.find((item) => item.slug === slug);
          if (existing) {
            return prev.map((item) =>
              item.slug === slug ? { ...item, qty: item.qty + qty } : item
            );
          }
          return [...prev, { slug, qty }];
        });
      },
      setQty(slug, qty) {
        setCart((prev) =>
          qty <= 0
            ? prev.filter((item) => item.slug !== slug)
            : prev.map((item) => (item.slug === slug ? { ...item, qty } : item))
        );
      },
      removeFromCart(slug) {
        setCart((prev) => prev.filter((item) => item.slug !== slug));
      },
      clearCart() {
        setCart([]);
      },
      toggleWishlist(slug) {
        setWishlist((prev) =>
          prev.includes(slug) ? prev.filter((id) => id !== slug) : [...prev, slug]
        );
      },
      inWishlist(slug) {
        return wishlist.includes(slug);
      },
    };
  }, [cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
