# Contentful Setup Guide

This guide will help you set up your Contentful space with the necessary content types for the eCommerce application.

## Prerequisites

- A Contentful account (free tier is sufficient)
- Access to your Space ID and Content Delivery API Access Token

## Content Types Overview

You'll need to create the following content types:

1. **Page Product** - Individual product items (primary content type)
2. **Component SEO** - SEO metadata for products
3. **Category** - Product categories (optional)
4. **Hero Banner** - Homepage hero sections (optional)
5. **Featured Collection** - Curated product collections (optional)
6. **Home Page** - Homepage configuration (optional)

**Note:** This application primarily uses the `pageProduct` content type. Other content types are optional and can be added as needed.

---

## 1. Page Product Content Type

**Content Type ID:** `pageProduct`

### Fields

| Field Name | Field ID | Type | Required | Validations |
|------------|----------|------|----------|-------------|
| Name | `name` | Short text | Yes | - |
| Slug | `slug` | Short text | Yes | Unique |
| Description | `description` | Long text | Yes | - |
| Price | `price` | Number (Decimal) | Yes | Min: 0 |
| Featured Product Image | `featuredProductImage` | Media | Yes | Accept: Images only |
| Product Images | `productImages` | Media (Multiple) | No | Accept: Images only |
| Related Products | `relatedProducts` | Reference (Multiple) | No | Accept: Page Product |
| SEO Fields | `seoFields` | Reference | No | Accept: Component SEO |

### Example Page Product Entry

```json
{
  "name": "Premium Wireless Headphones",
  "slug": "premium-wireless-headphones",
  "description": "High-quality wireless headphones with active noise cancellation and 30-hour battery life.",
  "price": 299.99
}
```

---

## 1a. Component SEO Content Type

**Content Type ID:** `componentSeo`

### Fields

| Field Name | Field ID | Type | Required | Validations |
|------------|----------|------|----------|-------------|
| Name | `name` | Short text | Yes | - |
| Title | `title` | Short text | No | - |
| Description | `description` | Long text | No | - |
| Keywords | `keywords` | Short text (List) | No | - |
| No Index | `noIndex` | Boolean | No | Default: false |
| No Follow | `noFollow` | Boolean | No | Default: false |

---

## 2. Category Content Type

**Content Type ID:** `category`

### Fields

| Field Name | Field ID | Type | Required | Validations |
|------------|----------|------|----------|-------------|
| Name | `name` | Short text | Yes | - |
| Slug | `slug` | Short text | Yes | Unique |
| Description | `description` | Long text | No | - |
| Image | `image` | Media | No | Accept: Images only |
| Parent Category | `parentCategory` | Reference | No | Accept: Category |

### Example Category Entry

```json
{
  "name": "Electronics",
  "slug": "electronics",
  "description": "All electronic devices and accessories"
}
```

---

## 3. Hero Banner Content Type

**Content Type ID:** `heroBanner`

### Fields

| Field Name | Field ID | Type | Required | Validations |
|------------|----------|------|----------|-------------|
| Title | `title` | Short text | Yes | - |
| Subtitle | `subtitle` | Short text | No | - |
| Image | `image` | Media | Yes | Accept: Images only |
| CTA Text | `ctaText` | Short text | No | - |
| CTA Link | `ctaLink` | Short text | No | - |
| Background Color | `backgroundColor` | Short text | No | - |

### Example Hero Banner Entry

```json
{
  "title": "Summer Sale - Up to 50% Off",
  "subtitle": "Shop the latest trends at unbeatable prices",
  "ctaText": "Shop Now",
  "ctaLink": "/products",
  "backgroundColor": "#6366f1"
}
```

---

## 4. Featured Collection Content Type

**Content Type ID:** `featuredCollection`

### Fields

| Field Name | Field ID | Type | Required | Validations |
|------------|----------|------|----------|-------------|
| Title | `title` | Short text | Yes | - |
| Description | `description` | Long text | No | - |
| Products | `products` | Reference (Multiple) | Yes | Accept: Product |
| Display Type | `displayType` | Short text | No | Options: grid, carousel |

### Example Featured Collection Entry

```json
{
  "title": "Best Sellers",
  "description": "Our most popular products this month",
  "displayType": "grid"
}
```

---

## 5. Home Page Content Type

**Content Type ID:** `homePage`

### Fields

| Field Name | Field ID | Type | Required | Validations |
|------------|----------|------|----------|-------------|
| Hero Banner | `heroBanner` | Reference | Yes | Accept: Hero Banner |
| Featured Collections | `featuredCollections` | Reference (Multiple) | Yes | Accept: Featured Collection |
| SEO Title | `seoTitle` | Short text | No | - |
| SEO Description | `seoDescription` | Long text | No | - |

---

## Step-by-Step Setup

### 1. Access Contentful

1. Log in to [Contentful](https://app.contentful.com/)
2. Select your space or create a new one

### 2. Create Content Types

For each content type above:

1. Go to **Content model** in the sidebar
2. Click **Add content type**
3. Enter the Content Type ID and Name
4. Add all fields as specified in the tables above
5. Set field validations and requirements
6. Click **Save**

### 3. Create Sample Content

1. Go to **Content** in the sidebar
2. Click **Add entry**
3. Select the content type
4. Fill in the fields
5. Click **Publish**

### 4. Get Your Credentials

1. Go to **Settings** → **API keys**
2. Click **Add API key** or select an existing one
3. Copy your:
   - **Space ID**
   - **Content Delivery API - access token**
4. Add these to your `.env` file

---

## Current Runtime Configuration

The application uses the following Contentful configuration in `nuxt.config.ts`:

```typescript
public: {
  contentful: {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master'
  }
}
```

### Environment Variables

Add these to your `.env` file:

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_ENVIRONMENT=master
```

---

### 5. Optional: Import Sample Data

You can use the Contentful CLI to import sample data:

```bash
npm install -g contentful-cli
contentful login
contentful space import --space-id YOUR_SPACE_ID --content-file sample-data.json
```

---

## Tips & Best Practices

### Images

- Use high-quality images (at least 1200x1200px for products)
- Optimize images before uploading
- Use descriptive file names and alt text

### Slugs

- Keep slugs lowercase and hyphenated
- Make them SEO-friendly
- Ensure they're unique

### Content Organization

- Create categories before products
- Use meaningful category hierarchies
- Tag products consistently

### SEO

- Fill in all SEO fields
- Write unique descriptions for each product
- Use relevant keywords naturally

---

## Syncing with Algolia

After creating products in Contentful, you'll need to sync them to Algolia. See [ALGOLIA_SETUP.md](./ALGOLIA_SETUP.md) for instructions.

---

## Troubleshooting

### Content Not Appearing

- Ensure entries are **Published** (not just saved as drafts)
- Check that your API key has the correct permissions
- Verify the environment is set to `master` (or your custom environment)

### Missing Fields

- Check that field IDs match exactly (case-sensitive)
- Ensure required fields are filled in
- Verify reference fields point to published entries

### API Errors

- Double-check your Space ID and Access Token
- Ensure you're using the **Content Delivery API** token (not Preview API)
- Check API rate limits if experiencing throttling

---

## Additional Resources

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Content Modeling Guide](https://www.contentful.com/developers/docs/concepts/data-model/)
- [Contentful CLI](https://github.com/contentful/contentful-cli)

---

For questions or issues, refer to the main [README.md](./README.md) or Contentful's support documentation.
