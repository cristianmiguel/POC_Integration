/**
 * Mock Algolia Data
 * 
 * This provides dummy search data when Algolia is not configured
 */

import type { AlgoliaProduct } from '~/types'

export const mockAlgoliaProducts: AlgoliaProduct[] = [
    {
        objectID: 'prod-1',
        name: 'Premium Wireless Headphones',
        slug: 'premium-wireless-headphones',
        description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life.',
        price: 299.99,
        salePrice: 249.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
        category: 'Electronics',
        brand: 'AudioTech',
        inStock: true,
        tags: ['electronics', 'audio', 'wireless']
    },
    {
        objectID: 'prod-2',
        name: 'Smart Watch Pro',
        slug: 'smart-watch-pro',
        description: 'Advanced fitness tracking, heart rate monitoring, and smartphone notifications.',
        price: 399.99,
        salePrice: 349.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
        category: 'Electronics',
        brand: 'TechWear',
        inStock: true,
        tags: ['electronics', 'wearable', 'fitness']
    },
    {
        objectID: 'prod-3',
        name: 'Designer Leather Jacket',
        slug: 'designer-leather-jacket',
        description: 'Premium genuine leather jacket with modern cut.',
        price: 499.99,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
        category: 'Fashion',
        brand: 'StyleCo',
        inStock: true,
        tags: ['fashion', 'outerwear', 'leather']
    },
    {
        objectID: 'prod-4',
        name: 'Minimalist Backpack',
        slug: 'minimalist-backpack',
        description: 'Sleek and functional backpack with laptop compartment.',
        price: 89.99,
        salePrice: 69.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
        category: 'Fashion',
        brand: 'UrbanGear',
        inStock: true,
        tags: ['fashion', 'accessories', 'bags']
    },
    {
        objectID: 'prod-5',
        name: 'Modern Coffee Maker',
        slug: 'modern-coffee-maker',
        description: 'Programmable coffee maker with thermal carafe.',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=800&fit=crop',
        category: 'Home & Garden',
        brand: 'HomeBrews',
        inStock: true,
        tags: ['home', 'kitchen', 'appliances']
    },
    {
        objectID: 'prod-6',
        name: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        description: 'Extra thick yoga mat with excellent grip.',
        price: 59.99,
        salePrice: 44.99,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
        category: 'Sports',
        brand: 'FitLife',
        inStock: true,
        tags: ['sports', 'fitness', 'yoga']
    },
    {
        objectID: 'prod-7',
        name: 'Wireless Earbuds',
        slug: 'wireless-earbuds',
        description: 'True wireless earbuds with charging case.',
        price: 129.99,
        salePrice: 99.99,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop',
        category: 'Electronics',
        brand: 'AudioTech',
        inStock: true,
        tags: ['electronics', 'audio', 'wireless']
    },
    {
        objectID: 'prod-8',
        name: 'Running Shoes Pro',
        slug: 'running-shoes-pro',
        description: 'Professional running shoes with advanced cushioning technology.',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
        category: 'Sports',
        brand: 'SportMax',
        inStock: true,
        tags: ['sports', 'footwear', 'running']
    }
]
