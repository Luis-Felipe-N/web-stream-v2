/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images2.alphacoders.com' },
      { protocol: 'https', hostname: 'media.kitsu.io' },
      { protocol: 'https', hostname: 'animesonlinecc.to' },
      {
        protocol: 'https',
        hostname: 'kitsu-production-media.s3.us-west-002.backblazeb2.com',
      },
      {
        protocol: 'https',
        hostname: 'images5.alphacoders.com',
      },
      {
        protocol: 'https',
        hostname: 'watchbr-resources.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdnsecakmi.kaltura.com',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
