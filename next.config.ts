import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  search: true,
  contentDirBasePath: "/content",
});

const nextConfig: NextConfig = withNextra({
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "/src/mdx-components.tsx",
    },
  },
});

export default nextConfig;
