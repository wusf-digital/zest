/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['npr.brightspotcdn.com', 'image.simplecastcdn.com', 'thezestpodcast.com']
  }
}

module.exports = nextConfig
