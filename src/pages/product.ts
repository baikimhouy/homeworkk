interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
  brand: string;
}

const productImage = document.getElementById(
  "product-image"
) as HTMLImageElement;
const productTitle = document.getElementById("product-title") as HTMLElement;
const productDescription = document.getElementById(
  "product-description"
) as HTMLElement;
const productPrice = document.getElementById("product-price") as HTMLElement;
const productRating = document.getElementById("product-rating") as HTMLElement;
const productBrandCategory = document.getElementById(
  "product-brand-category"
) as HTMLElement;
const loading = document.getElementById("loading") as HTMLElement;
const error = document.getElementById("error") as HTMLElement;
const detailContainer = document.getElementById(
  "product-detail"
) as HTMLElement;

async function fetchProduct(id: string) {
  try {
    loading.style.display = "block";
    detailContainer.style.display = "none";
    error.style.display = "none";

    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) throw new Error("Product not found");

    const product: Product = await response.json();

    productImage.src = product.thumbnail;
    productImage.alt = product.title;
    productTitle.textContent = product.title;
    productDescription.textContent = product.description;
    productPrice.textContent = `$${product.price}`;
    productRating.textContent = `⭐ ${product.rating}`;
    productBrandCategory.textContent = `Brand: ${product.brand} | Category: ${product.category}`;

    loading.style.display = "none";
    detailContainer.style.display = "flex";
  } catch (e) {
    loading.style.display = "none";
    error.textContent = "Error loading product.";
    error.style.display = "block";
  }
}

function getProductIdFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromUrl();
  if (productId) {
    fetchProduct(productId);
  } else {
    error.textContent = "No product ID specified.";
    error.style.display = "block";
  }
});
