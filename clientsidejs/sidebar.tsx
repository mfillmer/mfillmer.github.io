import React from "react";
import { createRoot } from "react-dom/client";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const domNode = document.querySelector("#sidebar");
if (domNode) {
  const root = createRoot(domNode);
  root.render(
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="ml-1.5" />
    </SidebarProvider>
  );

  console.info("Initialized sidebar");
}
