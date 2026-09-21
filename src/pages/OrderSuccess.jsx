import { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { formatPrice } from "../site";

function loadOrder() {
  try {
    return JSON.parse(sessionStorage.getItem("saaza-last-order") || "null");
  } catch {
    return null;
  }
}

export default function OrderSuccess() {
  const order = loadOrder();
  const location = useLocation();
  const whatsapp = location.state?.whatsapp || order?.whatsapp;

  useEffect(() => {
    if (whatsapp) {
      window.open(whatsapp, "_blank", "noopener,noreferrer");
    }
  }, [whatsapp]);

  if (!order) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <main className="page-narrow order-success">
      <p className="success-kicker">Order booked</p>
      <h1>Cash on Delivery confirmed</h1>
      <p>
        Order <strong>{order.id}</strong> is booked. Pay{" "}
        <strong>{formatPrice(order.total)}</strong> in cash when it is delivered to{" "}
        {order.city}.
      </p>
      <ul className="success-items">
        {order.items.map((item) => (
          <li key={item.name}>
            {item.name} × {item.qty}
          </li>
        ))}
      </ul>
      <p className="fine-print">
        Send the order on WhatsApp so the team can confirm packing and delivery.
      </p>
      <div className="cart-actions">
        {whatsapp && (
          <a className="btn btn-dark" href={whatsapp} target="_blank" rel="noreferrer">
            Send order on WhatsApp
          </a>
        )}
        <Link className="btn btn-outline" to="/shop">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
