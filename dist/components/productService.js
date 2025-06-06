var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/components/productService.ts
export function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://dummyjson.com/products?limit=50");
        const data = yield response.json();
        return data.products;
    });
}
export function getUniqueCategories(products) {
    return [...new Set(products.map((product) => product.category))];
}
export function formatCategoryName(category) {
    return category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
export function filterProducts(products, filters) {
    let result = [...products];
    if (filters.search) {
        const term = filters.search.toLowerCase();
        result = result.filter((p) => p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term));
    }
    if (filters.category) {
        result = result.filter((p) => p.category === filters.category);
    }
    if (filters.price) {
        const [min, max] = filters.price.split("-").map(Number);
        result = result.filter((p) => max ? p.price >= min && p.price <= max : p.price >= min);
    }
    return result;
}
