
import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/sidebarcomponents/sidebar"

import { adminRoutes } from "@/routes/adminRoute"
import { customerRoutes } from "@/routes/customerRoute"

import { Route } from "../../../types"
import { sellerRoutes } from "@/routes/sellerRoute"
import Link from "next/link"





// This is sample data.


export function AppSidebar({user,  ...props }: {user :{role :string} | null & React.ComponentProps<typeof Sidebar>}) {
  let routes :Route[]  = [] 
  
  // Handle null user or missing role
  if (!user || !user.role) {
    routes = [];
  } else {
    switch(user.role){
      case "admin":
      routes = adminRoutes
      break;
      case "customer" : 
      routes = customerRoutes
      break
      case "seller" : 
      routes = sellerRoutes
      break
      default :
      routes=[]
       break
    }
  }
  
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
            
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {routes.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
