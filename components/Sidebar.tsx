import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "./ui/sidebar";
import React from "react";
import { Button } from "./ui/button";
import { navigate } from "@/lib/utils";
import { HomeIcon } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-baseline">
        <Button
          onClick={() => navigate("/")}
          variant="secondary"
          size="icon"
          className="size-8"
        >
          <HomeIcon />
        </Button>
        <h2>My Digital Playground</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
