// src/components/SearchFilter.ts
export class SearchFilter {
    constructor(onFilterChange) {
        this.onFilterChange = onFilterChange;
        this.filters = {
            search: "",
            category: "",
            price: "",
        };
    }
    render() {
        return `
        <div class="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="relative">
              <input type="text" id="search-input" placeholder="Search products..." 
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div>
              <select id="category-filter" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option value="">All Categories</option>
              </select>
            </div>
            
            <div>
              <select id="price-filter" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option value="">All Prices</option>
                <option value="0-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="500-1000">$500 - $1000</option>
              </select>
            </div>
          </div>
          
          <div id="active-filters" class="mt-4 hidden">
            <div class="flex flex-wrap gap-2"></div>
            <button id="clear-filters" class="mt-2 text-sm text-emerald-600 hover:text-emerald-800">
              Clear all filters
            </button>
          </div>
        </div>
      `;
    }
    initEventListeners() {
        const searchInput = document.getElementById("search-input");
        const categoryFilter = document.getElementById("category-filter");
        const priceFilter = document.getElementById("price-filter");
        const clearFiltersBtn = document.getElementById("clear-filters");
        searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("input", (e) => {
            this.filters.search = e.target.value;
            this.onFilterChange(this.filters);
        });
        categoryFilter === null || categoryFilter === void 0 ? void 0 : categoryFilter.addEventListener("change", (e) => {
            this.filters.category = e.target.value;
            this.onFilterChange(this.filters);
        });
        priceFilter === null || priceFilter === void 0 ? void 0 : priceFilter.addEventListener("change", (e) => {
            this.filters.price = e.target.value;
            this.onFilterChange(this.filters);
        });
        clearFiltersBtn === null || clearFiltersBtn === void 0 ? void 0 : clearFiltersBtn.addEventListener("click", () => {
            this.filters = { search: "", category: "", price: "" };
            searchInput.value = "";
            categoryFilter.value = "";
            priceFilter.value = "";
            this.onFilterChange(this.filters);
        });
    }
    populateCategories(categories) {
        const select = document.getElementById("category-filter");
        if (select) {
            select.innerHTML = `
          <option value="">All Categories</option>
          ${categories
                .map((category) => `
            <option value="${category}">${this.formatCategoryName(category)}</option>
          `)
                .join("")}
        `;
        }
    }
    formatCategoryName(category) {
        return category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
}
