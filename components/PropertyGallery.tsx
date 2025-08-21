'use client'

import { useState } from 'react'

interface PropertyGalleryProps {
  photos: Array<{
    url: string
    imgix_url: string
  }>
  propertyName: string
}

export default function PropertyGallery({ photos = [], propertyName }: PropertyGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
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

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % photos.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal()
    } else if (event.key === 'ArrowRight') {
      nextImage()
    } else if (event.key === 'ArrowLeft') {
      prevImage()
    }
  }

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-lg overflow-hidden">
        {/* Main large image */}
        {mainPhoto && (
          <div 
            className="col-span-2 row-span-2 cursor-pointer relative group"
            onClick={() => openModal(0)}
          >
            <img
              src={`${mainPhoto.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={`${propertyName} - Main view`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </div>
        )}
        
        {/* Additional smaller images */}
        {additionalPhotos.map((photo, index) => {
          const actualIndex = index + 1
          const isLast = index === 3 && photos.length > 5
          
          return photo ? (
            <div 
              key={actualIndex}
              className="cursor-pointer relative group"
              onClick={() => openModal(actualIndex)}
            >
              <img
                src={`${photo.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                alt={`${propertyName} - View ${actualIndex + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
              
              {/* Show more photos overlay */}
              {isLast && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    +{photos.length - 5} more
                  </span>
                </div>
              )}
            </div>
          ) : null
        })}
      </div>

      {/* Modal for full-size images */}
      {showModal && photos[selectedImageIndex] && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-4xl w-full h-full flex items-center justify-center p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
              aria-label="Close modal"
            >
              ×
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 text-white text-4xl hover:text-gray-300 z-10"
              aria-label="Previous image"
            >
              ‹
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 text-white text-4xl hover:text-gray-300 z-10"
              aria-label="Next image"
            >
              ›
            </button>
            
            <img
              src={`${photos[selectedImageIndex].imgix_url}?w=1200&h=900&fit=max&auto=format,compress`}
              alt={`${propertyName} - View ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              {selectedImageIndex + 1} of {photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}