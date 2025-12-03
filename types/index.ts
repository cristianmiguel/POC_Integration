// TypeScript Interfaces and Types for eCommerce Application

import type { Asset, Entry } from 'contentful'

// ============================================
// Product Types
// ============================================

import type { EntrySkeletonType } from 'contentful'

export interface PageProductFields {
    internalName: string
    slug: string
    seoFields?: Entry<ComponentSeoSkeleton>
    name: string
    description?: string
    price: number
    featuredProductImage: Asset
    productImages?: Asset[]
    relatedProducts?: Entry<PageProductSkeleton>[]
}

export interface PageProductSkeleton extends EntrySkeletonType {
    contentTypeId: 'pageProduct'
    fields: PageProductFields
}

export interface ComponentSeoFields {
    internalName: string
    pageTitle: string
    pageDescription?: string
    shareImages?: Asset[]
}

export interface ComponentSeoSkeleton extends EntrySkeletonType {
    contentTypeId: 'componentSeo'
    fields: ComponentSeoFields
}

export interface ProductVariant {
    id: string
    name: string
    options: VariantOption[]
    price?: number
    sku?: string
    inStock: boolean
}

export interface VariantOption {
    type: 'color' | 'size' | 'material' | string
    value: string
    label: string
}

export interface Product {
    id: string
    name: string
    slug: string
    description: string
    price: number
    images: ProductImage[]
    relatedProducts: Product[]
    seo?: SEO
}

export interface ProductImage {
    url: string
    title: string
    description?: string
    width?: number
    height?: number
}

// ============================================
// Category Types
// ============================================

export interface CategoryFields {
    name: string
    slug: string
    description?: string
    image?: Asset
    parentCategory?: Entry<CategoryFields>
}

export interface Category {
    id: string
    name: string
    slug: string
    description?: string
    image?: ProductImage
    parentCategory?: Category
}

// ============================================
// Homepage Content Types
// ============================================

export interface HeroBannerFields {
    title: string
    subtitle?: string
    image: Asset
    ctaText?: string
    ctaLink?: string
    backgroundColor?: string
}

export interface HeroBanner {
    title: string
    subtitle?: string
    image: ProductImage
    ctaText?: string
    ctaLink?: string
    backgroundColor?: string
}

export interface FeaturedCollectionFields {
    title: string
    description?: string
    products: Entry<PageProductSkeleton>[]
    displayType?: 'grid' | 'carousel'
}

export interface FeaturedCollection {
    title: string
    description?: string
    products: Product[]
    displayType?: 'grid' | 'carousel'
}

export interface HomePageFields {
    heroBanner: Entry<HeroBannerFields>
    featuredCollections: Entry<FeaturedCollectionFields>[]
    seo?: SEOFields
}

// ============================================
// SEO Types
// ============================================

export interface SEOFields {
    title: string
    description: string
    keywords?: string[]
    ogImage?: Asset
}

export interface SEO {
    title: string
    description: string
    keywords?: string[]
    ogImage?: string
}

// ============================================
// Cart Types
// ============================================

export interface CartItem {
    id: string
    product: Product
    quantity: number
    selectedVariant?: ProductVariant
    price: number
}

export interface Cart {
    items: CartItem[]
    subtotal: number
    tax: number
    shipping: number
    total: number
    itemCount: number
}

// ============================================
// Algolia Search Types
// ============================================

export interface AlgoliaProduct {
    objectID: string
    title: string
    description: string
    price: string | number
    images: string[]
    showcase_image: string
    color: string[]
    product_type: string
    tags: string[]
    hierarchical_categories: {
        lvl0: string
        lvl1?: string
        lvl2?: string
    }
    units_sold?: number
    weight?: string
    taxable?: boolean
    _highlightResult?: any
}

export interface SearchFilters {
    category?: string[]
    brand?: string[]
    priceRange?: {
        min: number
        max: number
    }
    inStock?: boolean
    tags?: string[]
}

export interface SearchState {
    query: string
    filters: SearchFilters
    page: number
    hitsPerPage: number
    sortBy?: string
}

// ============================================
// API Response Types
// ============================================

export interface ContentfulResponse<T> {
    items: Entry<T>[]
    total: number
    skip: number
    limit: number
}

export interface AlgoliaSearchResponse {
    hits: AlgoliaProduct[]
    nbHits: number
    page: number
    nbPages: number
    hitsPerPage: number
    processingTimeMS: number
    query: string
    params: string
}

// ============================================
// Utility Types
// ============================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncData<T> {
    data: T | null
    loading: boolean
    error: Error | null
}
