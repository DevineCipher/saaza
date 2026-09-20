import { Link } from "react-router-dom";
import { SITE } from "../site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <h3>{SITE.footerTitle}</h3>
        <p>{SITE.footerBody}</p>
        <a className="btn btn-light" href={SITE.whatsapp} target="_blank" rel="noreferrer">
          Get in touch
        </a>
      </div>
      <div className="footer-meta">
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <a href={SITE.phoneHref}>{SITE.phone}</a>
        <div className="socials">
          <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
            Facebook
          </a>
          <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            Instagram
          </a>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" aria-label="Whatsapp">
            Whatsapp
          </a>
        </div>
        <p className="copyright">Copyright © Saaza.pk</p>
      </div>
      <Link to="/shop" className="sr-only">
        Shop
      </Link>
    </footer>
  );
}
