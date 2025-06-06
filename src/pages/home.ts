import { fetchProducts } from "../api";
import { productCard } from "../components/productCart";

export async function renderHome() {
  const container = document.getElementById("product-list");
  if (!container) return;

  const products = await fetchProducts();
  container.innerHTML = products.map(productCard).join("");
}
