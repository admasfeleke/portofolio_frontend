/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Production — your Yegara domain (update after deploying)
      { protocol: "https", hostname: "**" },
      // Local development
      { protocol: "http", hostname: "localhost", port: "8000" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000" },
    ]
  }
};

export default nextConfig;
