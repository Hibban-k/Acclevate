import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'acclevate.com',
          },
        ],
        destination: 'https://www.acclevate.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
