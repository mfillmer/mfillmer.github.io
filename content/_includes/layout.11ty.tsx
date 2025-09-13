import { Home } from "lucide-react";
import React from "react";
import { Backlinks } from "../../components/Backlinks.11ty";
import { EleventyData } from "../../components/eleventyTypes.11ty";
import { Button } from "../../components/ui/button";

const Layout = (props: EleventyData) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title || props.page.fileSlug}</title>
        <link rel="stylesheet" href="/css/global.css" />
      </head>
      <body className="relative">
        <header
          id="menubar"
          className="sticky top-0 z-40 flex items-center w-full shadow bg-gray-50 h-menubar-height-mobile md:h-menubar-height"
        >
          <Button
            variant="ghost"
            className="flex items-center justify-start w-1/5 cursor-pointer"
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
          <article
            className="min-w-0 col-start-2 row-start-1 px-2 py-4 prose lg:prose-lg xl:prose-xl"
            data-pagefind-body
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></article>
          <div className="col-start-3 row-start-1 overflow-hidden xl:px-2 xl:py-4 xl:space-y-8 xl:border-l xl:border-gray-200 xl:my-4">
            <div className="hidden xl:block">
              <Backlinks {...props} />
              <div id="graphview"></div>
            </div>
          </div>
        </div>
      </body>
      <script type="module" src="/clientsidejs/sidebar.tsx"></script>
      <script type="module" src="/clientsidejs/menubar.tsx"></script>
      <script type="module" src="/clientsidejs/graphview.tsx"></script>
    </html>
  );
};

export default Layout;
