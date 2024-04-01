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
    ],
  },
}

export default nextConfig
