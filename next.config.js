/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tvecnfdqakrevzaeifpk.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Enable static export for Vercel deployment
  output: 'standalone',
  // Optimize for production
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
