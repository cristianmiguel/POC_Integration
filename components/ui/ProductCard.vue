<template>
  <NuxtLink :to="`/products/${product.slug}`" class="product-card">
    <div class="product-card__image-container">
      <img 
        v-if="product.images && product.images.length > 0"
        :src="product.images[0].url" 
        :alt="product.images[0].title || product.name"
        class="product-card__image"
        loading="lazy"
      />
      <div v-else class="product-card__image-placeholder">
        <span>No Image</span>
      </div>
      
      <!-- Discount badge removed as salePrice is no longer in Product type -->

      <button 
        v-if="showQuickAdd"
        class="product-card__quick-add"
        @click.prevent="handleQuickAdd"
        :disabled="!product.inStock"
      >
        <span v-if="product.inStock">Quick Add</span>
        <span v-else>Out of Stock</span>
      </button>
    </div>

    <div class="product-card__content">
      <!-- Category removed -->
      
      <h3 class="product-card__title">{{ product.name }}</h3>
      
      <div class="product-card__price">
        <span class="product-card__regular-price">
          {{ formatPrice(product.price) }}
        </span>
      </div>

      <!-- Brand removed -->
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '~/types'
import { formatPrice, calculateDiscount } from '~/utils/formatters'
import { useCartStore } from '~/stores/cart'

interface Props {
  product: Product
  showQuickAdd?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showQuickAdd: true
})

const cartStore = useCartStore()

// Discount logic removed

const handleQuickAdd = () => {
  if (props.product.inStock) {
    cartStore.addToCart(props.product, 1)
  }
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background: var(--color-background);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
  border: 1px solid var(--color-border);
  height: 100%;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary-light);
}

.product-card__image-container {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  background: var(--color-surface);
  overflow: hidden;
}

.product-card__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.product-card:hover .product-card__image {
  transform: scale(1.05);
}

.product-card__image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.product-card__badge {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: linear-gradient(135deg, var(--color-error) 0%, #dc2626 100%);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 700;
  box-shadow: var(--shadow-md);
}

.product-card__quick-add {
  position: absolute;
  bottom: var(--spacing-md);
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  background: white;
  color: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-lg);
  opacity: 0;
  transition: all var(--transition-base);
  white-space: nowrap;
}

.product-card:hover .product-card__quick-add {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.product-card__quick-add:hover:not(:disabled) {
  background: var(--color-primary);
  color: white;
}

.product-card__quick-add:disabled {
  background: var(--color-surface);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.product-card__content {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  flex: 1;
}

.product-card__category {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.product-card__title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__price {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: auto;
}

.product-card__sale-price {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-error);
}

.product-card__regular-price {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
}

.product-card__regular-price--strikethrough {
  text-decoration: line-through;
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  font-weight: 400;
}

.product-card__brand {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}
</style>
