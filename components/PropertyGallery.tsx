interface PropertyGalleryProps {
  photos: Array<{
    url: string;
    imgix_url: string;
  }>;
  propertyName: string;
}

export default function PropertyGallery({ photos, propertyName }: PropertyGalleryProps) {
  if (!photos || photos.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-gray-500">No photos available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((photo, index) => (
        <div key={index} className="aspect-video overflow-hidden rounded-lg">
          <img
            src={`${photo.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={`${propertyName} - Photo ${index + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  )
}