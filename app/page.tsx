import { getProperties, getCategories } from '@/lib/cosmic'
import PropertyGrid from '@/components/PropertyGrid'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [properties, categories] = await Promise.all([
    getProperties(),
    getCategories()
  ])

  return (
    <div>
      <Hero />
      
      <div className="container mx-auto px-6 py-12">
        <div id="categories" className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <CategoryFilter categories={categories} />
        </div>

        <div id="featured" className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Featured Properties
          </h2>
          <PropertyGrid properties={properties} />
        </div>
      </div>
    </div>
  )
}