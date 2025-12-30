import { Coffee } from "lucide-react";
import { ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { NavUser } from "./sidebar-component/nav-user";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
interface AppSidebarProps {
  user: User;
  sidebarGroupItem: User[];
}

export function AppSidebar({ user, sidebarGroupItem }: AppSidebarProps) {
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
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
            >
              <CollapsibleTrigger>
                List User{" "}
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarGroupItem.map((item: any) => (
                    <SidebarMenuSub key={item.id}>
                      <SidebarMenuSubButton asChild>
                        <a href={`/homepage/${item.id}`}>
                          {item.first_name} {item.last_name}
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <NavUser data={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
