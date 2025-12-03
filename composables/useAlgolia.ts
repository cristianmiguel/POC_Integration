/**
 * Algolia Search Composable
 * 
 * Provides search functionality using Algolia
 * Integrates with Vue InstantSearch for reactive search UI
 */

import { ref, computed } from 'vue'
import algoliasearch from 'algoliasearch'
import type { AlgoliaProduct, SearchFilters, SearchState } from '~/types'

export const useAlgolia = () => {
    const config = useRuntimeConfig()

    // Initialize Algolia client
    const algoliaClient = algoliasearch(
        config.public.algolia.applicationId,
        config.public.algolia.apiKey
    )

    const searchState = ref<SearchState>({
        query: '',
        filters: {},
        page: 0,
        hitsPerPage: 24,
        sortBy: undefined
    })

    const searchResults = ref<AlgoliaProduct[]>([])
    const totalHits = ref(0)
    const isSearching = ref(false)
    const searchError = ref<Error | null>(null)

    /**
     * Build Algolia filter string from SearchFilters
     */
    const buildFilterString = (filters: SearchFilters): string => {
        const filterParts: string[] = []

        if (filters.category && filters.category.length > 0) {
            const categoryFilters = filters.category.map(cat => `product_type:"${cat}"`).join(' OR ')
            filterParts.push(`(${categoryFilters})`)
        }

        if (filters.tags && filters.tags.length > 0) {
            const tagFilters = filters.tags.map(tag => `tags:"${tag}"`).join(' OR ')
            filterParts.push(`(${tagFilters})`)
        }

        return filterParts.join(' AND ')
    }

    /**
     * Build numeric filters for price range
     */
    const buildNumericFilters = (filters: SearchFilters): string[] => {
        const numericFilters: string[] = []

        if (filters.priceRange) {
            if (filters.priceRange.min !== undefined) {
                numericFilters.push(`price >= ${filters.priceRange.min}`)
            }
            if (filters.priceRange.max !== undefined) {
                numericFilters.push(`price <= ${filters.priceRange.max}`)
            }
        }

        return numericFilters
    }

    /**
     * Perform search
     */
    const search = async () => {
        if (!algoliaClient) {
            console.error('Algolia client not initialized')
            return
        }

        isSearching.value = true
        searchError.value = null

        try {
            const indexName = (config.public.algolia as any).indexName
            const index = algoliaClient.initIndex(indexName)

            const filterString = buildFilterString(searchState.value.filters)
            const numericFilters = buildNumericFilters(searchState.value.filters)

            const searchParams: any = {
                query: searchState.value.query,
                page: searchState.value.page,
                hitsPerPage: searchState.value.hitsPerPage
            }

            if (filterString) {
                searchParams.filters = filterString
            }

            if (numericFilters.length > 0) {
                searchParams.numericFilters = numericFilters
            }

            const response = await index.search<AlgoliaProduct>(
                searchState.value.query,
                searchParams
            )

            searchResults.value = response.hits
            totalHits.value = response.nbHits
        } catch (error) {
            console.error('Search error:', error)
            searchError.value = error as Error
        } finally {
            isSearching.value = false
        }
    }

    /**
     * Update search query
     */
    const setQuery = (query: string) => {
        searchState.value.query = query
        searchState.value.page = 0 // Reset to first page
        search()
    }

    /**
     * Update filters
     */
    const setFilters = (filters: Partial<SearchFilters>) => {
        searchState.value.filters = {
            ...searchState.value.filters,
            ...filters
        }
        searchState.value.page = 0 // Reset to first page
        search()
    }

    /**
     * Clear all filters
     */
    const clearFilters = () => {
        searchState.value.filters = {}
        searchState.value.page = 0
        search()
    }

    /**
     * Go to specific page
     */
    const goToPage = (page: number) => {
        searchState.value.page = page
        search()
    }

    /**
     * Change sort order
     */
    const setSortBy = (sortBy: string) => {
        searchState.value.sortBy = sortBy
        searchState.value.page = 0
        search()
    }

    /**
     * Get facet values for a specific attribute
     */
    const getFacetValues = async (attribute: string) => {
        if (!algoliaClient) return []

        try {
            const indexName = (config.public.algolia as any).indexName
            const index = algoliaClient.initIndex(indexName)
            const response = await index.search('', {
                facets: [attribute],
                hitsPerPage: 0
            })

            return Object.entries(response.facets?.[attribute] || {}).map(([value, count]) => ({
                value,
                count
            }))
        } catch (error) {
            console.error('Error fetching facets:', error)
            return []
        }
    }

    /**
     * Get autocomplete suggestions
     */
    const getAutocompleteSuggestions = async (query: string, limit = 5) => {
        if (!algoliaClient || !query) return []

        try {
            const indexName = (config.public.algolia as any).indexName
            const index = algoliaClient.initIndex(indexName)
            const response = await index.search<AlgoliaProduct>(query, {
                hitsPerPage: limit,
                attributesToRetrieve: ['title', 'images', 'price', 'objectID']
            })

            return response.hits
        } catch (error) {
            console.error('Error fetching autocomplete:', error)
            return []
        }
    }

    const hasResults = computed(() => searchResults.value.length > 0)
    const totalPages = computed(() => Math.ceil(totalHits.value / searchState.value.hitsPerPage))

    return {
        // State
        searchState,
        searchResults,
        totalHits,
        isSearching,
        searchError,
        hasResults,
        totalPages,

        // Methods
        search,
        setQuery,
        setFilters,
        clearFilters,
        goToPage,
        setSortBy,
        getFacetValues,
        getAutocompleteSuggestions
    }
}
