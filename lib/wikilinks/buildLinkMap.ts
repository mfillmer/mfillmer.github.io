import { EleventySuppliedData } from "11ty.ts";
import { parseLinksFromItemContent } from "./parseLinksFromItemContent";

type LinkEntry = {
  slug: string;
  path: string;
};

type LinkMapValue = {
  path: string;
  outboundLinks: LinkEntry[];
  inboundLinks: LinkEntry[];
};

type LinkMap = Record<string, LinkMapValue>;

export const buildLinkMap = (
  collectionItems: EleventySuppliedData[],
  NOT_FOUND_PAGE_PATH = "/not-found.html"
) => {
  const linkMap: LinkMap = {};

  for (const item of collectionItems) {
    linkMap[item.fileSlug] = {
      path: item.filePathStem || NOT_FOUND_PAGE_PATH,
      outboundLinks: [],
      inboundLinks: [],
    };
  }

  for (const item of collectionItems) {
    const outboundLinkSlugs = parseLinksFromItemContent(item.rawInput);
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
        currentLinkMapEntry.outboundLinks.push({
          slug: outboundSlug,
          path: NOT_FOUND_PAGE_PATH,
        });
      }
    }
  }

  return linkMap;
};
