import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useStore } from "../store";

export default function Shop() {
  const { products } = useStore();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => p.name.toLowerCase().includes(q));
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, query, sort]);

  return (
    <main className="shop-page">
      <div className="shop-banner">
        <h1>SAAZA.PK</h1>
      </div>
      <div className="shop-toolbar">
        <p>Saaza - Oversized Tees</p>
        <div className="shop-controls">
          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort By">
            <option value="featured">Sort By: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      <div className="product-grid">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  );
}
