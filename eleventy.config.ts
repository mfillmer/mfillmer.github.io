import defineConfig from "11ty.ts";
import { execSync } from "child_process";

export default defineConfig((eleventyConfig) => {
  eleventyConfig.on("eleventy.after", () => {
    execSync(`npx pagefind --site _site --glob \"**/*.html\"`, {
      encoding: "utf-8",
    });
  });

  eleventyConfig.addPassthroughCopy("webcomponents");

  return {
    ...eleventyConfig,
    dir: {
      input: "content",
      output: "_site",
    },
  };
});
