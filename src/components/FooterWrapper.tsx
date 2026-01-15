'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export function FooterWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  if (isAdminPage) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      <footer className="relative bg-gradient-to-r from-rose-100 via-pink-100 to-orange-100 text-slate-900 py-16 mt-20 overflow-hidden">
        {/* Subtle gradient overlay for elegance */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://xerothermic-beige-i5tbo3rmdi.edgeone.dev/resumint.png" 
                  alt="Resumint" 
                  className="h-8 w-8 rounded shadow-lg"
                  width={32}
                  height={32}
                />
                <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Resumint</span>
              </div>
              <p className="text-slate-700 font-medium">AI-powered resume and portfolio builder for your dream career.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Product</h4>
              <ul className="space-y-2 text-slate-700">
                <li><a href="/#features" className="hover:text-slate-900 transition font-medium">Features</a></li>
                <li><a href="/templates" className="hover:text-slate-900 transition font-medium">Templates</a></li>
                <li><a href="/pricing" className="hover:text-slate-900 transition font-medium">Pricing</a></li>
                <li><a href="/demo" className="hover:text-slate-900 transition font-medium">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Company</h4>
              <ul className="space-y-2 text-slate-700">
                <li><a href="/about" className="hover:text-slate-900 transition font-medium">About</a></li>
                <li><a href="/contact" className="hover:text-slate-900 transition font-medium">Contact</a></li>
                <li><a href="/privacy" className="hover:text-slate-900 transition font-medium">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Support</h4>
              <ul className="space-y-2 text-slate-700">
                <li><a href="/help" className="hover:text-slate-900 transition font-medium">Help Center</a></li>
                <li><a href="/docs" className="hover:text-slate-900 transition font-medium">Documentation</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-rose-200 mt-8 pt-8 text-center text-slate-700">
            <p className="font-medium">&copy; 2026 Resumint. Created by Fahad Khan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
