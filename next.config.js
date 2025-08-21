/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.cosmicjs.com',
      'imgix.cosmicjs.com',
      'images.unsplash.com'
    ],
  },
  // Remove experimental CSS optimization that was causing build failures
  // experimental: {
  //   optimizeCss: true
  // }
}

module.exports = nextConfig