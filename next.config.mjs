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
      },
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
      }

    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
}

export default nextConfig
