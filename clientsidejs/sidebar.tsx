import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const domNode = document.querySelector('#sidebar')
if (domNode) {
  const root = createRoot(domNode)
  root.render(
    <SidebarProvider
      className='md:min-h-[calc(100svh-var(--top-menubar-height))] min-h-[calc(100svh-var(--top-menubar-height-mobile))]
    '
    >
      <AppSidebar />
      <SidebarTrigger className='ml-1.5 fixed m-3 md:m-0 bg-white border border-gray-200 rounded-lg md:relative md:border-0' />
    </SidebarProvider>,
  )

  console.info('Initialized sidebar')
}
