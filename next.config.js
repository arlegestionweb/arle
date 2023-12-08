/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig
