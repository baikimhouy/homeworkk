
export async function fetchProducts(): Promise<any[]> {
  const response = await fetch("https://dummyjson.com/products?limit=50");
  const data = await response.json();
  return data.products;
}

export function getUniqueCategories(products: any[]): string[] {
  return [...new Set(products.map((product) => product.category))];
}

export function formatCategoryName(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function filterProducts(products: any[], filters: any): any[] {
  let result = [...products];

  if (filters.search) {
    const term = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term)
    );
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.price) {
    const [min, max] = filters.price.split("-").map(Number);
    result = result.filter((p) =>
      max ? p.price >= min && p.price <= max : p.price >= min
    );
  }

  return result;
}
