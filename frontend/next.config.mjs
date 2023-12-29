/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: true,
  basePath: '',
  swcMinify: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
