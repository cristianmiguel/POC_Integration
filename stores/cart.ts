/**
 * Cart Store (Pinia)
 * 
 * Manages shopping cart state with local storage persistence
 */

import { defineStore } from 'pinia'
import type { Cart, CartItem, Product, ProductVariant } from '~/types'

export const useCartStore = defineStore('cart', {
    state: (): Cart => ({
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        itemCount: 0
    }),

    getters: {
        /**
         * Get cart item by product ID and variant
         */
        getCartItem: (state) => (productId: string, variantId?: string) => {
            return state.items.find(item => {
                if (variantId) {
                    return item.product.id === productId && item.selectedVariant?.id === variantId
                }
                return item.product.id === productId && !item.selectedVariant
            })
        },

        /**
         * Check if product is in cart
         */
        isInCart: (state) => (productId: string, variantId?: string) => {
            return state.items.some(item => {
                if (variantId) {
                    return item.product.id === productId && item.selectedVariant?.id === variantId
                }
                return item.product.id === productId && !item.selectedVariant
            })
        },

        /**
         * Get total number of items
         */
        totalItems: (state) => {
            return state.items.reduce((total, item) => total + item.quantity, 0)
        },

        /**
         * Check if cart is empty
         */
        isEmpty: (state) => state.items.length === 0
    },

    actions: {
        /**
         * Add item to cart
         */
        addToCart(product: Product, quantity = 1, variant?: ProductVariant) {
            const existingItem = this.getCartItem(product.id, variant?.id)

            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                const price = variant?.price || product.price

                const newItem: CartItem = {
                    id: `${product.id}-${variant?.id || 'default'}`,
                    product,
                    quantity,
                    selectedVariant: variant,
                    price
                }

                this.items.push(newItem)
            }

            this.calculateTotals()
            this.persistCart()
        },

        /**
         * Remove item from cart
         */
        removeFromCart(itemId: string) {
            const index = this.items.findIndex(item => item.id === itemId)
            if (index > -1) {
                this.items.splice(index, 1)
                this.calculateTotals()
                this.persistCart()
            }
        },

        /**
         * Update item quantity
         */
        updateQuantity(itemId: string, quantity: number) {
            const item = this.items.find(item => item.id === itemId)

            if (item) {
                if (quantity <= 0) {
                    this.removeFromCart(itemId)
                } else {
                    item.quantity = quantity
                    this.calculateTotals()
                    this.persistCart()
                }
            }
        },

        /**
         * Increment item quantity
         */
        incrementQuantity(itemId: string) {
            const item = this.items.find(item => item.id === itemId)
            if (item) {
                item.quantity++
                this.calculateTotals()
                this.persistCart()
            }
        },

        /**
         * Decrement item quantity
         */
        decrementQuantity(itemId: string) {
            const item = this.items.find(item => item.id === itemId)
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--
                    this.calculateTotals()
                    this.persistCart()
                } else {
                    this.removeFromCart(itemId)
                }
            }
        },

        /**
         * Clear entire cart
         */
        clearCart() {
            this.items = []
            this.calculateTotals()
            this.persistCart()
        },

        /**
         * Calculate cart totals
         */
        calculateTotals() {
            this.subtotal = this.items.reduce((total, item) => {
                return total + (item.price * item.quantity)
            }, 0)

            // Calculate tax (example: 8% tax rate)
            this.tax = this.subtotal * 0.08

            // Calculate shipping (example: free shipping over $50)
            this.shipping = this.subtotal >= 50 ? 0 : 5.99

            this.total = this.subtotal + this.tax + this.shipping
            this.itemCount = this.totalItems
        },

        /**
         * Persist cart to local storage
         */
        persistCart() {
            if (process.client) {
                localStorage.setItem('cart', JSON.stringify(this.$state))
            }
        },

        /**
         * Load cart from local storage
         */
        loadCart() {
            if (process.client) {
                const savedCart = localStorage.getItem('cart')
                if (savedCart) {
                    try {
                        const cart = JSON.parse(savedCart)
                        this.$state = cart
                    } catch (error) {
                        console.error('Error loading cart from localStorage:', error)
                    }
                }
            }
        }
    }
})
