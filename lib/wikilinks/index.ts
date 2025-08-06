import { EleventyConfig } from "11ty.ts";
import { buildLinkMap, NOT_FOUND_PAGE_PATH } from "./buildLinkMap";
import { parseWikiLinksFromItemContent } from "./parseWikiLinksFromItemContent";

export const wikilinksPlugin = (config: EleventyConfig, options = {}) => {
  let linkMap = {};
  config.addCollection("linkMap", (collectionsApi) => {
    linkMap = buildLinkMap(collectionsApi.getAll());

    return new Map(Object.entries(linkMap));
  });

  config.addTransform("wikilinks", (content) => {
    console.log("transforming wikilinks");

    let _content = content;
    const wikiLinkSlugs = parseWikiLinksFromItemContent(content);

    for (const slug of wikiLinkSlugs) {
      const href = linkMap[slug]?.path || NOT_FOUND_PAGE_PATH;
      const linkTag = `<a href="${href}">${slug}</a>`;
      _content = _content.replaceAll(`[[${slug}]]`, linkTag);
    }

    return _content;
  });

  config.addFilter("mapGet", (map, key) => {
    return map.get(key);
  });

  return config;
};
