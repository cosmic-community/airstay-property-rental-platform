interface PropertyPhoto {
  url: string
  imgix_url: string
}

interface PropertyGalleryProps {
  photos: PropertyPhoto[]
  propertyName: string
}

export default function PropertyGallery({ photos, propertyName }: PropertyGalleryProps) {
  if (photos.length === 0) {
    return null
  }

  const mainPhoto = photos[0]
  const additionalPhotos = photos.slice(1, 5) // Show up to 4 additional photos

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-xl overflow-hidden">
      <div className="col-span-2 row-span-2">
        <img
          src={`${mainPhoto.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={propertyName}
          width="400"
          height="300"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {additionalPhotos.map((photo, index) => (
        <div key={index} className="col-span-1 row-span-1">
          <img
            src={`${photo.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
            alt={`${propertyName} - Photo ${index + 2}`}
            width="200"
            height="150"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
      
      {photos.length > 5 && (
        <div className="col-span-1 row-span-1 relative">
          <img
            src={`${photos[4].imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
            alt={`${propertyName} - Photo 5`}
            width="200"
            height="150"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              +{photos.length - 4} more
            </span>
          </div>
        </div>
      )}
    </div>
  )
}