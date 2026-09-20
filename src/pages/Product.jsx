import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { asset, formatPrice, productImages } from "../site";
import { useStore } from "../store";

export default function Product() {
  const { slug } = useParams();
  const { products, addToCart, toggleWishlist, inWishlist } = useStore();
  const product = products.find((p) => p.slug === slug);
  const images = product ? productImages(product).map(asset) : [];
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <main className="page-narrow">
        <h1>Product not found</h1>
        <Link to="/shop">Back to shop</Link>
      </main>
    );
  }

  return (
    <main className="product-page">
      <nav className="crumbs">
        <Link to="/shop">All products</Link>
        <span> / {product.name}</span>
      </nav>
      <div className="product-layout">
        <div className="gallery">
          {images.length > 1 && (
            <div className="thumbs">
              {images.map((src, i) => (
                <button key={src} className={i === active ? "on" : ""} onClick={() => setActive(i)}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
          <div className="main-photo">
            <img src={images[active] || images[0]} alt={product.name} />
          </div>
        </div>
        <div className="buy-box">
          <h1>{product.name}</h1>
          <div className="price-row">
            <span>Price</span>
            <strong>{formatPrice(product.price)}</strong>
          </div>
          <div className="qty-row">
            <div className="qty">
              <button onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Remove one">
                −
              </button>
              <input
                aria-label="Quantity"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              />
              <button onClick={() => setQty((n) => n + 1)} aria-label="Add one">
                +
              </button>
            </div>
            <button className="btn btn-dark" onClick={() => addToCart(product.slug, qty)}>
              Add to cart
            </button>
          </div>
          <button className="btn btn-outline" onClick={() => toggleWishlist(product.slug)}>
            {inWishlist(product.slug) ? "Wishlisted" : "Add to wishlist"}
          </button>
          <p className="fine-print">Terms and Conditions</p>
          <p>30-day money-back guarantee</p>
          <p>Shipping: 2-3 Business Days</p>
        </div>
      </div>
    </main>
  );
}
