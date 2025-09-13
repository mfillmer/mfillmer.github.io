import { loadFromAssets } from './utils'
import {
  NOT_FOUND_PAGE_PATH,
  parseWikiLinks,
} from './parseWikiLinksFromItemContent'
import { consoleLog } from './utils'
import { LinkMap } from './types'

export const wikilinksTransformer = () => (content: string) => {
  const linkMap: LinkMap = JSON.parse(loadFromAssets('linkMap.json'))
  let _content = content
  const wikiLinkSlugs = parseWikiLinks(content)

  for (const slug of wikiLinkSlugs) {
    const linkMapEntry = Object.values(linkMap).find(
      (mapItem) => mapItem.label === slug,
    )
    const href = linkMapEntry?.target || NOT_FOUND_PAGE_PATH
    consoleLog(`transforming [[${slug}]], set target to ${href}`)

    const linkTag = `<a href="${href}">${slug}</a>`
    _content = _content.replaceAll(`[[${slug}]]`, linkTag)
  }

  return _content
}
