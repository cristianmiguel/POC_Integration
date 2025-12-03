<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="container">
        <nav class="app-nav">
          <NuxtLink to="/" class="app-logo">
            <h1>eCommerce</h1>
          </NuxtLink>

          <div class="app-nav__links">
            <NuxtLink to="/" class="nav-link">Home</NuxtLink>
            <NuxtLink to="/products" class="nav-link">Products</NuxtLink>
          </div>

          <div class="app-nav__actions">
            <NuxtLink to="/cart" class="cart-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 2L7 6H3L5 20H19L21 6H17L15 2H9Z"/>
                <circle cx="9" cy="20" r="1"/>
                <circle cx="15" cy="20" r="1"/>
              </svg>
              <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
            </NuxtLink>
          </div>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <NuxtPage />
    </main>

    <footer class="app-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>eCommerce</h3>
            <p>Modern shopping experience powered by Vue, Contentful, and Algolia.</p>
          </div>

          <div class="footer-section">
            <h4>Shop</h4>
            <ul>
              <li><NuxtLink to="/products">All Products</NuxtLink></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} eCommerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

const cartItemCount = computed(() => cartStore.totalItems)
const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  cartStore.loadCart()
})
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.app-header {
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

@media (prefers-color-scheme: dark) {
  .app-header {
    background: rgba(17, 24, 39, 0.95);
  }
}

.app-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg) 0;
  gap: var(--spacing-xl);
}

.app-logo h1 {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.app-nav__links {
  display: flex;
  gap: var(--spacing-xl);
  flex: 1;
}

.nav-link {
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width var(--transition-base);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.app-nav__actions {
  display: flex;
  gap: var(--spacing-md);
}

.cart-button {
  position: relative;
  padding: var(--spacing-sm);
  color: var(--color-text-primary);
  transition: all var(--transition-base);
  border-radius: var(--radius-md);
}

.cart-button:hover {
  background: var(--color-surface);
  color: var(--color-primary);
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, var(--color-error) 0%, #dc2626 100%);
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 2px 6px;
  border-radius: var(--radius-full);
  min-width: 18px;
  text-align: center;
}

/* Main Content */
.app-main {
  flex: 1;
}

/* Footer */
.app-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  margin-top: var(--spacing-3xl);
  padding: var(--spacing-3xl) 0 var(--spacing-xl);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .app-nav__links {
    display: none;
  }
}

.footer-section h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.footer-section h4 {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.footer-section p {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: var(--spacing-sm);
}

.footer-section a {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast);
}

.footer-section a:hover {
  color: var(--color-primary);
}

.footer-bottom {
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.footer-bottom p {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  margin: 0;
}
</style>
