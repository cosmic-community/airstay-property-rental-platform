'use client'

import { useState } from 'react'
import { Review, ReviewFormData } from '@/types'

interface ReviewSectionProps {
  reviews: Review[]
  propertyId: string
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export default function ReviewSection({ 
  reviews, 
  propertyId, 
  averageRating, 
  totalReviews,
  ratingDistribution 
}: ReviewSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [formData, setFormData] = useState<ReviewFormData>({
    reviewer_name: '',
    email: '',
    rating: '5',
    comment: '',
    property_id: propertyId
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          reviewer_name: '',
          email: '',
          rating: '5',
          comment: '',
          property_id: propertyId
        })
        setShowForm(false)
        // Optionally refresh the page or update reviews state
        window.location.reload()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Helper function to extract rating number from Cosmic CMS rating format
  const getRatingNumber = (rating: any): number => {
    // Handle Cosmic CMS select-dropdown format: {key: "3", value: "3 Stars"}
    if (typeof rating === 'object' && rating !== null && 'key' in rating) {
      const ratingNum = parseInt(rating.key);
      return !isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5 ? ratingNum : 5;
    }
    
    // Handle string format
    if (typeof rating === 'string') {
      // Try to extract number from strings like "3 Stars" or "3"
      const match = rating.match(/(\d+)/);
      if (match) {
        const ratingNum = parseInt(match[1]);
        return !isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5 ? ratingNum : 5;
      }
    }
    
    // Handle direct number
    if (typeof rating === 'number') {
      return rating >= 1 && rating <= 5 ? rating : 5;
    }
    
    // Default to 5 if unable to parse
    return 5;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Reviews {totalReviews > 0 && `(${totalReviews})`}
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Write a Review
        </button>
      </div>

      {/* Rating Summary */}
      {totalReviews > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{averageRating}</div>
              <div className="flex items-center justify-center mt-1">
                {renderStarRating(Math.round(averageRating))}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {totalReviews} review{totalReviews !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center gap-2 mb-1">
                  <span className="w-3 text-sm">{rating}</span>
                  <span>⭐</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${totalReviews > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / totalReviews) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm text-gray-600">
                    {ratingDistribution[rating as keyof typeof ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="bg-white border rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.reviewer_name}
                  onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating *
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="5">5 Stars - Excellent</option>
                <option value="4">4 Stars - Very Good</option>
                <option value="3">3 Stars - Good</option>
                <option value="2">2 Stars - Fair</option>
                <option value="1">1 Star - Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comment *
              </label>
              <textarea
                rows={4}
                required
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Share your experience with this property..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md">
                Thank you! Your review has been submitted successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md">
                Sorry, there was an error submitting your review. Please try again.
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    {review.metadata.reviewer_name}
                    {review.metadata.verified_stay && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Verified Stay
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {renderStarRating(getRatingNumber(review.metadata.rating))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.metadata.review_date)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {review.metadata.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No reviews yet
          </h3>
          <p className="text-gray-600">
            Be the first to share your experience with this property!
          </p>
        </div>
      )}
    </div>
  )
}