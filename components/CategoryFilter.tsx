import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="category-tag"
        >
          {category.metadata.icon && (
            <span className="text-lg">{category.metadata.icon}</span>
          )}
          <span>{category.metadata.category_name}</span>
        </Link>
      ))}
    </div>
  )
}