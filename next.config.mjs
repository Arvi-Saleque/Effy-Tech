/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 2,
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  turbopack: {
    resolveAlias: {
      canvas: "./src/features/effy-edu-demo/lib/empty-module.ts",
    },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/quickservices",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/allservices",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/salek",
        destination: "/team/salek-bin-hossain",
        permanent: true,
      },
      {
        source: "/saif",
        destination: "/team/abdullah-al-saif",
        permanent: true,
      },
      {
        source: "/adnan",
        destination: "/team/adnan-bin-wahid",
        permanent: true,
      },
      {
        source: "/projects/IAM",
        destination: "/projects/islamic-amal-tracker",
        permanent: true,
      },
      {
        source: "/projects/IAM/confirmed",
        destination: "/projects/islamic-amal-tracker/confirmed",
        permanent: true,
      },
      {
        source: "/projects/EEMS",
        destination: "/projects/effy-edu-management-system",
        permanent: true,
      },
      {
        source: "/projects/DHA",
        destination: "/projects/darul-hikmah-academy",
        permanent: true,
      },
      {
        source: "/projects/BUEK",
        destination: "/projects/bangladesh-university-of-excellence-khulna",
        permanent: true,
      },
      {
        source: "/effy_edu_management_system/:path*",
        destination: "/demos/effy-edu-management-system/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/demos/effy-edu-management-system/:path*",
        destination: "/effy_edu_management_system/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/effy_edu_management_system/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/demos/effy-edu-management-system/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
