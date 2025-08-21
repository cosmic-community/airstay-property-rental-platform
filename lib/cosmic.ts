import { createBucketClient } from '@cosmicjs/sdk'
import { Property, Host, Category, HomePage, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
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