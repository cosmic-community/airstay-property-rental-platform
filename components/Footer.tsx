export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-primary mb-4">
              🏠 AirStay
            </div>
            <p className="text-gray-600 text-sm">
              Find and book unique accommodations around the world with AirStay.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/categories/houses" className="hover:text-primary">Houses</a></li>
              <li><a href="/categories/apartments" className="hover:text-primary">Apartments</a></li>
              <li><a href="/categories/cabins" className="hover:text-primary">Cabins</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Safety</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">Become a Host</a></li>
              <li><a href="#" className="hover:text-primary">Host Resources</a></li>
              <li><a href="#" className="hover:text-primary">Community</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} AirStay. Built with Cosmic.</p>
        </div>
      </div>
    </footer>
  )
}