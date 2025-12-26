import { Coffee } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./sidebar-component/nav-user";

interface AppSidebarProps {
  data: {
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    // Add other properties of data if they are used
  };
}

export function AppSidebar({ data }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
                <a href="/homepage">
                  <Coffee className="size-5!" />
                  <span className="text-base font-semibold">My Coffee</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter>
        <NavUser data={data} />
      </SidebarFooter>
    </Sidebar>
  );
}
