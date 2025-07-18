import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  search: true,
  contentDirBasePath: "/content",
});

const nextConfig: NextConfig = withNextra({
  output: 'export',
  basePath: '/mfillmer.github.io',
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "/src/mdx-components.tsx",
    },
  },
});

export default nextConfig;
