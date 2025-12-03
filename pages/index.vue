<template>
  <div class="home-page">
    <div class="container section">
      <div class="page-header">
        <h1>Welcome to our Store</h1>
        <p>Check out our latest products</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-4">
        <UiSkeletonLoader v-for="i in 8" :key="i" height="400px" />
      </div>

      <!-- Products Grid -->
      <div v-else-if="products.length > 0" class="grid grid-cols-4">
        <UiProductCard 
          v-for="product in products" 
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <h2>No products found</h2>
        <p>Check back later for new arrivals.</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="error-state">
        <p class="error-message">{{ error.message }}</p>
        <UiBaseButton @click="fetchProducts">Try Again</UiBaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '~/types'
import { useContentful } from '~/composables/useContentful'

// SEO
useHead({
  title: 'Home - eCommerce Store',
  meta: [
    { name: 'description', content: 'Discover amazing products at great prices. Shop the latest trends and best deals.' }
  ]
})

const contentful = useContentful()

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<Error | null>(null)

const fetchProducts = async () => {
  loading.value = true
  error.value = null

  try {
    // Fetch products directly using the pageProduct content type
    products.value = await contentful.getFeaturedProducts(12)
  } catch (err) {
    console.error('Error fetching products:', err)
    error.value = err as Error
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding-top: var(--spacing-2xl);
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

.empty-state,
.error-state {
  text-align: center;
  padding: var(--spacing-3xl);
  grid-column: 1 / -1;
}

.error-message {
  color: var(--color-error);
  margin-bottom: var(--spacing-md);
}
</style>
