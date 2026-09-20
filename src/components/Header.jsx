import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE, asset } from "../site";
import { useStore } from "../store";

export default function Header() {
  const { cartCount } = useStore();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <button
          className="icon-btn"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <Link to="/" className="logo-link" aria-label="Saaza.pk home">
          <img src={asset("images/logo.png")} alt="Saaza.pk" />
        </Link>
        <Link to="/cart" className="icon-btn cart-btn" aria-label="eCommerce cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 7h15l-1.4 8.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.7L5.2 4H3"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="20" r="1.3" fill="currentColor" />
            <circle cx="18" cy="20" r="1.3" fill="currentColor" />
          </svg>
          <span className="cart-count">{cartCount}</span>
        </Link>
      </header>

      <div className={`nav-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`side-nav ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="side-nav-top">
          <img src={asset("images/logo.png")} alt="" />
          <button className="icon-btn dark" onClick={() => setOpen(false)} aria-label="Close menu">
            ×
          </button>
        </div>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/shop" end>
            Shop
          </NavLink>
          <NavLink to="/graphic-tees">Graphic Tees</NavLink>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
          <NavLink to="/contact">Contact Us</NavLink>
          <NavLink to="/wishlist">Wishlist</NavLink>
        </nav>
      </aside>
    </>
  );
}
