export function createProductCard(product) {
    const discountPrice = (product.price *
        (1 - product.discountPercentage / 100)).toFixed(2);
    return `
    <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <a href="detail.html?id=${product.id}" class="block relative">
        <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-64 object-cover">
        <button class="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5C14.377 3.75 12.715 4.876 12 6.483c-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        ${product.discountPercentage > 0
        ? `<span class="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">-${product.discountPercentage}%</span>`
        : ""}
      </a>
      <div class="p-6">
        <div class="flex justify-between items-start mb-2">
          <a href="detail.html?id=${product.id}" class="text-lg font-semibold text-gray-800 hover:text-emerald-500 transition">${product.title}</a>
          <span class="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            ${product.rating.toFixed(1)}
          </span>
        </div>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.description}</p>
        <div class="flex items-center justify-between">
          <div>
            ${product.discountPercentage > 0
        ? `<span class="text-gray-400 line-through mr-2">$${product.price.toFixed(2)}</span><span class="text-emerald-500 font-bold">$${discountPrice}</span>`
        : `<span class="text-gray-800 font-bold">$${product.price.toFixed(2)}</span>`}
          </div>
          <button class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}
