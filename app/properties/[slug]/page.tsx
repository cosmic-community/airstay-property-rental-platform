// app/properties/[slug]/page.tsx
import { getProperty, getPropertyReviews, calculatePropertyRating } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PropertyGallery from '@/components/PropertyGallery'
import PropertyDetails from '@/components/PropertyDetails'
import HostProfile from '@/components/HostProfile'
import ReviewSection from '@/components/ReviewSection'

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  
  const property = await getProperty(slug)

  if (!property) {
    notFound()
  }

  // Fetch reviews for this property
  const reviews = await getPropertyReviews(property.id)
  const ratingData = calculatePropertyRating(reviews)

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {property.metadata.property_name}
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>📍 {property.metadata.location}</span>
          {ratingData.totalReviews > 0 && (
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span className="font-medium">{ratingData.averageRating}</span>
              <span>({ratingData.totalReviews} review{ratingData.totalReviews !== 1 ? 's' : ''})</span>
            </div>
          )}
        </div>
      </div>

      <PropertyGallery 
        photos={property.metadata.property_photos || []} 
        propertyName={property.metadata.property_name}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        <div className="lg:col-span-2">
          <PropertyDetails property={property} />
          
          <ReviewSection 
            reviews={reviews}
            propertyId={property.id}
            averageRating={ratingData.averageRating}
            totalReviews={ratingData.totalReviews}
            ratingDistribution={ratingData.ratingDistribution}
          />
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white border rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">
                    ${property.metadata.price_per_night}
                  </span>
                  <span className="text-gray-600">/night</span>
                </div>
                {ratingData.totalReviews > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <span>⭐</span>
                    <span className="font-medium">{ratingData.averageRating}</span>
                    <span className="text-gray-500">({ratingData.totalReviews})</span>
                  </div>
                )}
              </div>
              
              <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold">
                Reserve Now
              </button>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                You won't be charged yet
              </div>
            </div>

            {property.metadata.host && (
              <HostProfile host={property.metadata.host} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = await getProperty(slug)

  if (!property) {
    return {
      title: 'Property Not Found - AirStay',
    }
  }

  return {
    title: `${property.metadata.property_name} - AirStay`,
    description: property.metadata.description.replace(/<[^>]*>/g, '').substring(0, 155),
  }
}