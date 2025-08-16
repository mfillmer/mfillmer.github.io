import defineConfig from "11ty.ts";
import { wikilinksPlugin } from "./lib/wikilinks";
import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

export default defineConfig((eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("clientsidejs");
  eleventyConfig.addPlugin(wikilinksPlugin);
  eleventyConfig.addTemplateFormats("11ty.jsx,11ty.tsx");
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: function () {
      return async function (data: string) {
        let content = await this.defaultRenderer(data);
        return renderToStaticMarkup(content);
      };
    },
  });
  eleventyConfig.addPlugin(EleventyVitePlugin);

  eleventyConfig.addBundle("js");

  return {
    ...eleventyConfig,
    dir: {
      input: "content",
      output: "_site",
    },
  };
});
