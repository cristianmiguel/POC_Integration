# eCommerce Application - Nuxt 3 + TypeScript + Contentful + Algolia

A modern, production-ready eCommerce application built with **Nuxt 3**, **TypeScript**, **Contentful 11.9.0** for content management, and **Algolia Search** for powerful product discovery.

## 🚀 Features

- ✅ **Server-Side Rendering (SSR)** with Nuxt 3 for optimal SEO
- ✅ **TypeScript** for type safety and better developer experience
- ✅ **Contentful CMS** integration for flexible content management
- ✅ **Algolia Search** with filters, facets, and pagination
- ✅ **Shopping Cart** with Pinia state management and localStorage persistence
- ✅ **Responsive Design** with modern CSS and smooth animations
- ✅ **SEO Optimized** with meta tags and semantic HTML
- ✅ **Component-Based Architecture** with reusable Vue components

## 📦 Tech Stack

- **Framework:** Nuxt 3
- **Language:** TypeScript
- **CMS:** Contentful 11.9.0
- **Search:** Algolia Search
- **State Management:** Pinia
- **Styling:** Vanilla CSS with CSS Variables
- **Package Manager:** npm

## 🛠️ Installation & Setup

### Prerequisites

- Node.js v23.11.1 or higher
- npm v10.9.2 or higher
- Contentful account with Space ID and Access Token
- Algolia account with Application ID and API Key

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then fill in your credentials:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_ENVIRONMENT=master

# Algolia Configuration
ALGOLIA_APP_ID=your_app_id_here
ALGOLIA_SEARCH_API_KEY=your_search_api_key_here
ALGOLIA_INDEX_NAME=products
```

### 3. Set Up Contentful

See [CONTENTFUL_SETUP.md](./CONTENTFUL_SETUP.md) for detailed instructions on:
- Creating content types
- Defining fields
- Adding sample data

### 4. Set Up Algolia

See [ALGOLIA_SETUP.md](./ALGOLIA_SETUP.md) for detailed instructions on:
- Configuring search indices
- Setting up searchable attributes
- Defining facets and filters

### 5. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
POC/
├── assets/
│   └── styles/
│       └── main.css              # Global styles and design system
├── components/
│   └── ui/
│       ├── BaseButton.vue        # Reusable button component
│       ├── ProductCard.vue       # Product card component
│       └── SkeletonLoader.vue    # Loading skeleton
├── composables/
│   ├── useContentful.ts          # Contentful data fetching
│   └── useAlgolia.ts             # Algolia search functionality
├── pages/
│   ├── index.vue                 # Homepage
│   ├── cart.vue                  # Shopping cart page
│   └── products/
│       ├── index.vue             # Product list with search
│       └── [slug].vue            # Product detail page
├── plugins/
│   └── algolia.ts                # Algolia client initialization
├── stores/
│   └── cart.ts                   # Pinia cart store
├── types/
│   └── index.ts                  # TypeScript type definitions
├── utils/
│   └── formatters.ts             # Utility functions
├── app.vue                       # Root component with layout
├── nuxt.config.ts                # Nuxt configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🎯 Key Components

### Pages

- **Homepage (`pages/index.vue`)**: Hero banner, featured collections from Contentful
- **Product List (`pages/products/index.vue`)**: Algolia-powered search with filters and pagination
- **Product Detail (`pages/products/[slug].vue`)**: Full product information with image gallery
- **Cart (`pages/cart.vue`)**: Shopping cart with quantity management and order summary

### Composables

- **`useContentful`**: Type-safe methods for fetching products, categories, and homepage content
- **`useAlgolia`**: Search functionality with filters, facets, and autocomplete

### Store

- **`cart`**: Pinia store managing cart state with localStorage persistence

## 🚢 Build & Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Generate Static Site (SSG)

```bash
npm run generate
```

## 🎨 Design System

The application uses a comprehensive design system with:

- **CSS Variables** for theming and consistency
- **Responsive Grid System** for layouts
- **Smooth Animations** and transitions
- **Dark Mode Support** (auto-detects system preference)
- **Accessible Components** with ARIA labels

## 🔍 SEO Best Practices

- Server-side rendering for optimal crawlability
- Dynamic meta tags per page
- Semantic HTML structure
- Proper heading hierarchy
- Image lazy loading
- Fast page load times

## 📊 Performance Optimizations

- Code splitting with Nuxt auto-imports
- Image lazy loading
- Component lazy loading
- Efficient state management
- Optimized bundle size

## 🛒 Cart Features

- Add/remove products
- Update quantities
- Automatic price calculations
- Tax and shipping calculations
- Free shipping threshold
- localStorage persistence
- Empty cart state

## 🔧 Customization

### Styling

Edit `assets/styles/main.css` to customize:
- Color palette
- Typography
- Spacing
- Border radius
- Shadows

### Content Types

Modify `types/index.ts` to match your Contentful content model.

### Search Configuration

Update `composables/useAlgolia.ts` to customize search behavior and filters.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🆘 Support

For issues or questions:
- Check the documentation files
- Review the code comments
- Consult Nuxt 3, Contentful, and Algolia documentation

## 🎓 Learning Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Algolia Documentation](https://www.algolia.com/doc/)
- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

Built with ❤️ using Nuxt 3, TypeScript, Contentful, and Algolia
