/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Ensure dynamic routes always work in both dev and prod
  experimental: {},
};
export default nextConfig;
