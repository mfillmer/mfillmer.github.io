import { EleventySuppliedData } from "11ty.ts";
import { getLinkEntries } from "./parseWikiLinksFromItemContent";
import { LinkMap } from "./types";

export const buildLinkMap = (collectionItems: EleventySuppliedData[]) => {
  const linkMap = initializeLinkMap(collectionItems);

  for (const item of collectionItems) {
    const currentLinkMapEntry = linkMap[item.filePathStem];

    const linkEntries = getLinkEntries(item, linkMap);

    currentLinkMapEntry.outboundLinks = linkEntries;

    linkEntries.forEach((link) => {
      const targetLinkEntry = linkMap[link.target];
      if (targetLinkEntry) {
        targetLinkEntry.inboundLinks.push({
          label: item.fileSlug,
          target: item.filePathStem,
        });
      }
    });
  }

  return linkMap;
};

const initializeLinkMap = (
  collectionItems: EleventySuppliedData[]
): LinkMap => {
  return collectionItems
    .map((item) => ({
      label: item.fileSlug,
      target: item.filePathStem,
      outboundLinks: [],
      inboundLinks: [],
    }))
    .reduce(
      (map, item) => ({
        ...map,
        [item.target]: item,
      }),
      {}
    );
};
