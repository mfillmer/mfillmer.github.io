import { EleventySuppliedData } from "11ty.ts";
import { parseLinksFromItemContent } from "./parseLinksFromItemContent";

export const buildLinkMap = (collectionItems: EleventySuppliedData[]) => {
  const linkMap = {};

  for (const item of collectionItems) {
    linkMap[item.fileSlug] = {
      path: item.inputPath,
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
          path: "/not-found.md",
        });
      }
    }
  }

  return linkMap;
};
