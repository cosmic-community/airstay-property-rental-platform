import { NextRequest, NextResponse } from 'next/server'
import { createReview } from '@/lib/cosmic'
import { ReviewFormData } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: ReviewFormData = await request.json()

    // Basic validation
    if (!body.reviewer_name || !body.email || !body.rating || !body.comment || !body.property_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate rating
    const rating = parseInt(body.rating)
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const review = await createReview(body)

    return NextResponse.json(
      { message: 'Review created successfully', review },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}