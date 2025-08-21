import Link from 'next/link'

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Discover unique accommodations around the world. From luxury beach villas to cozy mountain cabins, find the perfect place for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#featured" className="btn-secondary bg-white text-primary hover:bg-gray-100">
              Browse Properties
            </Link>
            <Link href="/categories/houses" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
              View Houses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}