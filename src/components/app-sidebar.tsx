import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'
import { logout } from '@/services/user.service'
import { Home, LogOut, ShoppingCart, User } from 'lucide-react'
import * as React from 'react'

import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'

const items = [
  {
    title: 'Users',
    url: '/admin/dashboard/users',
    icon: User
  },
  {
    title: 'Products',
    url: '/admin/dashboard/products',
    icon: ShoppingCart
  }
]

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center">
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Dashboard Admin</span>
                  <span className="capitalize">admin</span>
                </div>
              </Link>
            </SidebarMenuButton>
            <form
              action={async () => {
                'use server'
                await logout()
              }}
            >
              <Button type="submit" variant="ghost" size="icon" className="flex-shrink-0">
                <LogOut />
              </Button>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <div className="mt-4">
            <ModeToggle />
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
