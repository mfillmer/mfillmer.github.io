import { EleventyConfig } from "11ty.ts";
import {
  buildLinkAdjacencyList,
  buildLinkMap,
  LinkMap,
  writeToAssets,
} from "./buildLinkMap";
import { wikilinksTransformer } from "./wikilinksTransformer";

export const wikilinksPlugin = (config: EleventyConfig, options = {}) => {
  let linkMap: LinkMap = {};
  config.addCollection("linkMap", (collectionsApi) => {
    linkMap = buildLinkMap(collectionsApi.getAll());
    writeToAssets(buildLinkAdjacencyList(linkMap));
    return linkMap;
  });

  config.addTransform("wikilinks", wikilinksTransformer(linkMap));
  config.addFilter("mapGet", (map, key) => map[key]);

  return config;
};
