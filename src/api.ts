// src/api.ts
export async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products?limit=50");
  const data = await response.json();
  return data.products;
}

export async function fetchCategories() {
  const response = await fetch("https://dummyjson.com/products/categories");
  const data = await response.json();
  return data;
}
