async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=50");
  const data = await res.json();
  return data.products;
}

function createCard(product: any): string {
  return `
    <a href="#" class="group relative block overflow-hidden rounded-2xl bg-gray-50 shadow-md transition hover:shadow-lg">
  <button
    class="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
  >
    <span class="sr-only">Wishlist</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  </button>

  <img
    src="${product.thumbnail}"
    alt="${product.title}"
    class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
  />

  <div class="relative border border-gray-100 bg-white p-6">
    <p class="text-gray-700">
      $${product.price}
    </p>

    <h3 class="mt-1.5 text-lg font-medium text-gray-900">${product.title}</h3>

    <p class="mt-1.5 line-clamp-3 text-gray-700">
      ${product.description}
    </p>
    <div class="text-yellow-500 pt-2">⭐ ${product.rating}</div>
    
    <form class="mt-4 flex gap-4">
      <button
        class="flex h-12 w-full items-center justify-center rounded-2xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-200 hover:shadow-sm"
      >
        Add to Cart
      </button>

      <button
        type="button"
        class="flex h-12 w-full items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-600 hover:shadow-sm"
      >
        Buy Now
      </button>
    </form>
  </div>
</a>
  `;
}

async function render() {
  const container = document.getElementById("product-list")!;
  const products = await fetchProducts();
  container.innerHTML = products.map(createCard).join("");
}

render();
