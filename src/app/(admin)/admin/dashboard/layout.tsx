import { AppSidebar } from '@/components/app-sidebar'
import BreadcrumbRoute from '@/components/breadcrumb-route'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full">
        <div className="fixed z-50 flex w-full items-center gap-2 bg-background p-4">
          <SidebarTrigger />
          <BreadcrumbRoute />
        </div>
        <div className="px-6 py-16">{children}</div>
      </main>
    </SidebarProvider>
  )
}
