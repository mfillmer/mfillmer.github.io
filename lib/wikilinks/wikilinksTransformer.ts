import { LinkMap, loadFromAssets, NOT_FOUND_PAGE_PATH } from "./buildLinkMap";
import { parseWikiLinksFromItemContent } from "./parseWikiLinksFromItemContent";
import { consoleLog } from "./utils";

export const wikilinksTransformer = () => (content: string) => {
  const linkMap: LinkMap = JSON.parse(loadFromAssets("linkMap.json"));
  let _content = content;
  const wikiLinkSlugs = parseWikiLinksFromItemContent(content);
  for (const slug of wikiLinkSlugs) {
    const href = linkMap[slug]?.path || NOT_FOUND_PAGE_PATH;
    consoleLog(`transforming [[${slug}]], set target to ${href}`);
    const linkTag = `<a href="${href}">${slug}</a>`;
    _content = _content.replaceAll(`[[${slug}]]`, linkTag);
  }

  return _content;
};
