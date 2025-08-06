import { EleventyConfig } from "11ty.ts";
import { buildLinkMap } from "./buildLinkMap";

export const wikilinksPlugin = (config: EleventyConfig, options = {}) => {
  config.addCollection("linkMap", (collectionsApi) => {
    const linkMap = buildLinkMap(collectionsApi.getAll());

    return new Map(Object.entries(linkMap));
  });

  config.addFilter("mapGet", (map, key) => {
    return map.get(key);
  });

  return config;
};
