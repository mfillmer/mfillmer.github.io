export const wikilinkRegExp = /(?<!!)\[\[([^|]+?)(\|([\s\S]+?))?\]\]/g;

export const parseLinksFromItemContent = (markdownContent: string) => {
  const wikilinks = markdownContent.match(wikilinkRegExp) || [];
  const wikilinkSlugs = wikilinks.map((link: string) =>
    link.replaceAll(/\[|\]/g, "").trim()
  );

  return wikilinkSlugs;
};
