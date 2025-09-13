import React from "react";
import { createRoot } from "react-dom/client";
import { GraphView } from "../components/GraphView";

const domNode = document.querySelector("#graphview");
if (domNode) {
  const root = createRoot(domNode);
  root.render(
    <div className="prose">
      <h3>Graph View</h3>
      <div className="max-w-full mx-2 overflow-hidden border border-gray-200 rounded">
        <GraphView />
      </div>
    </div>
  );

  console.info("Initialized graphview");
}
