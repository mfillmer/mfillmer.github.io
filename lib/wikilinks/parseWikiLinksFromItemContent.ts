import { EleventySuppliedData } from '11ty.ts'
import { LinkEntry, LinkMap } from './types'
import { consoleWarn } from './utils'

export const NOT_FOUND_PAGE_PATH = '/not-found'

export const parseWikiLinks = (markdownContent: string) => {
  const wikilinkRegExp = /(?<!!)\[\[([^|]+?)(\|([\s\S]+?))?\]\]/g
  const wikilinks = markdownContent.match(wikilinkRegExp) || []
  const wikilinkSlugs = wikilinks.map((link: string) =>
    link.replaceAll(/\[|\]/g, '').trim(),
  )

  return wikilinkSlugs
}

export const parseMarkdownLinks = (markdownContent: string): LinkEntry[] => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g

  const matches = markdownContent.match(linkRegex) || []

  return matches?.map((link: RegExpMatchArray[number]) => {
    const match = linkRegex.exec(link)
    if (match?.length === 3) {
      return {
        label: match[1],
        target: match[2],
      }
    } else {
      consoleWarn(link, ...(match ?? []))
    }
  })
}

export const parseHtmlLinks = (markdownContent: string): LinkEntry[] => {
  const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>([^<]*)<\/a>/g
  const matches = markdownContent.match(linkRegex) || []

  return matches?.map((link: RegExpMatchArray[number]) => {
    const match = linkRegex.exec(link)
    if (match?.length === 3) {
      return {
        label: match[1],
        target: match[2],
      }
    } else {
      consoleWarn(link, ...(match ?? []))
    }
  })
}

export const getLinkEntries = (
  item: EleventySuppliedData,
  linkMap: LinkMap,
): LinkEntry[] => {
  const markdownLinks = parseMarkdownLinks(item.rawInput)
  const htmlLinks = parseHtmlLinks(item.rawInput)
  const wikilinks = extendSlugsByPath(parseWikiLinks(item.rawInput), linkMap)

  return [...wikilinks, ...htmlLinks, ...markdownLinks].filter(Boolean)
}

const extendSlugsByPath = (slugs: string[], linkMap: LinkMap): LinkEntry[] => {
  return slugs.map((slug) => ({
    label: slug,
    target:
      Object.values(linkMap).find((linkEntry) => linkEntry.label === slug)
        ?.target || NOT_FOUND_PAGE_PATH,
  }))
}
