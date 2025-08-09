import { EleventySuppliedData } from "11ty.ts";
import { parseWikiLinksFromItemContent } from "./parseWikiLinksFromItemContent";
import { readFileSync, writeFileSync } from "fs";

type LinkEntry = {
  slug: string;
  path: string;
};

type LinkMapValue = {
  path: string;
  slug: string;
  outboundLinks: LinkEntry[];
  inboundLinks: LinkEntry[];
};

export type LinkMap = Record<string, LinkMapValue>;

export const NOT_FOUND_PAGE_PATH = "/not-found";

export const buildLinkMap = (collectionItems: EleventySuppliedData[]) => {
  const linkMap: LinkMap = {};

  for (const item of collectionItems) {
    linkMap[item.fileSlug] = {
      slug: item.fileSlug,
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

export const writeToAssets = (json: object) =>
  writeFileSync("./_site/linkMap.json", JSON.stringify(json));

export const loadFromAssets = (filename: string) => {
  return readFileSync("./_site/" + filename, "utf-8");
};
