# Algolia Search Setup Guide

This guide will help you configure Algolia Search for your eCommerce application.

## Prerequisites

- An Algolia account (free tier is sufficient for development)
- Your Application ID and Search API Key
- Products created in Contentful

---

## Step 1: Create an Algolia Account

1. Go to [Algolia](https://www.algolia.com/) and sign up
2. Create a new application
3. Note your **Application ID**

---

## Step 2: Get Your API Keys

1. Go to **Settings** → **API Keys**
2. Copy your:
   - **Application ID**
   - **Search-Only API Key** (for frontend)
   - **Admin API Key** (for indexing, keep secure)
3. Add these to your `.env` file

---

## Step 3: Configure Index Name

This application uses the Algolia sample dataset `algolia_apparel_sample_dataset`. 

1. Set `ALGOLIA_INDEX_NAME=algolia_apparel_sample_dataset` in your `.env` file
2. Or create your own index and update the environment variable accordingly

---

## Step 4: Configure Searchable Attributes

In your index settings, configure which attributes should be searchable:

### Searchable Attributes (in order of importance)

```json
[
  "name",
  "description",
  "brand",
  "category",
  "tags"
]
```

### Attributes for Faceting

```json
[
  "category",
  "brand",
  "inStock",
  "tags",
  "price"
]
```

### Custom Ranking

```json
[
  "desc(inStock)",
  "desc(price)"
]
```

---

## Step 5: Index Your Products

You have several options for indexing products from Contentful to Algolia:

### Option A: Manual Upload (for testing)

1. Export products from Contentful as JSON
2. Transform to Algolia format
3. Upload via Algolia dashboard

### Option B: Using Algolia CLI

```bash
npm install -g algoliasearch-cli

algolia import \
  --app-id YOUR_APP_ID \
  --api-key YOUR_ADMIN_API_KEY \
  --index-name products \
  --file products.json
```

### Option C: Programmatic Sync (Recommended)

Create a sync script (`scripts/sync-to-algolia.ts`):

```typescript
import { createClient } from 'contentful'
import algoliasearch from 'algoliasearch'

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
})

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_API_KEY!
)

const index = algoliaClient.initIndex('products')

async function syncProducts() {
  const response = await contentfulClient.getEntries({
    content_type: 'product',
    limit: 1000
  })

  const products = response.items.map(item => ({
    objectID: item.sys.id,
    name: item.fields.name,
    slug: item.fields.slug,
    description: item.fields.description,
    price: item.fields.price,
    salePrice: item.fields.salePrice,
    image: item.fields.images?.[0]?.fields.file.url,
    category: item.fields.category?.fields.name,
    brand: item.fields.brand,
    inStock: item.fields.inStock,
    tags: item.fields.tags || []
  }))

  await index.saveObjects(products)
  console.log(`Synced ${products.length} products to Algolia`)
}

syncProducts()
```

Run the script:

```bash
npx tsx scripts/sync-to-algolia.ts
```

---

## Step 6: Configure Index Settings

### Replica Indices for Sorting

Create replica indices for different sort orders:

1. **products_price_asc** - Price: Low to High
2. **products_price_desc** - Price: High to Low
3. **products_name_asc** - Name: A to Z

In your main index settings:

```json
{
  "replicas": [
    "products_price_asc",
    "products_price_desc",
    "products_name_asc"
  ]
}
```

Configure each replica's ranking:

**products_price_asc:**
```json
{
  "ranking": [
    "asc(price)",
    "typo",
    "geo",
    "words",
    "filters",
    "proximity",
    "attribute",
    "exact",
    "custom"
  ]
}
```

**products_price_desc:**
```json
{
  "ranking": [
    "desc(price)",
    "typo",
    "geo",
    "words",
    "filters",
    "proximity",
    "attribute",
    "exact",
    "custom"
  ]
}
```

---

## Step 7: Test Your Search

Use the Algolia dashboard to test searches:

1. Go to your index
2. Use the search bar to test queries
3. Verify facets are working
4. Check that results are relevant

---

## Current Runtime Configuration

The application uses the following Algolia configuration in `nuxt.config.ts`:

```typescript
public: {
  algolia: {
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    applicationId: process.env.ALGOLIA_APP_ID,
    indexName: process.env.ALGOLIA_INDEX_NAME || 'algolia_apparel_sample_dataset',
    lite: true,
    cache: false,
    instantSearch: {
      theme: 'algolia'
    },
    docSearch: {},
    recommend: "",
    globalIndex: "",
    useFetch: false
  }
}
```

## Example Product Record (Apparel Dataset)

Here's what a product record looks like in the `algolia_apparel_sample_dataset`:

```json
{
  "objectID": "B0BWQBPQF9",
  "title": "Women's Classic Crew Neck T-Shirt",
  "description": "Comfortable cotton t-shirt perfect for everyday wear",
  "price": 24.99,
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "showcase_image": "https://example.com/showcase.jpg",
  "color": ["Black", "White", "Navy"],
  "product_type": "T-Shirts",
  "tags": ["casual", "cotton", "basics"],
  "hierarchical_categories": {
    "lvl0": "Women",
    "lvl1": "Women > Clothing",
    "lvl2": "Women > Clothing > T-Shirts"
  },
  "units_sold": 1250,
  "weight": "150g",
  "taxable": true
}
```

---

## Advanced Configuration

### Synonyms

Add synonyms to improve search:

```json
[
  {
    "objectID": "headphones-synonyms",
    "type": "synonym",
    "synonyms": ["headphones", "earphones", "headset"]
  }
]
```

### Rules

Create rules for merchandising:

```json
{
  "objectID": "promote-sale-items",
  "condition": {
    "pattern": "sale",
    "anchoring": "contains"
  },
  "consequence": {
    "params": {
      "filters": "salePrice > 0"
    }
  }
}
```

### Query Suggestions

Enable query suggestions for autocomplete:

1. Go to **Search** → **Query Suggestions**
2. Create a new index for suggestions
3. Configure source index as `products`

---

## Webhooks (Optional)

Set up Contentful webhooks to auto-sync to Algolia:

1. In Contentful, go to **Settings** → **Webhooks**
2. Create a new webhook
3. Point to your sync endpoint
4. Trigger on product publish/unpublish

Example webhook handler:

```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (body.sys.contentType.sys.id === 'product') {
    // Transform and index to Algolia
    await syncProductToAlgolia(body)
  }
  
  return { success: true }
})
```

---

## Performance Tips

### Caching

- Cache search results on the client
- Use Algolia's built-in caching
- Implement request deduplication

### Pagination

- Use `hitsPerPage` to limit results
- Implement infinite scroll or pagination
- Don't fetch all results at once

### Filters

- Use numeric filters for price ranges
- Combine filters with AND/OR logic
- Pre-filter on the server when possible

---

## Monitoring & Analytics

### Search Analytics

1. Go to **Analytics** in Algolia dashboard
2. Monitor:
   - Popular searches
   - No-results searches
   - Click-through rates
   - Conversion rates

### A/B Testing

Use Algolia's A/B testing to optimize:
- Ranking strategies
- Facet configurations
- Query rules

---

## Troubleshooting

### No Results

- Check that products are indexed
- Verify searchable attributes are configured
- Test with simple queries first

### Slow Searches

- Reduce `hitsPerPage`
- Optimize attributesToRetrieve
- Use replica indices for sorting

### Incorrect Results

- Review ranking configuration
- Check custom ranking attributes
- Verify facet filters

---

## Security Best Practices

- **Never** expose your Admin API Key in frontend code
- Use Search-Only API Key for client-side searches
- Implement secured API keys for user-specific filters
- Rotate API keys regularly

---

## Additional Resources

- [Algolia Documentation](https://www.algolia.com/doc/)
- [InstantSearch.js Guide](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/)
- [Vue InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/vue/)
- [Best Practices](https://www.algolia.com/doc/guides/managing-results/relevance-overview/)

---

For questions or issues, refer to the main [README.md](./README.md) or Algolia's support documentation.
