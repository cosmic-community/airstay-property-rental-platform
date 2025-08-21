'use client'

import { useState } from 'react'
import { Property } from '@/types'

interface PropertyGalleryProps {
  property: Property
}

export default function PropertyGallery({ property }: PropertyGalleryProps) {
  const photos = property.metadata.property_photos || []
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // If no photos available, show placeholder
  if (photos.length === 0) {
    return (
      <div className="relative h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-6xl mb-4">🏠</div>
          <p>No photos available</p>
        </div>
      </div>
    )
  }

  const mainPhoto = photos[currentIndex]
  
  // Additional safety check for mainPhoto
  if (!mainPhoto) {
    return (
      <div className="relative h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-6xl mb-4">🏠</div>
          <p>Photo not available</p>
        </div>
      </div>
    )
  }

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <div className="relative">
      {/* Main photo */}
      <div className="relative h-96 rounded-lg overflow-hidden">
        <img
          src={`${mainPhoto.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={`${property.metadata.property_name} - Photo ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation arrows - only show if more than one photo */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              aria-label="Previous photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              aria-label="Next photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Photo counter */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        )}
      </div>

      {/* Thumbnail navigation - only show if more than one photo */}
      {photos.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentIndex 
                  ? 'border-blue-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={`${photo.imgix_url}?w=160&h=120&fit=crop&auto=format,compress`}
                alt={`${property.metadata.property_name} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}