import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import OrderSuccess from "./pages/OrderSuccess";
import GraphicTees from "./pages/GraphicTees";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import { StoreProvider, useStore } from "./store";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

function PageTitle() {
  const location = useLocation();
  const { products } = useStore();

  useEffect(() => {
    const titles = {
      "/": "Home | Saaza.pk",
      "/shop": "Products | Saaza.pk",
      "/graphic-tees": "Over-Sized Printed T-shirts | Saaza.pk",
      "/contact": "Contact Us | Saaza.pk",
      "/cart": "Cart | Saaza.pk",
      "/checkout": "Checkout | Saaza.pk",
      "/order-success": "Order booked | Saaza.pk",
      "/wishlist": "Wishlist | Saaza.pk",
    };
    if (location.pathname.startsWith("/shop/") && location.pathname !== "/shop") {
      const slug = location.pathname.split("/").pop();
      const product = products.find((p) => p.slug === slug);
      document.title = product ? `${product.name} | Saaza.pk` : "Saaza.pk";
      return;
    }
    document.title = titles[location.pathname] || "Saaza.pk";
  }, [location.pathname, products]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <StoreProvider>
        <PageTitle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:slug" element={<Product />} />
          <Route path="/graphic-tees" element={<GraphicTees />} />
          <Route path="/over-sized-printed-t-shirts" element={<Navigate to="/graphic-tees" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contactus" element={<Navigate to="/contact" replace />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </StoreProvider>
    </BrowserRouter>
  );
}

