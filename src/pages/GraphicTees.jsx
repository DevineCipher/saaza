import { Link } from "react-router-dom";
import { asset } from "../site";

export default function GraphicTees() {
  return (
    <main>
      <section className="graphic-hero">
        <div
          className="graphic-photo"
          style={{ backgroundImage: `url(${asset("images/graphic-left.webp")})` }}
        />
        <div className="graphic-copy">
          <h1>
            SAAZA
            <br />
            OVERSIZED GRAPHIC TEES
          </h1>
          <p>
            Discover SAAZA oversized graphic tees made for those who like their style loud, effortless,
            and different. From eye-catching graphics to a relaxed oversized fit, every tee is designed
            to give you that perfect streetwear look while keeping you comfortable all day.
          </p>
          <p>Wear oversized. Stay original. Stand out. 🖤</p>
        </div>
        <div
          className="graphic-photo"
          style={{ backgroundImage: `url(${asset("images/graphic-right.webp")})` }}
        />
      </section>

      <section className="section split-features">
        <div>
          <h3>Premium Quality Fabric</h3>
          <p>
            Made with high-quality heavyweight fabric that feels soft, comfortable, and durable. Designed
            for a premium oversized fit that keeps you comfortable all day.
          </p>
        </div>
        <div>
          <h3>Excellent Print Quality</h3>
          <p>
            Our prints are sharp, vibrant, and carefully finished to give every SAAZA tee a premium look
            that stays fresh and eye-catching.
          </p>
        </div>
      </section>

      <section className="section fabric-cta">
        <h1>Premium Fabric. Exceptional Prints.</h1>
        <p>
          Crafted with 240 GSM premium heavyweight fabric for a structured, comfortable feel, finished
          with high-quality prints made to stand out and last. SAAZA — quality you can feel, style you
          can see.
        </p>
        <Link to="/shop" className="btn btn-dark">
          Shop Now
        </Link>
      </section>
    </main>
  );
}
