/**
 * Utility Functions for Formatting
 */

/**
 * Format price with currency symbol
 */
export const formatPrice = (price: number, currency = 'USD', locale = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(price)
}

/**
 * Format number with thousands separator
 */
export const formatNumber = (num: number, locale = 'en-US'): string => {
    return new Intl.NumberFormat(locale).format(num)
}

/**
 * Format date
 */
export const formatDate = (date: Date | string, locale = 'en-US'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(dateObj)
}

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (originalPrice: number, salePrice: number): number => {
    if (originalPrice <= 0) return 0
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
}

/**
 * Generate slug from text
 */
export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}
