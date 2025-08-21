import { Property } from '@/types'

interface PropertyDetailsProps {
  property: Property
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const amenities = property.metadata.amenities || []
  
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-6 mb-4 text-gray-600">
          <span>{property.metadata.bedrooms} bedroom{property.metadata.bedrooms !== 1 ? 's' : ''}</span>
          <span>{property.metadata.bathrooms} bathroom{property.metadata.bathrooms !== 1 ? 's' : ''}</span>
          <span>{property.metadata.max_guests} guest{property.metadata.max_guests !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this place</h2>
        <div 
          className="text-gray-600 leading-relaxed prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: property.metadata.description }}
        />
      </div>

      {amenities.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What this place offers</h2>
          <div className="grid grid-cols-2 gap-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{getAmenityIcon(amenity)}</span>
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function getAmenityIcon(amenity: string): string {
  const icons: Record<string, string> = {
    'WiFi': '📶',
    'Kitchen': '🍳',
    'Parking': '🅿️',
    'Pool': '🏊',
    'Hot Tub': '🛁',
    'Pet Friendly': '🐕',
    'Air Conditioning': '❄️',
    'Heating': '🔥'
  }
  return icons[amenity] || '✓'
}