import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['gsap'],
  reactStrictMode: true,
  compress: true,
};

export default nextConfig;
