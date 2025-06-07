"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const detailContainer = document.getElementById("product-detail");
    if (!productId || !detailContainer) {
        detailContainer.innerHTML =
            "<p class='text-red-500'>Product not found.</p>";
        return;
    }
    try {
        const res = yield fetch(`https://dummyjson.com/products/${productId}`);
        const product = yield res.json();
        detailContainer.innerHTML = `
        <div class="bg-white shadow-lg rounded-xl overflow-hidden">
          <img src="${product.thumbnail}" class="w-full h-64 object-cover" alt="${product.title}" />
          <div class="p-6">
            <h1 class="text-2xl font-bold">${product.title}</h1>
            <p class="text-gray-600 mt-2">${product.description}</p>
            <p class="mt-4 text-xl font-semibold text-green-600">$${product.price}</p>
            <p class="text-yellow-500 mt-2">⭐ ${product.rating}</p>
            <p class="text-sm text-gray-500">${product.brand} | ${product.category}</p>
          </div>
        </div>
      `;
    }
    catch (err) {
        detailContainer.innerHTML =
            "<p class='text-red-500'>Failed to load product details.</p>";
    }
}));
