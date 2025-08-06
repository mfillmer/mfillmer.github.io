import defineConfig from "11ty.ts";
import { wikilinksPlugin } from "./lib/wikilinks";

export default defineConfig((eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("webcomponents");
  eleventyConfig.addPlugin(wikilinksPlugin);
  eleventyConfig.addExtension(["11ty.ts"], {
    key: "11ty.js",
  });

  return {
    ...eleventyConfig,
    dir: {
      input: "content",
      output: "_site",
    },
  };
});
