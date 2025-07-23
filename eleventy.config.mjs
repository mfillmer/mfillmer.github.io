/** @param {import("@11ty/eleventy").ThemeConfig} eleventyConfig */
export default async function (eleventyConfig) {
  return {
    ...eleventyConfig,
    dir: {
      input: "content",
      output: "_site",
    },
  };
}
