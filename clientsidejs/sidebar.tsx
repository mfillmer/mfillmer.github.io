import React from "react";
import { createRoot } from "react-dom/client";
import { Sidebar } from "../components/Sidebar";

const domNode = document.querySelector("#sidebar");
if (domNode) {
  const root = createRoot(domNode);
  root.render(<Sidebar str="client" />);
}
