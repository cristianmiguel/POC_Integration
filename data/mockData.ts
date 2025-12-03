/**
 * Mock Contentful Data
 * 
 * This provides dummy data when Contentful is not configured or has no content
 */

import type { Product, Category, HeroBanner, FeaturedCollection } from '~/types'

// Mock Categories
export const mockCategories: Category[] = [
    {
        id: 'cat-1',
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest electronic devices and gadgets'
    },
    {
        id: 'cat-2',
        name: 'Fashion',
        slug: 'fashion',
        description: 'Trendy clothing and accessories'
    },
    {
        id: 'cat-3',
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Everything for your home and garden'
    },
    {
        id: 'cat-4',
        name: 'Sports',
        slug: 'sports',
        description: 'Sports equipment and activewear'
    }
]

// Mock Products
export const mockProducts: Product[] = [
    {
        id: 'prod-1',
        name: 'Premium Wireless Headphones',
        slug: 'premium-wireless-headphones',
        description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        price: 299.99,
        salePrice: 249.99,
        sku: 'WH-1000XM4',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
                title: 'Premium Wireless Headphones'
            }
        ],
        category: mockCategories[0],
        brand: 'AudioTech',
        inStock: true,
        inventory: 50,
        tags: ['electronics', 'audio', 'wireless'],
        specifications: {
            'Battery Life': '30 hours',
            'Connectivity': 'Bluetooth 5.0',
            'Weight': '250g',
            'Color': 'Black'
        }
    },
    {
        id: 'prod-2',
        name: 'Smart Watch Pro',
        slug: 'smart-watch-pro',
        description: 'Advanced fitness tracking, heart rate monitoring, and smartphone notifications. Water-resistant up to 50m.',
        price: 399.99,
        salePrice: 349.99,
        sku: 'SW-PRO-2024',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
                title: 'Smart Watch Pro'
            }
        ],
        category: mockCategories[0],
        brand: 'TechWear',
        inStock: true,
        inventory: 35,
        tags: ['electronics', 'wearable', 'fitness']
    },
    {
        id: 'prod-3',
        name: 'Designer Leather Jacket',
        slug: 'designer-leather-jacket',
        description: 'Premium genuine leather jacket with modern cut. Perfect for any season.',
        price: 499.99,
        sku: 'LJ-2024-BLK',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
                title: 'Designer Leather Jacket'
            }
        ],
        category: mockCategories[1],
        brand: 'StyleCo',
        inStock: true,
        inventory: 20,
        tags: ['fashion', 'outerwear', 'leather']
    },
    {
        id: 'prod-4',
        name: 'Minimalist Backpack',
        slug: 'minimalist-backpack',
        description: 'Sleek and functional backpack with laptop compartment. Water-resistant material.',
        price: 89.99,
        salePrice: 69.99,
        sku: 'BP-MIN-001',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
                title: 'Minimalist Backpack'
            }
        ],
        category: mockCategories[1],
        brand: 'UrbanGear',
        inStock: true,
        inventory: 100,
        tags: ['fashion', 'accessories', 'bags']
    },
    {
        id: 'prod-5',
        name: 'Modern Coffee Maker',
        slug: 'modern-coffee-maker',
        description: 'Programmable coffee maker with thermal carafe. Makes perfect coffee every time.',
        price: 149.99,
        sku: 'CM-2024',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=800&fit=crop',
                title: 'Modern Coffee Maker'
            }
        ],
        category: mockCategories[2],
        brand: 'HomeBrews',
        inStock: true,
        inventory: 45,
        tags: ['home', 'kitchen', 'appliances']
    },
    {
        id: 'prod-6',
        name: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        description: 'Extra thick yoga mat with excellent grip. Eco-friendly materials.',
        price: 59.99,
        salePrice: 44.99,
        sku: 'YM-PREM-001',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
                title: 'Yoga Mat Premium'
            }
        ],
        category: mockCategories[3],
        brand: 'FitLife',
        inStock: true,
        inventory: 75,
        tags: ['sports', 'fitness', 'yoga']
    },
    {
        id: 'prod-7',
        name: 'Wireless Earbuds',
        slug: 'wireless-earbuds',
        description: 'True wireless earbuds with charging case. Crystal clear sound quality.',
        price: 129.99,
        salePrice: 99.99,
        sku: 'WE-2024',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop',
                title: 'Wireless Earbuds'
            }
        ],
        category: mockCategories[0],
        brand: 'AudioTech',
        inStock: true,
        inventory: 150,
        tags: ['electronics', 'audio', 'wireless']
    },
    {
        id: 'prod-8',
        name: 'Running Shoes Pro',
        slug: 'running-shoes-pro',
        description: 'Professional running shoes with advanced cushioning technology.',
        price: 179.99,
        sku: 'RS-PRO-2024',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
                title: 'Running Shoes Pro'
            }
        ],
        category: mockCategories[3],
        brand: 'SportMax',
        inStock: true,
        inventory: 60,
        tags: ['sports', 'footwear', 'running']
    }
]

// Mock Hero Banner
export const mockHeroBanner: HeroBanner = {
    title: 'Summer Sale - Up to 50% Off',
    subtitle: 'Shop the latest trends at unbeatable prices',
    image: {
        url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=600&fit=crop',
        title: 'Summer Sale Banner'
    },
    ctaText: 'Shop Now',
    ctaLink: '/products',
    backgroundColor: '#6366f1'
}

// Mock Featured Collection
export const mockFeaturedCollection: FeaturedCollection = {
    title: 'Best Sellers',
    description: 'Our most popular products this month',
    products: [
        mockProducts[0],
        mockProducts[1],
        mockProducts[3],
        mockProducts[6],
        mockProducts[2],
        mockProducts[5],
        mockProducts[4],
        mockProducts[7]
    ],
    displayType: 'grid'
}
