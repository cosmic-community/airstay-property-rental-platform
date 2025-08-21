import { createBucketClient } from '@cosmicjs/sdk'
import { Property, Host, Category, HomePage, Review, ReviewFormData, CosmicResponse } from '@/types'

// Validate environment variables and provide proper error messages
const bucketSlug = process.env.COSMIC_BUCKET_SLUG
const readKey = process.env.COSMIC_READ_KEY
const writeKey = process.env.COSMIC_WRITE_KEY

if (!bucketSlug) {
  throw new Error('COSMIC_BUCKET_SLUG environment variable is required')
}

if (!readKey) {
  throw new Error('COSMIC_READ_KEY environment variable is required')
}

if (!writeKey) {
  throw new Error('COSMIC_WRITE_KEY environment variable is required')
}

export const cosmic = createBucketClient({
  bucketSlug,
  readKey,
  writeKey,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch home page content
export async function getHomePage(): Promise<HomePage | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'home-page',
        slug: 'home-page'
      })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.object as HomePage;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching home page:', error);
    throw new Error('Failed to fetch home page');
  }
}

// Fetch all properties with host and category data
export async function getProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'properties',
        'metadata.available': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Property[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties');
  }
}

// Fetch properties by category ID
export async function getPropertiesByCategory(categoryId: string): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'properties',
        'metadata.category': categoryId,
        'metadata.available': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Property[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching properties by category:', error);
    throw new Error('Failed to fetch properties by category');
  }
}

// Fetch single property by slug
export async function getProperty(slug: string): Promise<Property | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'properties',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Property;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching property:', error);
    throw new Error('Failed to fetch property');
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

// Fetch single category by slug
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching category:', error);
    throw new Error('Failed to fetch category');
  }
}

// Fetch all hosts
export async function getHosts(): Promise<Host[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'hosts' })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.objects as Host[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching hosts:', error);
    throw new Error('Failed to fetch hosts');
  }
}

// Fetch single host by slug
export async function getHost(slug: string): Promise<Host | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'hosts',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.object as Host;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching host:', error);
    throw new Error('Failed to fetch host');
  }
}

// Fetch reviews for a specific property
export async function getPropertyReviews(propertyId: string): Promise<Review[]> {
  // Add null check for propertyId
  if (!propertyId) {
    console.warn('Property ID is required for fetching reviews');
    return [];
  }

  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.property': propertyId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching property reviews:', error);
    throw new Error('Failed to fetch property reviews');
  }
}

// Fetch all reviews
export async function getAllReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching all reviews:', error);
    throw new Error('Failed to fetch all reviews');
  }
}

// Helper function to convert rating number to the required Cosmic CMS dropdown object format
function getRatingDropdownObject(rating: string): { key: string; value: string } {
  const ratingMap: Record<string, string> = {
    '5': '5 Stars',
    '4': '4 Stars', 
    '3': '3 Stars',
    '2': '2 Stars',
    '1': '1 Star'
  }
  
  return {
    key: rating,
    value: ratingMap[rating] || '5 Stars'
  }
}

// Create a new review
export async function createReview(reviewData: ReviewFormData): Promise<Review> {
  // Add validation for reviewData properties
  if (!reviewData.property_id) {
    throw new Error('Property ID is required to create a review');
  }

  // Enhanced validation for reviewer_name with proper null checks
  if (!reviewData.reviewer_name) {
    throw new Error('Reviewer name is required');
  }

  if (typeof reviewData.reviewer_name !== 'string') {
    throw new Error('Reviewer name must be a string');
  }

  const reviewerName: string = reviewData.reviewer_name.trim()
  if (!reviewerName) {
    throw new Error('Reviewer name cannot be empty');
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    
    const response = await cosmic.objects.insertOne({
      title: `Review by ${reviewerName}`,
      type: 'reviews',
      status: 'published',
      metadata: {
        reviewer_name: reviewerName,
        email: reviewData.email,
        rating: getRatingDropdownObject(reviewData.rating),
        comment: reviewData.comment,
        property: reviewData.property_id,
        review_date: today,
        verified_stay: false
      }
    });

    return response.object as Review;
  } catch (error) {
    console.error('Error creating review:', error);
    throw new Error('Failed to create review');
  }
}

// Helper function to extract rating number from Cosmic CMS rating format
function getRatingNumber(rating: any): number {
  // Handle Cosmic CMS select-dropdown format: {key: "3", value: "3 Stars"}
  if (typeof rating === 'object' && rating !== null && 'key' in rating) {
    const ratingNum = parseInt(rating.key);
    return !isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5 ? ratingNum : 5;
  }
  
  // Handle string format  
  if (typeof rating === 'string') {
    // Try to extract number from strings like "3 Stars" or "3"
    const match = rating.match(/(\d+)/);
    if (match) {
      const ratingNum = parseInt(match[1]);
      return !isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5 ? ratingNum : 5;
    }
  }
  
  // Handle direct number
  if (typeof rating === 'number') {
    return rating >= 1 && rating <= 5 ? rating : 5;
  }
  
  // Default to 5 if unable to parse
  return 5;
}

// Calculate average rating for a property
export function calculatePropertyRating(reviews: Review[]) {
  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;

  reviews.forEach(review => {
    // Add null safety check for review and metadata
    const ratingNumber = getRatingNumber(review?.metadata?.rating);
    totalRating += ratingNumber;
    ratingDistribution[ratingNumber as keyof typeof ratingDistribution]++;
  });

  return {
    averageRating: Number((totalRating / reviews.length).toFixed(1)),
    totalReviews: reviews.length,
    ratingDistribution
  };
}