import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow Next.js Image to serve from Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/z0klcira/**',
      },
    ],
  },
};

export default nextConfig;
