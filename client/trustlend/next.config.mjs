/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com',"api.studio.thegraph.com"], // Allow external images from Unsplash
  },
};

export default nextConfig;
