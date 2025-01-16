import { Hammer, Send } from 'lucide-react'
import React from 'react'

export default async function Page() {
  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-md border bg-card text-card-foreground shadow">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <div className="text-sm font-medium tracking-tight">Total Projects</div>
            <Hammer size={20} />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </div>
        </div>
        <div className="rounded-md border bg-card text-card-foreground shadow">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <div className="text-sm font-medium tracking-tight">Total Contacts</div>
            <Send size={20} />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+0 from last month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
