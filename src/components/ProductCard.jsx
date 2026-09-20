import { Link } from "react-router-dom";
import { asset, formatPrice, productImages } from "../site";
import { useStore } from "../store";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const images = productImages(product).map(asset);
  const wished = inWishlist(product.slug);

  return (
    <article className="product-card">
      <Link to={`/shop/${product.slug}`} className="product-thumb">
        <img src={images[0]} alt={product.name} />
        {images[1] && <img className="hover-img" src={images[1]} alt="" />}
      </Link>
      <div className="product-info">
        <Link to={`/shop/${product.slug}`}>
          <h6>{product.name}</h6>
        </Link>
        <p className="price">{formatPrice(product.price)}</p>
        <div className="product-actions">
          <button className="btn btn-dark" onClick={() => addToCart(product.slug)}>
            Add to Cart
          </button>
          <button
            className={`wish-btn ${wished ? "on" : ""}`}
            aria-label="Add to wishlist"
            onClick={() => toggleWishlist(product.slug)}
          >
            ♥
          </button>
        </div>
      </div>
    </article>
  );
}
