<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="page-title">Shopping Cart</h1>

      <!-- Empty Cart State -->
      <div v-if="cartStore.isEmpty" class="empty-cart">
        <div class="empty-cart__icon">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M9 2L7 6H3L5 20H19L21 6H17L15 2H9Z"/>
            <circle cx="9" cy="20" r="1"/>
            <circle cx="15" cy="20" r="1"/>
          </svg>
        </div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <UiBaseButton size="lg" @click="navigateTo('/products')">
          Browse Products
        </UiBaseButton>
      </div>

      <!-- Cart Content -->
      <div v-else class="cart-layout">
        <!-- Cart Items -->
        <div class="cart-items">
          <div 
            v-for="item in cartStore.items" 
            :key="item.id"
            class="cart-item"
          >
            <NuxtLink :to="`/products/${item.product.slug}`" class="cart-item__image">
              <img 
                v-if="item.product.images && item.product.images.length > 0"
                :src="item.product.images[0].url" 
                :alt="item.product.name"
              />
            </NuxtLink>

            <div class="cart-item__details">
              <NuxtLink :to="`/products/${item.product.slug}`" class="cart-item__name">
                {{ item.product.name }}
              </NuxtLink>
              
              <p v-if="item.product.brand" class="cart-item__brand">
                {{ item.product.brand }}
              </p>

              <p v-if="item.selectedVariant" class="cart-item__variant">
                {{ item.selectedVariant.name }}
              </p>

              <div class="cart-item__price">
                {{ formatPrice(item.price) }}
              </div>
            </div>

            <div class="cart-item__quantity">
              <div class="quantity-selector">
                <button 
                  class="quantity-button"
                  @click="cartStore.decrementQuantity(item.id)"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span class="quantity-display">{{ item.quantity }}</span>
                <button 
                  class="quantity-button"
                  @click="cartStore.incrementQuantity(item.id)"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div class="cart-item__total">
              {{ formatPrice(item.price * item.quantity) }}
            </div>

            <button 
              class="cart-item__remove"
              @click="cartStore.removeFromCart(item.id)"
              aria-label="Remove item"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <h2 class="cart-summary__title">Order Summary</h2>

          <div class="cart-summary__row">
            <span>Subtotal ({{ cartStore.totalItems }} items)</span>
            <span>{{ formatPrice(cartStore.subtotal) }}</span>
          </div>

          <div class="cart-summary__row">
            <span>Tax</span>
            <span>{{ formatPrice(cartStore.tax) }}</span>
          </div>

          <div class="cart-summary__row">
            <span>Shipping</span>
            <span>
              {{ cartStore.shipping === 0 ? 'FREE' : formatPrice(cartStore.shipping) }}
            </span>
          </div>

          <div v-if="cartStore.subtotal < 50" class="cart-summary__shipping-notice">
            Add {{ formatPrice(50 - cartStore.subtotal) }} more for free shipping!
          </div>

          <div class="cart-summary__divider"></div>

          <div class="cart-summary__total">
            <span>Total</span>
            <span>{{ formatPrice(cartStore.total) }}</span>
          </div>

          <UiBaseButton size="lg" full-width @click="handleCheckout">
            Proceed to Checkout
          </UiBaseButton>

          <UiBaseButton 
            variant="outline" 
            size="md" 
            full-width
            @click="navigateTo('/products')"
          >
            Continue Shopping
          </UiBaseButton>

          <button class="clear-cart-button" @click="handleClearCart">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { formatPrice } from '~/utils/formatters'

// SEO
useHead({
  title: 'Shopping Cart - eCommerce Store',
  meta: [
    { name: 'description', content: 'Review your shopping cart and proceed to checkout.' }
  ]
})

const cartStore = useCartStore()

const handleCheckout = () => {
  // In a real app, this would navigate to checkout
  alert('Checkout functionality would be implemented here!')
}

const handleClearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clearCart()
  }
}
</script>

<style scoped>
.cart-page {
  padding: var(--spacing-2xl) 0;
  min-height: 100vh;
}

.page-title {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-2xl);
  text-align: center;
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: var(--spacing-3xl);
  max-width: 500px;
  margin: 0 auto;
}

.empty-cart__icon {
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xl);
}

.empty-cart h2 {
  margin-bottom: var(--spacing-md);
}

.empty-cart p {
  margin-bottom: var(--spacing-2xl);
  color: var(--color-text-secondary);
}

/* Cart Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--spacing-2xl);
  align-items: start;
}

@media (max-width: 1024px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}

/* Cart Items */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto auto auto;
  gap: var(--spacing-lg);
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  transition: box-shadow var(--transition-base);
}

.cart-item:hover {
  box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: var(--spacing-md);
  }
  
  .cart-item__quantity,
  .cart-item__total {
    grid-column: 1 / -1;
  }
}

.cart-item__image {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-background);
}

@media (max-width: 768px) {
  .cart-item__image {
    width: 80px;
    height: 80px;
  }
}

.cart-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item__details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.cart-item__name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  transition: color var(--transition-fast);
}

.cart-item__name:hover {
  color: var(--color-primary);
}

.cart-item__brand,
.cart-item__variant {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.cart-item__price {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-xs);
}

.quantity-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
}

.quantity-button:hover {
  background: var(--color-primary);
  color: white;
}

.quantity-display {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
}

.cart-item__total {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  min-width: 100px;
  text-align: right;
}

.cart-item__remove {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.cart-item__remove:hover {
  background: var(--color-error);
  color: white;
}

/* Cart Summary */
.cart-summary {
  position: sticky;
  top: 100px;
  padding: var(--spacing-xl);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.cart-summary__title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-lg);
}

.cart-summary__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.cart-summary__shipping-notice {
  padding: var(--spacing-sm) var(--spacing-md);
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
  color: white;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  text-align: center;
  margin: var(--spacing-md) 0;
}

.cart-summary__divider {
  height: 1px;
  background: var(--color-border);
  margin: var(--spacing-lg) 0;
}

.cart-summary__total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.cart-summary > button {
  margin-bottom: var(--spacing-md);
}

.clear-cart-button {
  width: 100%;
  padding: var(--spacing-sm);
  background: transparent;
  border: none;
  color: var(--color-error);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.clear-cart-button:hover {
  color: #dc2626;
  text-decoration: underline;
}
</style>
