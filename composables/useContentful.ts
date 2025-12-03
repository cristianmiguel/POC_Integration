/**
 * Contentful Composable
 * 
 * Provides type-safe methods for fetching content from Contentful CMS
 * Uses Nuxt's runtime config for credentials
 */

import { createClient, type Entry } from 'contentful'
import type {
    Product,
    PageProductSkeleton,
    Category,
    CategoryFields,
    HeroBanner,
    HeroBannerFields,
    FeaturedCollection,
    FeaturedCollectionFields,
    HomePageFields,
    ProductImage
} from '~/types'

export const useContentful = () => {
    const config = useRuntimeConfig()

    // Initialize Contentful client
    const client = createClient({
        space: (config.public.contentful as any).spaceId,
        accessToken: (config.public.contentful as any).accessToken,
        environment: (config.public.contentful as any).environment
    })

    /**
     * Transform Contentful Asset to ProductImage
     */
    const transformAsset = (asset: any): ProductImage => {
        return {
            url: asset.fields.file.url.startsWith('//')
                ? `https:${asset.fields.file.url}`
                : asset.fields.file.url,
            title: asset.fields.title || '',
            description: asset.fields.description,
            width: asset.fields.file.details?.image?.width,
            height: asset.fields.file.details?.image?.height
        }
    }

    /**
     * Transform Contentful Category Entry to Category
     */
    const transformCategory = (entry: Entry<CategoryFields>): Category => {
        return {
            id: entry.sys.id,
            name: entry.fields.name,
            slug: entry.fields.slug,
            description: entry.fields.description,
            image: entry.fields.image ? transformAsset(entry.fields.image) : undefined,
            parentCategory: entry.fields.parentCategory
                ? transformCategory(entry.fields.parentCategory)
                : undefined
        }
    }

    /**
     * Transform Contentful Product Entry to Product
     */
    /**
     * Transform Contentful Product Entry to Product
     */
    const transformProduct = (entry: Entry<PageProductSkeleton>): Product => {
        const images: ProductImage[] = []

        // Add featured image first
        if (entry.fields.featuredProductImage) {
            images.push(transformAsset(entry.fields.featuredProductImage))
        }

        // Add additional images
        if (entry.fields.productImages) {
            images.push(...(entry.fields.productImages.map(transformAsset)))
        }

        // Transform related products
        const relatedProducts = (entry.fields.relatedProducts || []).map((related: any) => ({
            id: related.sys.id,
            name: related.fields.name || '',
            slug: related.fields.slug || '',
            description: related.fields.description || '',
            price: related.fields.price || 0,
            images: related.fields.featuredProductImage ? [transformAsset(related.fields.featuredProductImage)] : [],
            relatedProducts: []
        }))

        return {
            id: entry.sys.id,
            name: (entry.fields.name as unknown as string) || '',
            slug: (entry.fields.slug as unknown as string) || '',
            description: (entry.fields.description as unknown as string) || '',
            price: (entry.fields.price as unknown as number) || 0,
            images,
            relatedProducts
        }
    }

    /**
     * Transform Hero Banner Entry
     */
    const transformHeroBanner = (entry: Entry<HeroBannerFields>): HeroBanner => {
        return {
            title: entry.fields.title,
            subtitle: entry.fields.subtitle,
            image: transformAsset(entry.fields.image),
            ctaText: entry.fields.ctaText,
            ctaLink: entry.fields.ctaLink,
            backgroundColor: entry.fields.backgroundColor
        }
    }

    /**
     * Transform Featured Collection Entry
     */
    const transformFeaturedCollection = (entry: Entry<FeaturedCollectionFields>): FeaturedCollection => {
        return {
            title: entry.fields.title,
            description: entry.fields.description,
            products: entry.fields.products?.map(transformProduct) || [],
            displayType: entry.fields.displayType || 'grid'
        }
    }

    /**
     * Fetch all products
     */
    const getProducts = async (limit = 100, skip = 0) => {
        try {
            const response = await client.getEntries<PageProductSkeleton>({
                content_type: 'pageProduct',
                limit,
                skip,
                include: 2
            })

            return {
                products: response.items.map(transformProduct),
                total: response.total
            }
        } catch (error) {
            console.error('Error fetching products:', error)
            throw error
        }
    }

    /**
     * Fetch single product by slug
     */
    const getProductBySlug = async (slug: string) => {
        try {
            const response = await client.getEntries<PageProductSkeleton>({
                content_type: 'pageProduct',
                'fields.slug': slug,
                limit: 1,
                include: 2
            } as any)

            if (response.items.length === 0) {
                return null
            }

            return transformProduct(response.items[0])
        } catch (error) {
            console.error('Error fetching product:', error)
            throw error
        }
    }

    /**
     * Fetch products by category
     */
    /**
     * Fetch products by category (Mock implementation as category field is removed)
     */
    const getProductsByCategory = async (categorySlug: string, limit = 20) => {
        return { products: [], total: 0 }
    }

    /**
     * Fetch all categories
     */
    const getCategories = async () => {
        try {
            const response = await client.getEntries<CategoryFields>({
                content_type: 'category',
                include: 1
            })

            return response.items.map(transformCategory)
        } catch (error) {
            console.error('Error fetching categories:', error)
            throw error
        }
    }

    /**
     * Fetch homepage content
     */
    const getHomePage = async () => {
        try {
            const response = await client.getEntries<HomePageFields>({
                content_type: 'homePage',
                limit: 1,
                include: 3
            })

            if (response.items.length === 0) {
                return null
            }

            const page = response.items[0]

            return {
                heroBanner: transformHeroBanner(page.fields.heroBanner),
                featuredCollections: page.fields.featuredCollections?.map(transformFeaturedCollection) || []
            }
        } catch (error) {
            console.error('Error fetching homepage:', error)
            throw error
        }
    }

    /**
     * Fetch featured products
     */
    const getFeaturedProducts = async (limit = 8) => {
        try {
            const response = await client.getEntries<PageProductSkeleton>({
                content_type: 'pageProduct',
                limit,
                include: 2
            })

            return response.items.map(transformProduct)
        } catch (error) {
            console.error('Error fetching featured products:', error)
            throw error
        }
    }

    return {
        client,
        getProducts,
        getProductBySlug,
        getProductsByCategory,
        getCategories,
        getHomePage,
        getFeaturedProducts
    }
}
