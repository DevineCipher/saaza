import { useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { asset } from "../site";
import { useStore } from "../store";

export default function Home() {
  const { products } = useStore();
  const scroller = useRef(null);
  const latest = products.slice(0, 12);

  function scroll(dir) {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <main>
      <section className="hero" style={{ backgroundImage: `url(${asset("images/hero.webp")})` }}>
        <div className="hero-overlay">
          <h2>
            SAAZA PREMIUM
            <br />
            OVER-SIZED
          </h2>
          <p>Where comfort meets style.</p>
          <Link to="/shop" className="btn btn-white">
            Shop Now
          </Link>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>SAAZA.PK – Crafted for comfort.</span>
          ))}
        </div>
      </div>

      <section className="section latest">
        <div className="section-head">
          <div>
            <h2>Our latest products</h2>
            <p>Explore our collection here.</p>
          </div>
          <Link to="/shop" className="text-link">
            Shop all
          </Link>
        </div>
        <div className="carousel-wrap">
          <button className="round-nav" onClick={() => scroll(-1)} aria-label="Previous">
            ‹
          </button>
          <div className="carousel" ref={scroller}>
            {latest.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <button className="round-nav" onClick={() => scroll(1)} aria-label="Next">
            ›
          </button>
        </div>
      </section>

      <section className="duo">
        <img src={asset("images/duo-front.webp")} alt="SAAZA Undefeated oversized tee front" />
        <img src={asset("images/duo-back.webp")} alt="SAAZA Undefeated oversized tee back" />
      </section>

      <section className="section">
        <div className="cta-box">
          <div className="cta-copy">
            <h3>LIMITED STOCK</h3>
            <p>Shop Your Favorite Designs Before They Sell Out.</p>
            <Link to="/shop" className="btn btn-muted">
              Shop Now
            </Link>
          </div>
          <img src={asset("images/cta.webp")} alt="SAAZA Street Gangster oversized tee" />
        </div>
      </section>
    </main>
  );
}
