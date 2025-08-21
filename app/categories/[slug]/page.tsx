// app/categories/[slug]/page.tsx
import { getCategory, getPropertiesByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PropertyGrid from '@/components/PropertyGrid'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  // First get the category by slug
  const category = await getCategory(slug)
  
  if (!category) {
    notFound()
  }

  // Then get properties using the category ID
  const properties = await getPropertiesByCategory(category.id)

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {category.metadata.icon && (
            <span className="text-4xl">{category.metadata.icon}</span>
          )}
          <h1 className="text-4xl font-bold text-gray-900">
            {category.metadata.category_name}
          </h1>
        </div>
        {category.metadata.description && (
          <p className="text-xl text-gray-600 mb-6">
            {category.metadata.description}
          </p>
        )}
        <p className="text-lg text-gray-500">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
        </p>
      </div>

      <PropertyGrid properties={properties} />
    </div>
  )
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found - AirStay',
    }
  }

  return {
    title: `${category.metadata.category_name} - AirStay`,
    description: category.metadata.description || `Browse ${category.metadata.category_name} properties on AirStay`,
  }
}