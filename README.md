# AirStay - Property Rental Platform

A modern Airbnb clone built with Next.js that showcases beautiful rental properties with comprehensive filtering, detailed property pages, and host profiles. Browse through luxury beach villas, downtown apartments, and cozy mountain cabins with an intuitive and responsive design.

![App Preview](https://imgix.cosmicjs.com/c769a620-7e3d-11f0-8dcc-651091f6a7c0-photo-1564013799919-ab600027ffc6-1755746422266.jpg?w=1200&h=300&fit=crop&auto=format,compress)

## ✨ Features

- **Property Browsing** - Explore curated properties with beautiful imagery and detailed information
- **Category Filtering** - Browse by property types (Houses, Apartments, Cabins) 
- **Detailed Property Pages** - Complete property information with amenities, pricing, and host details
- **Host Profiles** - View host information, ratings, and contact details
- **Responsive Design** - Optimized for all device sizes with modern UI/UX
- **Real-time Content** - Dynamic content updates from Cosmic CMS
- **Image Optimization** - High-performance image delivery with imgix
- **TypeScript Support** - Full type safety and developer experience

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68a690105889fe2d11f74d13&clone_repository=68a691565889fe2d11f74d2e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create an Airbnb clone

### Code Generation Prompt

> Create an Airbnb clone using Next.js

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and enhanced developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Cosmic CMS** - Headless CMS for content management
- **Imgix** - Image optimization and transformation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your content bucket

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## 📚 Cosmic SDK Examples

### Fetching Properties
```typescript
// Get all available properties with host and category data
const properties = await cosmic.objects
  .find({ 
    type: 'properties',
    'metadata.available': true 
  })
  .depth(1)

// Get properties by category
const houseProperties = await cosmic.objects
  .find({ 
    type: 'properties',
    'metadata.category': categoryId
  })
  .depth(1)
```

### Fetching Single Property
```typescript
// Get property details with full relationship data
const property = await cosmic.objects
  .findOne({
    type: 'properties',
    slug: propertySlug
  })
  .depth(1)
```

### Fetching Categories and Hosts
```typescript
// Get all property categories
const categories = await cosmic.objects.find({ type: 'categories' })

// Get host information
const hosts = await cosmic.objects.find({ type: 'hosts' })
```

## 🎨 Cosmic CMS Integration

This application integrates with three main Cosmic object types:

### Properties
- Property name, description, and pricing
- Location and capacity details (bedrooms, bathrooms, max guests)  
- Photo galleries with multiple images
- Amenities checklist (WiFi, Kitchen, Pool, etc.)
- Connected host and category objects
- Availability status

### Hosts
- Host profiles with names and bio information
- Profile photos and contact details
- Member since dates and response rates
- Connected to multiple properties

### Categories  
- Property categorization (Houses, Apartments, Cabins)
- Category descriptions and emoji icons
- Used for filtering and organization

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy with automatic builds on push

### Netlify
1. Connect repository to Netlify
2. Set build command: `bun run build`
3. Set environment variables in Netlify dashboard
4. Deploy with continuous integration

### Environment Variables for Production
Set these environment variables in your hosting platform:
- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket identifier  
- `COSMIC_READ_KEY` - Your Cosmic read API key
- `COSMIC_WRITE_KEY` - Your Cosmic write API key (if needed)

<!-- README_END -->