import { EleventySuppliedData } from '11ty.ts'
import { getLinkEntries } from './parseWikiLinksFromItemContent'
import { LinkMap } from './types'
import { addTrailingSlash } from './utils'

export const buildLinkMap = (collectionItems: EleventySuppliedData[]) => {
  const linkMap = initializeLinkMap(collectionItems)

  for (const item of collectionItems) {
    const itemFilePath = addTrailingSlash(item.filePathStem)
    const currentLinkMapEntry = linkMap[itemFilePath]

    const linkEntries = getLinkEntries(item, linkMap)

    currentLinkMapEntry.outboundLinks = linkEntries

    linkEntries.forEach((link) => {
      const targetLinkEntry = linkMap[link.target]
      if (targetLinkEntry) {
        targetLinkEntry.inboundLinks[itemFilePath] = {
          label: item.fileSlug + ' > ' + link.label,
          target: itemFilePath,
        }
      }
    })
  }

  return linkMap
}

const initializeLinkMap = (
  collectionItems: EleventySuppliedData[],
): LinkMap => {
  return collectionItems
    .map((item) => ({
      label: item.fileSlug,
      target: addTrailingSlash(item.filePathStem),
      outboundLinks: [],
      inboundLinks: {},
    }))
    .reduce(
      (map, item) => ({
        ...map,
        [item.target]: item,
      }),
      {},
    )
}
