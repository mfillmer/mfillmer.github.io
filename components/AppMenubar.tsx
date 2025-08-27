import {
  Menubar,
  MenubarSeparator,
  MenubarItem,
  MenubarContent,
  MenubarTrigger,
  MenubarShortcut,
  MenubarMenu,
} from "./ui/menubar";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { navigate } from "../lib/utils";

export function AppMenubar() {
  return (
    <Menubar className="sticky top-0 left-0 h-menubar-height-mobile sm:h-menubar-height">
      <NavigationMenu>
        <NavigationMenuItem className="flex flex-row items-baseline">
          <Button
            onClick={() => navigate("/")}
            variant="secondary"
            className="w-full text-center"
          >
            <h2>My Digital Playground</h2>
          </Button>
        </NavigationMenuItem>
      </NavigationMenu>
    </Menubar>
  );
}
