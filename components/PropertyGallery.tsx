'use client'

import { useState } from 'react'

interface Photo {
  url: string
  imgix_url: string
}

interface PropertyGalleryProps {
  photos: Photo[]
  propertyName: string
}

export default function PropertyGallery({ photos, propertyName }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showModal, setShowModal] = useState(false)

  // Handle empty photos array
  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="text-4xl mb-2">🏠</div>
          <p>No photos available</p>
        </div>
      </div>
    )
  }

  const mainPhoto = photos[0]
  const additionalPhotos = photos.slice(1, 5)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % photos.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-lg overflow-hidden">
        {/* Main large image */}
        {mainPhoto && (
          <div 
            className="col-span-2 row-span-2 cursor-pointer relative group"
            onClick={() => {
              setSelectedImage(0)
              setShowModal(true)
            }}
          >
            <img
              src={`${mainPhoto.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={`${propertyName} - Main view`}
              className="w-full h-full object-cover group-hover:brightness-90 transition-all"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
          </div>
        )}

        {/* Additional smaller images */}
        {additionalPhotos.map((photo, index) => {
          // Add null check for photo object
          if (!photo) return null;
          
          return (
            <div
              key={index}
              className="cursor-pointer relative group"
              onClick={() => {
                setSelectedImage(index + 1)
                setShowModal(true)
              }}
            >
              <img
                src={`${photo.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                alt={`${propertyName} - View ${index + 2}`}
                className="w-full h-full object-cover group-hover:brightness-90 transition-all"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
              
              {/* Show all photos button on last image */}
              {index === additionalPhotos.length - 1 && photos.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    +{photos.length - 5} more
                  </span>
                </div>
              )}
            </div>
          )
        })}

        {/* Fill empty spots if we have fewer than 5 photos */}
        {Array.from({ length: Math.max(0, 4 - additionalPhotos.length) }).map((_, index) => (
          <div key={`empty-${index}`} className="bg-gray-100" />
        ))}
      </div>

      {/* View all photos button */}
      {photos.length > 1 && (
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          View all {photos.length} photos
        </button>
      )}

      {/* Modal for full-screen gallery */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              aria-label="Close gallery"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation buttons */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 text-white hover:text-gray-300 z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 text-white hover:text-gray-300 z-10"
                  aria-label="Next image"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Main image */}
            {photos[selectedImage] && (
              <img
                src={`${photos[selectedImage].imgix_url}?w=1200&h=800&fit=max&auto=format,compress`}
                alt={`${propertyName} - View ${selectedImage + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full">
              {selectedImage + 1} / {photos.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                {photos.map((photo, index) => {
                  // Add null check for photo object in thumbnails
                  if (!photo) return null;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-white' : 'border-transparent opacity-60 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={`${photo.imgix_url}?w=200&h=150&fit=crop&auto=format,compress`}
                        alt={`${propertyName} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}