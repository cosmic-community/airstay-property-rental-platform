import Link from 'next/link'
import { Property } from '@/types'
import { getPropertyReviews, calculatePropertyRating } from '@/lib/cosmic'
import { Suspense } from 'react'

interface PropertyCardProps {
  property: Property
}

async function PropertyRating({ propertyId }: { propertyId: string }) {
  const reviews = await getPropertyReviews(propertyId);
  const rating = calculatePropertyRating(reviews);

  if (rating.totalReviews === 0) {
    return (
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <span>⭐</span>
        <span>No reviews yet</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <span>⭐</span>
      <span className="font-medium">{rating.averageRating}</span>
      <span className="text-gray-500">
        ({rating.totalReviews} review{rating.totalReviews !== 1 ? 's' : ''})
      </span>
    </div>
  );
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainPhoto = property.metadata.property_photos?.[0]
  const category = property.metadata.category
  const host = property.metadata.host

  return (
    <Link href={`/properties/${property.slug}`} className="property-card block">
      <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl">
        {mainPhoto ? (
          <img
            src={`${mainPhoto.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={property.metadata.property_name}
            width="300"
            height="200"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">🏠</span>
          </div>
        )}
        
        {category && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white bg-opacity-90 text-gray-800 text-sm font-medium rounded-full">
              {category.metadata.icon} {category.metadata.category_name}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {property.metadata.property_name}
          </h3>
          <p className="text-gray-600 text-sm">
            {property.metadata.location}
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span>{property.metadata.bedrooms} bed{property.metadata.bedrooms !== 1 ? 's' : ''}</span>
          <span>{property.metadata.bathrooms} bath{property.metadata.bathrooms !== 1 ? 's' : ''}</span>
          <span>{property.metadata.max_guests} guest{property.metadata.max_guests !== 1 ? 's' : ''}</span>
        </div>

        <div className="mb-4">
          <Suspense fallback={
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>⭐</span>
              <span>Loading...</span>
            </div>
          }>
            <PropertyRating propertyId={property.id} />
          </Suspense>
        </div>
        
        {host && (
          <div className="flex items-center gap-2 mb-4">
            {host.metadata.profile_photo ? (
              <img
                src={`${host.metadata.profile_photo.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                alt={host.metadata.host_name}
                width="24"
                height="24"
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-400 text-xs">👤</span>
              </div>
            )}
            <span className="text-sm text-gray-600">
              Hosted by {host.metadata.host_name}
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              ${property.metadata.price_per_night}
            </span>
            <span className="text-gray-600">/night</span>
          </div>
          
          {property.metadata.amenities && property.metadata.amenities.length > 0 && (
            <span className="text-sm text-secondary">
              {property.metadata.amenities.length} amenities
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}