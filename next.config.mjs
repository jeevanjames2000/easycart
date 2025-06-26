/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://fakestoreapi.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    removeConsole: true,
  },
};

export default nextConfig;
