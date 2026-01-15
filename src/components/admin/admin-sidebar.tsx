"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Globe, 
  CreditCard, 
  Settings, 
  Palette,
  ShieldAlert,
  Mail,
  BarChart3,
  UserCog,
  DollarSign
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  userRole: string
}

export function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Resumes', href: '/admin/resumes', icon: FileText },
    { name: 'Portfolios', href: '/admin/portfolios', icon: Globe },
    { name: 'Templates', href: '/admin/templates', icon: Palette },
    { name: 'Pricing', href: '/admin/pricing', icon: DollarSign, adminOnly: true },
    { name: 'Transactions', href: '/admin/transactions', icon: CreditCard },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Email Queue', href: '/admin/emails', icon: Mail },
    { name: 'Admin Users', href: '/admin/admins', icon: UserCog, adminOnly: true },
    { name: 'Security', href: '/admin/security', icon: ShieldAlert, superAdminOnly: true },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-white dark:bg-gray-800 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          // Check role restrictions
          if (item.superAdminOnly && userRole !== 'SUPER_ADMIN') return null
          if (item.adminOnly && !['ADMIN', 'SUPER_ADMIN'].includes(userRole)) return null

          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
