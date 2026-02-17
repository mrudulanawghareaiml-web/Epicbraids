import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    // @ts-ignore - Extends timeout for high-res Supabase images
    imgOptTimeoutInSeconds: 60, 
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cmhypugbgxhzoeqgwrwn.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
