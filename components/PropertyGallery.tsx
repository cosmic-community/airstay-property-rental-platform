'use client'

import { useState, useEffect } from 'react'

interface PropertyGalleryProps {
  photos: Array<{ url: string; imgix_url: string }>
  propertyName: string
}

export default function PropertyGallery({ photos, propertyName }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No photos available</span>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isModalOpen) return
      
      if (event.key === 'Escape') {
        closeModal()
      } else if (event.key === 'ArrowLeft') {
        prevImage()
      } else if (event.key === 'ArrowRight') {
        nextImage()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isModalOpen])

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <>
      <div className="grid grid-cols-4 gap-2 h-96">
        {/* Main image */}
        <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => openModal(0)}>
          <img
            src={`${photos[0].imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={`${propertyName} - Main photo`}
            className="w-full h-full object-cover rounded-l-lg hover:brightness-90 transition-all"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all rounded-l-lg" />
        </div>

        {/* Secondary images */}
        {photos.slice(1, 5).map((photo, index) => (
          <div 
            key={index} 
            className={`relative cursor-pointer ${index === 3 ? 'rounded-r-lg' : ''}`}
            onClick={() => openModal(index + 1)}
          >
            <img
              src={`${photo.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
              alt={`${propertyName} - Photo ${index + 2}`}
              className={`w-full h-full object-cover hover:brightness-90 transition-all ${
                index === 1 ? 'rounded-tr-lg' : index === 3 ? 'rounded-br-lg' : ''
              }`}
            />
            <div className={`absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all ${
              index === 1 ? 'rounded-tr-lg' : index === 3 ? 'rounded-br-lg' : ''
            }`} />
            {index === 3 && photos.length > 5 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-br-lg">
                <span className="text-white text-lg font-semibold">
                  +{photos.length - 5} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View all photos button */}
      {photos.length > 1 && (
        <button
          onClick={() => openModal(0)}
          className="absolute bottom-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          📷 View all {photos.length} photos
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Escape') {
              closeModal()
            } else if (event.key === 'ArrowLeft') {
              prevImage()
            } else if (event.key === 'ArrowRight') {
              nextImage()
            }
          }}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
          >
            ×
          </button>

          {/* Navigation buttons */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-6xl hover:text-gray-300 z-10"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-6xl hover:text-gray-300 z-10"
              >
                ›
              </button>
            </>
          )}

          {/* Current image */}
          <div className="max-w-5xl max-h-[90vh] mx-4">
            <img
              src={`${photos[currentIndex].imgix_url}?w=1200&h=800&fit=max&auto=format,compress`}
              alt={`${propertyName} - Photo ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Thumbnail strip */}
          {photos.length > 1 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                    index === currentIndex ? 'border-white' : 'border-transparent opacity-70'
                  }`}
                >
                  <img
                    src={`${photo.imgix_url}?w=100&h=75&fit=crop&auto=format,compress`}
                    alt={`${propertyName} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}