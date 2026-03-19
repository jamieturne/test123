/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@spotlight/shared'],
};

module.exports = nextConfig;
