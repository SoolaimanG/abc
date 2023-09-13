/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // assuming you were using the Sanity.io image CDN
    // domains is an array of comma-separated strings
    // ['cdn.sanity.io', 'cdn.not-sanity.io', 'another domain']
    domains: [
      "lh3.googleusercontent.com",
      "api.multiavatar.com",
      "img.icons8.com",
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
