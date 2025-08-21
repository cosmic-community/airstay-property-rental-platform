'use client'

import { useState } from 'react'

interface PropertyGalleryProps {
  photos: Array<{
    url: string
    imgix_url: string
  }>
  propertyName: string
}

export default function PropertyGallery({ photos, propertyName }: PropertyGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No photos available</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-2 h-96">
      {/* Main image */}
      <div 
        className="col-span-2 row-span-2 relative cursor-pointer group"
        onClick={() => setShowLightbox(true)}
      >
        <img
          src={`${photos[0].imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={`${propertyName} - Main view`}
          className="w-full h-full object-cover rounded-l-lg group-hover:opacity-90 transition-opacity"
        />
      </div>

      {/* Secondary images */}
      {photos.slice(1, 5).map((photo, index) => (
        <div
          key={index}
          className={`relative cursor-pointer group ${
            index === 1 ? 'rounded-tr-lg' : ''
          } ${index === 3 ? 'rounded-br-lg' : ''}`}
          onClick={() => {
            setCurrentImage(index + 1)
            setShowLightbox(true)
          }}
        >
          <img
            src={`${photo.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
            alt={`${propertyName} - View ${index + 2}`}
            className={`w-full h-full object-cover group-hover:opacity-90 transition-opacity ${
              index === 1 ? 'rounded-tr-lg' : ''
            } ${index === 3 ? 'rounded-br-lg' : ''}`}
          />
          {index === 3 && photos.length > 5 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-br-lg">
              <span className="text-white text-lg font-semibold">
                +{photos.length - 5} more
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white text-2xl hover:opacity-70 z-10"
          >
            ×
          </button>
          
          <button
            onClick={() => setCurrentImage((prev) => (prev === 0 ? photos.length - 1 : prev - 1))}
            className="absolute left-4 text-white text-3xl hover:opacity-70 z-10"
            disabled={photos.length <= 1}
          >
            ‹
          </button>
          
          <button
            onClick={() => setCurrentImage((prev) => (prev === photos.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 text-white text-3xl hover:opacity-70 z-10"
            disabled={photos.length <= 1}
          >
            ›
          </button>

          <div className="max-w-5xl max-h-full mx-auto">
            <img
              src={`${photos[currentImage].imgix_url}?w=1200&h=800&fit=max&auto=format,compress`}
              alt={`${propertyName} - View ${currentImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentImage + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  )
}