import React from "react";
import { createRoot } from "react-dom/client";
const Sidebar = () => <div className="font-bold">Sidebar from React</div>;

const domNode = document.querySelector("#sidebar");
if (domNode) {
  const root = createRoot(domNode);
  root.render(<Sidebar />);
}
