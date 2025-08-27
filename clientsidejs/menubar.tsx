import React from "react";
import { createRoot } from "react-dom/client";
import { AppMenubar } from "../components/AppMenubar";

const domNode = document.querySelector("#menubar");
if (domNode) {
  const root = createRoot(domNode);
  root.render(<AppMenubar />);
  console.info("Initialized menubar");
}
