import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { formatPrice, whatsappOrderUrl } from "../site";
import { useStore } from "../store";

const EMPTY = {
  name: "",
  phone: "",
  city: "",
  address: "",
  notes: "",
  payment: "cod",
};

export default function Checkout() {
  const { products, cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(false);

  const lines = cart
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);

  if (lines.length === 0 && !placed) {
    return <Navigate to="/cart" replace />;
  }

  function update(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function placeOrder(e) {
    e.preventDefault();
    setError("");

    const phone = form.phone.replace(/[\s-]/g, "");
    if (!form.name.trim() || !form.city.trim() || !form.address.trim()) {
      setError("Please fill in your name, city, and delivery address.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number so we can confirm your order.");
      return;
    }

    const order = {
      id: `SAAZA-${Date.now().toString().slice(-8)}`,
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      address: form.address.trim(),
      notes: form.notes.trim(),
      payment: "Cash on Delivery",
      total: cartTotal,
      items: lines.map((line) => ({
        name: line.product.name,
        qty: line.qty,
        price: line.product.price,
      })),
    };

    const message = [
      `New SAAZA order ${order.id}`,
      "",
      "Items:",
      ...order.items.map(
        (item) => `• ${item.name} x${item.qty} = ${formatPrice(item.price * item.qty)}`
      ),
      `Total: ${formatPrice(order.total)}`,
      "",
      "Payment: Cash on Delivery",
      `Name: ${order.name}`,
      `Phone: ${order.phone}`,
      `City: ${order.city}`,
      `Address: ${order.address}`,
      order.notes ? `Notes: ${order.notes}` : "",
    ].filter(Boolean);

    const whatsapp = whatsappOrderUrl(message);
    setPlaced(true);
    sessionStorage.setItem("saaza-last-order", JSON.stringify({ ...order, whatsapp }));
    navigate("/order-success", { replace: true, state: { whatsapp } });
    clearCart();
  }

  return (
    <main className="page-narrow checkout-page">
      <h1>Checkout</h1>
      <p className="checkout-lead">Book your order and pay with cash when it is delivered.</p>

      <form className="checkout-grid" onSubmit={placeOrder}>
        <section className="checkout-form">
          <h2>Delivery details</h2>
          <label>
            Full name *
            <input name="name" required value={form.name} onChange={update} placeholder="Your name" />
          </label>
          <label>
            Phone number *
            <input
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={update}
              placeholder="03xx xxxxxxx"
            />
          </label>
          <label>
            City *
            <input name="city" required value={form.city} onChange={update} placeholder="Karachi" />
          </label>
          <label>
            Delivery address *
            <textarea
              name="address"
              required
              value={form.address}
              onChange={update}
              placeholder="House / street, area"
            />
          </label>
          <label>
            Order notes
            <textarea
              name="notes"
              value={form.notes}
              onChange={update}
              placeholder="Size, colour, or delivery instructions"
            />
          </label>

          <fieldset className="payment-options">
            <legend>Payment method</legend>
            <label className={`payment-card ${form.payment === "cod" ? "on" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={form.payment === "cod"}
                onChange={update}
              />
              <span>
                <strong>Cash on Delivery</strong>
                <em>Pay in cash when your order arrives. No advance payment needed.</em>
              </span>
            </label>
          </fieldset>

          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-dark" type="submit">
            Place Cash on Delivery order
          </button>
          <Link className="text-link" to="/cart">
            Back to cart
          </Link>
        </section>

        <aside className="order-summary">
          <h2>Order summary</h2>
          <ul>
            {lines.map((line) => (
              <li key={line.slug}>
                <span>
                  {line.product.name} × {line.qty}
                </span>
                <strong>{formatPrice(line.product.price * line.qty)}</strong>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total due on delivery</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
        </aside>
      </form>
    </main>
  );
}
