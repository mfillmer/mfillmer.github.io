import React from "react";
import { Backlinks } from "../../components/Backlinks.11ty";
import { EleventyData } from "../../components/eleventyTypes.11ty";
import { GraphView } from "../../components/GraphView.11ty";
import { SidebarInset } from "../../components/ui/sidebar";
import { Button } from "../../components/ui/button";
import { Home } from "lucide-react";

const Layout = (props: EleventyData) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title || props.page.fileSlug}</title>
        <link rel="stylesheet" href="/css/global.css" />
        <script type="module" src="/clientsidejs/graph-view.js"></script>
      </head>
      <body className="relative">
        <header
          id="menubar"
          className="sticky top-0 z-40 flex items-center w-full shadow bg-gray-50 h-menubar-height-mobile md:h-menubar-height"
        >
          <Button
            variant="ghost"
            className="flex items-center w-1/5 cursor-pointer"
          >
            <Home />
            <h2 className="hidden md:inline">My Digital Playground</h2>
          </Button>
          <div className="flex items-center justify-center w-3/5">Pagefind</div>
          <div id="placeholder" className="w-1/5">
            &nbsp;
          </div>
        </header>
        <div className="grid grid-flow-row-dense columns-3">
          <div className="col-start-1 row-start-1 ">
            <div id="sidebar">Sidebar</div>
          </div>
          <div className="col-start-3 row-start-1 overflow-hidden">
            <Backlinks {...props} />
            <GraphView />
          </div>
          <SidebarInset>
            <article
              className="min-w-0 col-start-2 row-start-1 prose xl:prose-xl"
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
