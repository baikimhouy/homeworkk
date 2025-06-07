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

interface Filters {
  search: string;
  category: string;
  price: string;
}

// State
let products: Product[] = [];
let categories: string[] = [];
let filters: Filters = {
  search: "",
  category: "",
  price: "",
};

// DOM elements
const productList = document.getElementById("product-list") as HTMLDivElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const categoryFilter = document.getElementById(
  "category-filter"
) as HTMLSelectElement;
const priceFilter = document.getElementById(
  "price-filter"
) as HTMLSelectElement;
const activeFilters = document.getElementById(
  "active-filters"
) as HTMLDivElement;
const clearFiltersBtn = document.getElementById(
  "clear-filters"
) as HTMLButtonElement;
const loading = document.getElementById("loading") as HTMLDivElement;
const noResults = document.getElementById("no-results") as HTMLDivElement;

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  attachEventListeners();
});

async function fetchProducts(): Promise<void> {
  try {
    loading.classList.remove("hidden");
    noResults.classList.add("hidden");

    const res = await fetch("https://dummyjson.com/products?limit=52");
    const data = await res.json();
    products = data.products;
    categories = [...new Set(products.map((p) => p.category))];

    populateCategoryFilter();
    renderProducts(products);
  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
    loading.classList.add("hidden");
  }
}

function populateCategoryFilter(): void {
  categoryFilter.innerHTML = `
      <option value="">All Categories</option>
      ${categories
        .map(
          (cat) => `
        <option value="${cat}">${formatCategoryName(cat)}</option>
      `
        )
        .join("")}
    `;
}

function formatCategoryName(category: string): string {
  return category
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function renderProducts(productsToRender: Product[]): void {
  if (productsToRender.length === 0) {
    noResults.classList.remove("hidden");
    productList.innerHTML = "";
    return;
  }

  noResults.classList.add("hidden");

  productList.innerHTML = productsToRender
    .map(
      (product) => `
      <a  href="./src/pages/product.html?id=${product.id}"
 class="group relative block overflow-hidden rounded-2xl bg-gray-50 shadow-md transition hover:shadow-lg">
        <button class="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
          <span class="sr-only">Wishlist</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <img src="${product.thumbnail}" alt="${
        product.title
      }" class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72" />
        <div class="relative border border-gray-100 bg-white p-6">
          <p class="text-gray-700">$${product.price}</p>
          <h3 class="mt-1.5 text-lg font-medium text-gray-900">${
            product.title
          }</h3>
          <p class="mt-1.5 line-clamp-3 text-gray-700">${
            product.description
          }</p>
          <div class="text-yellow-500 pt-2">⭐ ${product.rating}</div>
          <div class="text-sm text-gray-500 mt-1">${formatCategoryName(
            product.category
          )}</div>
          <form class="mt-4 flex gap-4">
            <button class="flex h-12 w-full items-center justify-center rounded-2xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-200 hover:shadow-sm">
              Add to Cart
            </button>
            <button type="button" class="flex h-12 w-full items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-600 hover:shadow-sm">
              Buy Now
            </button>
          </form>
        </div>
      </a>
    `
    )
    .join("");
}

function filterProducts(): void {
  let filtered = [...products];

  if (filters.search) {
    const term = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term)
    );
  }

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters.price) {
    const [min, max] = filters.price.split("-").map(Number);
    filtered = filtered.filter((p) => {
      if (max) return p.price >= min && p.price <= max;
      return p.price >= min;
    });
  }

  renderProducts(filtered);
  updateActiveFilters();
}

function updateActiveFilters(): void {
  const container = activeFilters.querySelector(".flex")!;
  container.innerHTML = "";
  let hasFilters = false;

  for (const key in filters) {
    if (filters[key as keyof Filters]) {
      hasFilters = true;

      const label =
        key === "search"
          ? `Search: "${filters.search}"`
          : key === "category"
          ? `Category: ${formatCategoryName(filters.category)}`
          : (() => {
              const [min, max] = filters.price.split("-");
              return `Price: ${max ? `$${min} - $${max}` : `Over $${min}`}`;
            })();

      container.innerHTML += `
          <span class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
            ${label}
            <button data-filter="${key}" class="ml-1.5 text-gray-500 hover:text-gray-700">&times;</button>
          </span>
        `;
    }
  }

  activeFilters.classList.toggle("hidden", !hasFilters);
}

function attachEventListeners(): void {
  searchInput.addEventListener("input", (e) => {
    filters.search = (e.target as HTMLInputElement).value;
    filterProducts();
  });

  categoryFilter.addEventListener("change", (e) => {
    filters.category = (e.target as HTMLSelectElement).value;
    filterProducts();
  });

  priceFilter.addEventListener("change", (e) => {
    filters.price = (e.target as HTMLSelectElement).value;
    filterProducts();
  });

  clearFiltersBtn.addEventListener("click", () => {
    filters = { search: "", category: "", price: "" };
    searchInput.value = "";
    categoryFilter.value = "";
    priceFilter.value = "";
    filterProducts();
  });

  activeFilters.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON" && target.dataset.filter) {
      const filterKey = target.dataset.filter as keyof Filters;
      filters[filterKey] = "";
      (
        document.getElementById(`${filterKey}-filter`) as
          | HTMLInputElement
          | HTMLSelectElement
      ).value = "";
      filterProducts();
    }
  });
}
if (window.location.pathname.includes("product.html")) {
  const container = document.getElementById("product-detail");

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId || isNaN(Number(productId))) {
    container!.innerHTML = "<p class='text-red-500'>Invalid product ID.</p>";
  } else {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((product) => {
        container!.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-80 object-cover rounded-lg" />
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">${product.title}</h1>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <p class="text-xl font-semibold text-emerald-600 mb-2">$${product.price}</p>
                <div class="text-yellow-500 mb-2">⭐ ${product.rating}</div>
                <div class="text-sm text-gray-500 mb-2">Brand: ${product.brand}</div>
                <div class="text-sm text-gray-500 mb-6">Category: ${product.category}</div>
                <div class="flex gap-4">
                  <button class="w-full py-3 px-4 bg-gray-200 rounded-xl hover:bg-gray-300 text-gray-800 font-medium">Add to Cart</button>
                  <button class="w-full py-3 px-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-medium">Buy Now</button>
                </div>
              </div>
            </div>
          `;
      })
      .catch(() => {
        container!.innerHTML =
          "<p class='text-red-500'>Failed to load product details.</p>";
      });
  }
}
  