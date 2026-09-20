import { Link } from "react-router-dom";
import { asset, productImages } from "../site";
import { useStore } from "../store";

export default function Wishlist() {
  const { products, wishlist, toggleWishlist, addToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));

  return (
    <main className="page-narrow">
      <h1>Wishlist</h1>
      {items.length === 0 ? (
        <p>
          No saved pieces yet. <Link to="/shop">Browse the shop</Link>
        </p>
      ) : (
        <ul className="cart-list">
          {items.map((product) => (
            <li key={product.slug}>
              <img src={asset(productImages(product)[0])} alt="" />
              <div>
                <Link to={`/shop/${product.slug}`}>{product.name}</Link>
                <div className="inline-actions">
                  <button className="btn btn-dark" onClick={() => addToCart(product.slug)}>
                    Add to Cart
                  </button>
                  <button className="text-link" onClick={() => toggleWishlist(product.slug)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
