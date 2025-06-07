var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://dummyjson.com/products?limit=6");
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = yield response.json();
            return data.products;
        }
        catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    });
}
