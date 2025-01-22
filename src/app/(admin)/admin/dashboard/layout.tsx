import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full">
        <div className="fixed z-50 w-full bg-background p-4">
          <SidebarTrigger />
        </div>
        <div className="px-6 py-16">{children}</div>
      </main>
    </SidebarProvider>
  )
}
