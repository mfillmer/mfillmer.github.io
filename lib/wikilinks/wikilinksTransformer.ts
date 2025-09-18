import { loadFromAssets, slugify } from './utils'
import {
  NOT_FOUND_PAGE_PATH,
  parseHtmlLinks,
  parseMarkdownLinks,
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
      (mapItem) => slugify(mapItem.label) === slugify(slug),
    )
    const href = linkMapEntry?.target || NOT_FOUND_PAGE_PATH
    consoleLog(`transforming [[${slug}]], set target to ${href}`)

    const linkTag = `<a href="${href}">${slug}</a>`
    _content = _content.replaceAll(`[[${slug}]]`, linkTag)
  }

  return _content
}

export const removeFileExtensionsFromLinks = (content: string) => {
  let _content = content
  const htmlLinks = parseHtmlLinks(content)

  const links = htmlLinks.filter(Boolean).map((link) => link.target)

  for (const href of links) {
    const hrefWithoutFileExtension = href.replace(/\.md$/, '/')
    consoleLog('replace', href, 'with', hrefWithoutFileExtension)
    _content = _content.replaceAll(href, hrefWithoutFileExtension)
  }

  return _content
}
