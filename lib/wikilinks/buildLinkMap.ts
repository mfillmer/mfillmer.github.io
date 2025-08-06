import { EleventySuppliedData } from "11ty.ts";
import { parseWikiLinksFromItemContent } from "./parseWikiLinksFromItemContent";
import { writeFileSync } from "fs";

type LinkEntry = {
  slug: string;
  path: string;
};

type LinkAdjacencyList = Record<string, LinkEntry[]>;

type LinkMapValue = {
  path: string;
  outboundLinks: LinkEntry[];
  inboundLinks: LinkEntry[];
};

export type LinkMap = Record<string, LinkMapValue>;

export const NOT_FOUND_PAGE_PATH = "/not-found.html";

export const buildLinkMap = (collectionItems: EleventySuppliedData[]) => {
  const linkMap: LinkMap = {};

  for (const item of collectionItems) {
    linkMap[item.fileSlug] = {
      path: item.filePathStem || NOT_FOUND_PAGE_PATH,
      outboundLinks: [],
      inboundLinks: [],
    };
  }

  for (const item of collectionItems) {
    const outboundLinkSlugs = parseWikiLinksFromItemContent(item.rawInput);
    const currentItemSlug = item.fileSlug;
    const currentLinkMapEntry = linkMap[currentItemSlug];

    for (const outboundSlug of outboundLinkSlugs) {
      const outboundLinkMapEntry = linkMap[outboundSlug];

      if (!!outboundLinkMapEntry) {
        currentLinkMapEntry.outboundLinks.push({
          slug: outboundSlug,
          path: outboundLinkMapEntry.path,
        });
        outboundLinkMapEntry.inboundLinks.push({
          slug: currentItemSlug,
          path: currentLinkMapEntry.path,
        });
      } else {
        console.warn(
          `[WARN] "${outboundSlug}" points to ${NOT_FOUND_PAGE_PATH}`
        );
        currentLinkMapEntry.outboundLinks.push({
          slug: outboundSlug,
          path: NOT_FOUND_PAGE_PATH,
        });
      }
    }
  }

  return linkMap;
};

export const buildLinkAdjacencyList = (linkMap: LinkMap): LinkAdjacencyList => {
  return Object.fromEntries(
    Object.entries(linkMap).map(([key, value]) => [
      key,
      [...value.outboundLinks, ...value.inboundLinks],
    ])
  );
};
export const writeToAssets = (json: object) =>
  writeFileSync("./_site/adjacencyList.json", JSON.stringify(json));
