import { LinkMap, NOT_FOUND_PAGE_PATH } from "./buildLinkMap";
import { parseWikiLinksFromItemContent } from "./parseWikiLinksFromItemContent";

export const wikilinksTransformer = (linkMap: LinkMap) => (content: string) => {
  let _content = content;
  const wikiLinkSlugs = parseWikiLinksFromItemContent(content);

  for (const slug of wikiLinkSlugs) {
    const href = linkMap[slug]?.path || NOT_FOUND_PAGE_PATH;
    const linkTag = `<a href="${href}">${slug}</a>`;
    _content = _content.replaceAll(`[[${slug}]]`, linkTag);
  }

  return _content;
};
