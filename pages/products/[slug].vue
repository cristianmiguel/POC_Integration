<template>
  <div class="product-detail-page">
    <div class="container">
      <!-- Loading State -->
      <div v-if="loading" class="product-detail-loading">
        <div class="product-detail-grid">
          <UiSkeletonLoader height="600px" />
          <div>
            <UiSkeletonLoader height="40px" width="60%" />
            <UiSkeletonLoader height="30px" width="40%" />
            <UiSkeletonLoader height="200px" />
            <UiSkeletonLoader height="50px" />
          </div>
        </div>
      </div>

      <!-- Product Content -->
      <div v-else-if="product" class="product-detail-grid">
        <!-- Image Gallery -->
        <div class="product-gallery">
          <div class="main-image">
            <img 
              :src="selectedImage.url" 
              :alt="selectedImage.title || product.name"
              class="main-image__img"
            />
          </div>
          
          <div v-if="product.images.length > 1" class="thumbnail-list">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              class="thumbnail"
              :class="{ 'thumbnail--active': selectedImageIndex === index }"
              @click="selectedImageIndex = index"
            >
              <img :src="image.url" :alt="image.title || product.name" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <div class="breadcrumb">
            <NuxtLink to="/">Home</NuxtLink>
            <span>/</span>
            <NuxtLink to="/products">Products</NuxtLink>
            <span>/</span>
            <span>{{ product.name }}</span>
          </div>

          <h1 class="product-title">{{ product.name }}</h1>

          <div v-if="product.brand" class="product-brand">
            by <strong>{{ product.brand }}</strong>
          </div>

          <div class="product-price">
            <span v-if="product.salePrice" class="sale-price">
              {{ formatPrice(product.salePrice) }}
            </span>
            <span 
              :class="[
                'regular-price',
                { 'regular-price--strikethrough': product.salePrice }
              ]"
            >
              {{ formatPrice(product.price) }}
            </span>
            <span v-if="discountPercentage" class="discount-badge">
              Save {{ discountPercentage }}%
            </span>
          </div>

          <div class="product-stock">
            <span v-if="product.inStock" class="stock-status stock-status--in-stock">
              ✓ In Stock
            </span>
            <span v-else class="stock-status stock-status--out-of-stock">
              Out of Stock
            </span>
            <span v-if="product.inventory" class="inventory-count">
              ({{ product.inventory }} available)
            </span>
          </div>

          <div class="product-description">
            <p>{{ product.description }}</p>
          </div>

          <!-- Specifications -->
          <div v-if="product.specifications" class="product-specs">
            <h3>Specifications</h3>
            <dl class="specs-list">
              <template v-for="(value, key) in product.specifications" :key="key">
                <dt>{{ key }}</dt>
                <dd>{{ value }}</dd>
              </template>
            </dl>
          </div>

          <!-- Add to Cart -->
          <div class="add-to-cart-section">
            <div class="quantity-selector">
              <button 
                class="quantity-button"
                @click="decrementQuantity"
                :disabled="quantity <= 1"
              >
                -
              </button>
              <input 
                v-model.number="quantity"
                type="number"
                min="1"
                class="quantity-input"
              />
              <button 
                class="quantity-button"
                @click="incrementQuantity"
              >
                +
              </button>
            </div>

            <UiBaseButton 
              size="lg"
              full-width
              :disabled="!product.inStock"
              @click="addToCart"
            >
              {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </UiBaseButton>
          </div>

          <!-- Tags -->
          <div v-if="product.tags && product.tags.length > 0" class="product-tags">
            <span 
              v-for="tag in product.tags" 
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="error-state">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <UiBaseButton @click="navigateTo('/products')">
          Browse All Products
        </UiBaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Product } from '~/types'
import { useContentful } from '~/composables/useContentful'
import { useCartStore } from '~/stores/cart'
import { formatPrice, calculateDiscount } from '~/utils/formatters'

const route = useRoute()
const contentful = useContentful()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const loading = ref(true)
const selectedImageIndex = ref(0)
const quantity = ref(1)

const selectedImage = computed(() => {
  if (product.value && product.value.images.length > 0) {
    return product.value.images[selectedImageIndex.value]
  }
  return { url: '', title: '' }
})

const discountPercentage = computed(() => {
  if (product.value?.salePrice && product.value.price > product.value.salePrice) {
    return calculateDiscount(product.value.price, product.value.salePrice)
  }
  return null
})

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (product.value && product.value.inStock) {
    cartStore.addToCart(product.value, quantity.value)
    // Optional: Show success message or redirect to cart
  }
}

const fetchProduct = async () => {
  loading.value = true
  
  try {
    const slug = route.params.slug as string
    const fetchedProduct = await contentful.getProductBySlug(slug)
    product.value = fetchedProduct
    
    // Update SEO
    if (fetchedProduct) {
      useHead({
        title: `${fetchedProduct.name} - eCommerce Store`,
        meta: [
          { name: 'description', content: fetchedProduct.description }
        ]
      })
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.product-detail-page {
  padding: var(--spacing-2xl) 0;
  min-height: 100vh;
}

.product-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  margin-top: var(--spacing-2xl);
}

@media (max-width: 1024px) {
  .product-detail-grid {
    grid-template-columns: 1fr;
  }
}

/* Gallery */
.product-gallery {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.main-image {
  width: 100%;
  aspect-ratio: 1;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: var(--spacing-lg);
}

.main-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: var(--spacing-md);
}

.thumbnail {
  aspect-ratio: 1;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-fast);
  background: var(--color-surface);
  padding: 0;
}

.thumbnail:hover {
  border-color: var(--color-primary);
}

.thumbnail--active {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Info */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-lg);
}

.breadcrumb a {
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.breadcrumb a:hover {
  color: var(--color-primary);
}

.product-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
}

.product-brand {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.product-price {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.sale-price {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-error);
}

.regular-price {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-text-primary);
}

.regular-price--strikethrough {
  text-decoration: line-through;
  color: var(--color-text-muted);
  font-size: var(--font-size-xl);
  font-weight: 400;
}

.discount-badge {
  background: linear-gradient(135deg, var(--color-error) 0%, #dc2626 100%);
  color: white;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 700;
}

.product-stock {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.stock-status {
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.stock-status--in-stock {
  color: var(--color-success);
}

.stock-status--out-of-stock {
  color: var(--color-error);
}

.inventory-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.product-description {
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
}

.product-description p {
  margin: 0;
  line-height: 1.8;
}

.product-specs {
  margin-bottom: var(--spacing-xl);
}

.product-specs h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
}

.specs-list {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-surface);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
}

.specs-list dt {
  font-weight: 600;
  color: var(--color-text-primary);
}

.specs-list dd {
  color: var(--color-text-secondary);
  margin: 0;
}

.add-to-cart-section {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.quantity-selector {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.quantity-button {
  width: 44px;
  height: 44px;
  background: var(--color-surface);
  border: none;
  cursor: pointer;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
}

.quantity-button:hover:not(:disabled) {
  background: var(--color-primary);
  color: white;
}

.quantity-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  width: 60px;
  text-align: center;
  border: none;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  font-size: var(--font-size-base);
  font-weight: 600;
}

.quantity-input:focus {
  outline: none;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.error-state {
  text-align: center;
  padding: var(--spacing-3xl);
}

.error-state h2 {
  margin-bottom: var(--spacing-md);
}

.error-state p {
  margin-bottom: var(--spacing-xl);
  color: var(--color-text-secondary);
}
</style>
