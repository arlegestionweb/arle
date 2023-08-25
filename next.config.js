/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  },
  swcMinify: false,
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
