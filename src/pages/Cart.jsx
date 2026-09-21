import { Link } from "react-router-dom";
import { SITE, asset, formatPrice, productImages, whatsappOrderUrl } from "../site";
import { useStore } from "../store";

export default function Cart() {
  const { products, cart, setQty, removeFromCart, cartTotal, clearCart } = useStore();
  const lines = cart
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);

  const message = [
    "New SAAZA order",
    ...lines.map(
      (line) =>
        `• ${line.product.name} x${line.qty} = ${formatPrice(line.product.price * line.qty)}`
    ),
    `Total: ${formatPrice(cartTotal)}`,
  ];

  return (
    <main className="page-narrow cart-page">
      <h1>Your cart</h1>
      {lines.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/shop">Continue shopping</Link>
        </p>
      ) : (
        <>
          <ul className="cart-list">
            {lines.map((line) => (
              <li key={line.slug}>
                <img src={asset(productImages(line.product)[0])} alt="" />
                <div>
                  <Link to={`/shop/${line.slug}`}>{line.product.name}</Link>
                  <p>{formatPrice(line.product.price)}</p>
                  <div className="qty">
                    <button onClick={() => setQty(line.slug, line.qty - 1)}>−</button>
                    <span>{line.qty}</span>
                    <button onClick={() => setQty(line.slug, line.qty + 1)}>+</button>
                  </div>
                </div>
                <button className="text-link" onClick={() => removeFromCart(line.slug)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <div className="cart-actions">
            <Link className="btn btn-dark" to="/checkout">
              Checkout with Cash on Delivery
            </Link>
            <p className="fine-print">
              Book your order on the next page. Pay in cash when it is delivered.
            </p>
            <a className="text-link" href={whatsappOrderUrl(message)} target="_blank" rel="noreferrer">
              Or send this cart on WhatsApp ({SITE.phone})
            </a>
            <button className="text-link" onClick={clearCart}>
              Clear cart
            </button>
          </div>
        </>
      )}
    </main>
  );
}
