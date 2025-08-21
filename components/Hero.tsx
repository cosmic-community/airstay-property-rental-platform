import Link from 'next/link'
import { getHomePage } from '@/lib/cosmic'

export default async function Hero() {
  const homePage = await getHomePage()

  // Fallback content if no home page data is available
  const heroTitle = homePage?.metadata?.hero_title || "Find Your Perfect Stay"
  const heroSubtitle = homePage?.metadata?.hero_subtitle || "Discover unique accommodations around the world. From luxury beach villas to cozy mountain cabins, find the perfect place for your next adventure."
  const heroImage = homePage?.metadata?.hero_image?.imgix_url || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
  const primaryButtonText = homePage?.metadata?.primary_button_text || "Browse Properties"
  const primaryButtonLink = homePage?.metadata?.primary_button_link || "#featured"
  const secondaryButtonText = homePage?.metadata?.secondary_button_text || "View Locations"
  const secondaryButtonLink = homePage?.metadata?.secondary_button_link || "#categories"

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${heroImage}?w=1920&h=1080&fit=crop&auto=format,compress`}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-gray-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {heroTitle}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto text-gray-100">
          {heroSubtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryButtonLink}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center min-w-[200px]"
          >
            {primaryButtonText}
          </Link>
          {secondaryButtonText && (
            <Link
              href={secondaryButtonLink}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 inline-flex items-center justify-center min-w-[200px]"
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}