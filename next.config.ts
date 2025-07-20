import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  search: true,
  contentDirBasePath: "/content",
});

const nextConfig: NextConfig = withNextra({
  output: "export",
  basePath: "",
  images: {
    unoptimized: true,
  },
});

export default nextConfig;
