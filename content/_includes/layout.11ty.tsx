import React from "react";
import { Backlinks } from "../../components/Backlinks.11ty";
import { EleventyData } from "../../components/eleventyTypes.11ty";
import { GraphView } from "../../components/GraphView.11ty";
import { SidebarInset } from "../../components/ui/sidebar";

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
        <div className="relative grid grid-flow-row-dense columns-3">
          <div className="col-start-1 row-start-2 ">
            <div id="sidebar">Sidebar</div>
          </div>
          <div
            id="menubar"
            className="sticky top-0 z-10 w-full col-span-3 col-start-1 row-start-1"
          >
            {/* @ts-ignore */}
            <pagefind-search></pagefind-search>
          </div>
          <div className="col-start-3 row-start-2 overflow-hidden">
            <Backlinks {...props} />
            <GraphView />
          </div>
          <SidebarInset>
            <article
              className="min-w-0 col-start-2 row-start-2 prose xl:prose-xl"
              data-pagefind-body
              dangerouslySetInnerHTML={{ __html: props.content }}
            ></article>
          </SidebarInset>
        </div>
      </body>
      <script type="module" src="/clientsidejs/sidebar.tsx"></script>
      <script type="module" src="/clientsidejs/menubar.tsx"></script>
    </html>
  );
};

export default Layout;
