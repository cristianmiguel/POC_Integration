<template>
  <div class="product-list-page">
    <div class="container">
      <div class="page-header">
        <h1>All Products</h1>
        <p>Discover our complete collection</p>
      </div>

      <div class="product-list-layout">
        <!-- Filters Sidebar -->
        <aside class="filters-sidebar">
          <div class="filter-section">
            <h3>Search</h3>
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="search-input"
              @input="handleSearch"
            />
          </div>

          <div class="filter-section">
            <h3>Price Range</h3>
            <div class="price-inputs">
              <input 
                v-model.number="priceMin"
                type="number"
                placeholder="Min"
                class="price-input"
                @change="applyFilters"
              />
              <span>-</span>
              <input 
                v-model.number="priceMax"
                type="number"
                placeholder="Max"
                class="price-input"
                @change="applyFilters"
              />
            </div>
          </div>

          <div class="filter-section">
            <h3>Availability</h3>
            <label class="checkbox-label">
              <input 
                v-model="inStockOnly"
                type="checkbox"
                @change="applyFilters"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          <UiBaseButton 
            variant="outline" 
            size="sm" 
            full-width
            @click="clearAllFilters"
          >
            Clear Filters
          </UiBaseButton>
        </aside>

        <!-- Products Grid -->
        <div class="products-content">
          <!-- Sort & Results Count -->
          <div class="products-toolbar">
            <p class="results-count">
              {{ totalHits }} {{ totalHits === 1 ? 'product' : 'products' }}
            </p>
            
            <select v-model="sortBy" @change="handleSort" class="sort-select">
              <option value="">Sort by: Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
          </div>

          <!-- Loading State -->
          <div v-if="isSearching" class="grid grid-cols-3">
            <UiSkeletonLoader v-for="i in 12" :key="i" height="400px" />
          </div>

          <!-- Products Grid -->
          <div v-else-if="searchResults.length > 0" class="grid grid-cols-3">
            <UiProductCard 
              v-for="product in searchResults" 
              :key="product.objectID"
              :product="transformAlgoliaProduct(product)"
            />
          </div>

          <!-- Empty State -->
          <div v-else class="empty-state">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
            <UiBaseButton @click="clearAllFilters">Clear Filters</UiBaseButton>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="pagination">
            <button 
              class="pagination-button"
              :disabled="currentPage === 0"
              @click="goToPage(currentPage - 1)"
            >
              Previous
            </button>

            <div class="pagination-pages">
              <button
                v-for="page in visiblePages"
                :key="page"
                class="pagination-page"
                :class="{ 'pagination-page--active': page === currentPage }"
                @click="goToPage(page)"
              >
                {{ page + 1 }}
              </button>
            </div>

            <button 
              class="pagination-button"
              :disabled="currentPage >= totalPages - 1"
              @click="goToPage(currentPage + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { AlgoliaProduct, Product } from '~/types'
import { useAlgolia } from '~/composables/useAlgolia'

// SEO
useHead({
  title: 'Products - eCommerce Store',
  meta: [
    { name: 'description', content: 'Browse our complete collection of products. Find exactly what you need with powerful search and filters.' }
  ]
})

const algolia = useAlgolia()

const searchQuery = ref('')
const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)
const inStockOnly = ref(false)
const sortBy = ref('')

const { searchResults, totalHits, isSearching, totalPages, searchState } = algolia

const currentPage = computed(() => searchState.value.page)

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  let start = Math.max(0, currentPage.value - 2)
  let end = Math.min(totalPages.value, start + maxVisible)
  
  if (end - start < maxVisible) {
    start = Math.max(0, end - maxVisible)
  }
  
  for (let i = start; i < end; i++) {
    pages.push(i)
  }
  
  return pages
})

const handleSearch = () => {
  algolia.setQuery(searchQuery.value)
}

const applyFilters = () => {
  const filters: any = {}
  
  if (priceMin.value !== null || priceMax.value !== null) {
    filters.priceRange = {
      min: priceMin.value || undefined,
      max: priceMax.value || undefined
    }
  }
  
  if (inStockOnly.value) {
    filters.inStock = true
  }
  
  algolia.setFilters(filters)
}

const handleSort = () => {
  // In a real implementation, you'd configure Algolia replica indices for sorting
  // For now, we'll just trigger a search
  algolia.search()
}

const clearAllFilters = () => {
  searchQuery.value = ''
  priceMin.value = null
  priceMax.value = null
  inStockOnly.value = false
  sortBy.value = ''
  algolia.clearFilters()
  algolia.setQuery('')
}

const goToPage = (page: number) => {
  algolia.goToPage(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Transform Algolia product to internal Product type
const transformAlgoliaProduct = (hit: AlgoliaProduct): Product => {
  return {
    id: hit.objectID,
    name: hit.title,
    slug: hit.objectID, // Using objectID as slug since slug is not in dataset
    description: hit.description,
    price: typeof hit.price === 'string' ? parseFloat(hit.price) : hit.price,
    images: hit.images.map(url => ({
      url,
      title: hit.title
    })),
    relatedProducts: []
  }
}

onMounted(() => {
  algolia.search()
})
</script>

<style scoped>
.product-list-page {
  padding: var(--spacing-2xl) 0;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.page-header h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-sm);
}

.page-header p {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
}

.product-list-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--spacing-2xl);
}

@media (max-width: 1024px) {
  .product-list-layout {
    grid-template-columns: 1fr;
  }
  
  .filters-sidebar {
    display: none; /* Mobile filter drawer would go here */
  }
}

/* Filters Sidebar */
.filters-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.filter-section {
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-md);
}

.filter-section h3 {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.search-input,
.price-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  transition: border-color var(--transition-fast);
}

.search-input:focus,
.price-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.price-input {
  flex: 1;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* Products Content */
.products-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.results-count {
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.sort-select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  background: var(--color-background);
  color: var(--color-text-primary);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
}

.empty-state h3 {
  margin-bottom: var(--spacing-md);
}

.empty-state p {
  margin-bottom: var(--spacing-xl);
  color: var(--color-text-secondary);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-3xl);
}

.pagination-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background);
  color: var(--color-text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pagination-button:hover:not(:disabled) {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: var(--spacing-xs);
}

.pagination-page {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background);
  color: var(--color-text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pagination-page:hover {
  background: var(--color-surface);
}

.pagination-page--active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
</style>
