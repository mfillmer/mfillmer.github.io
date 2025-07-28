import { execSync } from "child_process";

/** @param {import("@11ty/eleventy").ThemeConfig} eleventyConfig */
export default async function (eleventyConfig) {
  eleventyConfig.on("eleventy.after", () => {
    execSync(`npx pagefind --site _site --glob \"**/*.html\"`, {
      encoding: "utf-8",
    });
  });

  return {
    ...eleventyConfig,
    dir: {
      input: "content",
      output: "_site",
    },
  };
}
