"use client";

import * as React from "react";
import {
  LayoutDashboard,
  BarChart3,
  ImageIcon,
  MessageSquare,
  FileText,
  HelpCircle,
  Settings,
  Plus,
  ChevronDown,
  Link2,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

const businesses = [
  {
    name: "The Urban Café",
    category: "Coffee Shop",
    avatar:
      "https://api.dicebear.com/7.x/initials/svg?seed=UC&backgroundColor=6366f1",
  },
  {
    name: "Downtown Bakery",
    category: "Bakery",
    avatar:
      "https://api.dicebear.com/7.x/initials/svg?seed=DB&backgroundColor=8b5cf6",
  },
  {
    name: "City Fitness",
    category: "Gym",
    avatar:
      "https://api.dicebear.com/7.x/initials/svg?seed=CF&backgroundColor=10b981",
  },
];

const mainNav = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/profile",
    isActive: true,
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/profile/analytics",
  },
  {
    title: "Reviews",
    icon: MessageSquare,
    href: "/profile/reviews",
    badge: "3",
  },
  {
    title: "Review Link",
    icon: Link2,
    href: "/review-link",
  },
  {
    title: "Photos",
    icon: ImageIcon,
    href: "/profile/photos",
  },
  {
    title: "Posts",
    icon: FileText,
    href: "/profile/posts",
  },
  {
    title: "Q&A",
    icon: HelpCircle,
    href: "/profile/qna",
    badge: "1",
  },
];

const secondaryNav = [
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function GBPSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [selectedBusiness, setSelectedBusiness] = React.useState(businesses[0]);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/40"
      {...props}
    >
      <SidebarHeader className="pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent/50 data-[state=open]:text-sidebar-accent-foreground rounded-xl"
                >
                  <Avatar className="h-7 w-7 rounded-lg">
                    <AvatarImage
                      src={selectedBusiness.avatar}
                      alt={selectedBusiness.name}
                    />
                    <AvatarFallback className="rounded-lg text-xs">
                      {selectedBusiness.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-[13px] leading-tight">
                    <span className="truncate font-medium">
                      {selectedBusiness.name}
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground/70">
                      {selectedBusiness.category}
                    </span>
                  </div>
                  <ChevronDown className="ml-auto size-3.5 text-muted-foreground/50" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border-border/50"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                {businesses.map((business) => (
                  <DropdownMenuItem
                    key={business.name}
                    onClick={() => setSelectedBusiness(business)}
                    className="gap-2 p-2 rounded-lg"
                  >
                    <Avatar className="h-6 w-6 rounded-md">
                      <AvatarImage src={business.avatar} alt={business.name} />
                      <AvatarFallback className="rounded-md text-xs">
                        {business.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium">
                        {business.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground/70">
                        {business.category}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-border/40" />
                <DropdownMenuItem className="gap-2 p-2 rounded-lg">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md border border-dashed border-border/60">
                    <Plus className="h-3.5 w-3.5 text-muted-foreground/60" />
                  </div>
                  <span className="text-[13px] font-medium text-muted-foreground">
                    Add Business
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-medium text-muted-foreground/50 uppercase tracking-wider px-2">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                    className="rounded-lg h-9 text-[13px] text-muted-foreground/80 hover:text-foreground hover:bg-accent/50 data-[active=true]:bg-accent/60 data-[active=true]:text-foreground"
                  >
                    <a href={item.href}>
                      <item.icon className="h-4! w-4!" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto flex h-4.5 min-w-4.5 px-1 items-center justify-center rounded-md bg-muted text-[10px] font-medium text-muted-foreground">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="rounded-lg h-9 text-[13px] text-muted-foreground/70 hover:text-foreground hover:bg-accent/50"
                  >
                    <a href={item.href}>
                      <item.icon className="h-4! w-4!" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/30 pt-2">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
