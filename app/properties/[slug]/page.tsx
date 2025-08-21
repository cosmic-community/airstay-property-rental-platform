// app/properties/[slug]/page.tsx
import { getProperty } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PropertyDetails from '@/components/PropertyDetails'
import HostCard from '@/components/HostCard'
import PropertyGallery from '@/components/PropertyGallery'

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = await getProperty(slug)

  if (!property) {
    notFound()
  }

  const host = property.metadata.host
  const photos = property.metadata.property_photos || []

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {property.metadata.property_name}
        </h1>
        <p className="text-xl text-gray-600">
          {property.metadata.location}
        </p>
      </div>

      {photos.length > 0 && (
        <div className="mb-12">
          <PropertyGallery photos={photos} propertyName={property.metadata.property_name} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <PropertyDetails property={property} />
        </div>
        
        <div className="lg:col-span-1">
          {host && (
            <div className="sticky top-8">
              <HostCard host={host} pricePerNight={property.metadata.price_per_night} />
            </div>
          )}
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
    description: property.metadata.description?.replace(/<[^>]*>/g, '').slice(0, 160),
  }
}