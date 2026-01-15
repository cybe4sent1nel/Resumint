'use client'

import { usePathname } from 'next/navigation'
import { Header } from './header'
import { ReactNode } from 'react'

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminPage && <Header />}
      <div className={!isAdminPage ? 'pt-20' : ''}>
        {children}
      </div>
    </>
  )
}
