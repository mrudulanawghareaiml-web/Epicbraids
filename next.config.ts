/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cmhypugbgxhzoeqgwrwn.supabase.co',
        port: '',
        pathname: '/**', // FIXED: Allows all images from your Supabase project
      },
    ],
  },
};

export default nextConfig;
