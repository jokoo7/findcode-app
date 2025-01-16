import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4">
        <SidebarTrigger />
        <div className="px-2 py-4">{children}</div>
      </main>
    </SidebarProvider>
  )
}
