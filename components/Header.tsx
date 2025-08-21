import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">
              🏠 AirStay
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/categories/houses" 
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Houses
            </Link>
            <Link 
              href="/categories/apartments" 
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Apartments
            </Link>
            <Link 
              href="/categories/cabins" 
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Cabins
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="btn-secondary text-sm">
              Become a Host
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}