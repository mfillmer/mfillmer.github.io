import React, { useEffect } from "react";
import { Backlinks } from "../../_components/Backlinks.11ty";
import { EleventyData } from "../../_components/eleventyTypes.11ty";
import { GraphView } from "../../_components/GraphView.11ty";

const Layout = (props: EleventyData) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title || props.page.fileSlug}</title>
        <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
        <link rel="stylesheet" href="/css/global.css" />
        <script defer src="/clientsidejs/pagefind-search.js" />
        <script type="module" src="/clientsidejs/graph-view.js"></script>
      </head>
      <body>
        <div className="grid">
          {/* @ts-ignore */}
          <pagefind-search class="col-span-2 col-start-2 row-start-1 "></pagefind-search>
          <div
            id="sidebar"
            className="col-start-1 row-start-2 row-span-full min-w-40"
          >
            Sidebar
          </div>
          <div className="col-start-3 row-span-full">
            <Backlinks {...props} />
            <GraphView />
          </div>
          <article
            className="col-start-2 row-start-1 prose xl:prose-xl"
            data-pagefind-body
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></article>
        </div>
      </body>
      <script type="module" src="/clientsidejs/sidebar.tsx"></script>
    </html>
  );
};

export default Layout;
