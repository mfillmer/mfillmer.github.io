import React from "react";
import { createRoot } from "react-dom/client";
const Sidebar = () => <>Sidebar from React</>;

const domNode = document.querySelector("#sidebar");
if (domNode) {
  console.log("domNode is set");
  const root = createRoot(domNode);
  root.render(<Sidebar />);
}
