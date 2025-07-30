import defineConfig from "11ty.ts";
import { execSync } from "child_process";

export default defineConfig((eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("webcomponents");

  return {
    ...eleventyConfig,
    dir: {
      input: "content",
      output: "_site",
    },
  };
});
