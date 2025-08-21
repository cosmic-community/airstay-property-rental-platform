// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Home Page interface
export interface HomePage extends CosmicObject {
  type: 'home-page';
  metadata: {
    hero_title: string;
    hero_subtitle: string;
    hero_image: {
      url: string;
      imgix_url: string;
    };
    primary_button_text: string;
    primary_button_link: string;
    secondary_button_text?: string;
    secondary_button_link?: string;
  };
}

// Property interface
export interface Property extends CosmicObject {
  type: 'properties';
  metadata: {
    property_name: string;
    description: string;
    price_per_night: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    max_guests: number;
    property_photos?: Array<{
      url: string;
      imgix_url: string;
    }>;
    amenities?: string[];
    host?: Host;
    category?: Category;
    available?: boolean;
  };
}

// Host interface
export interface Host extends CosmicObject {
  type: 'hosts';
  metadata: {
    host_name: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email: string;
    phone?: string;
    response_rate?: string;
    member_since?: string;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    category_name: string;
    description?: string;
    icon?: string;
  };
}

// Review interface
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name: string;
    email: string;
    rating: string;
    comment: string;
    property: Property;
    review_date: string;
    verified_stay?: boolean;
  };
}

// Review form data
export interface ReviewFormData {
  reviewer_name: string;
  email: string;
  rating: string;
  comment: string;
  property_id: string;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isProperty(obj: CosmicObject): obj is Property {
  return obj.type === 'properties';
}

export function isHost(obj: CosmicObject): obj is Host {
  return obj.type === 'hosts';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isHomePage(obj: CosmicObject): obj is HomePage {
  return obj.type === 'home-page';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

// Utility types
export type PropertyWithHost = Property & {
  metadata: Property['metadata'] & {
    host: Host;
    category: Category;
  };
};

export interface SearchParams {
  category?: string;
  location?: string;
  guests?: number;
}

// Rating calculation utilities
export interface PropertyRating {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}