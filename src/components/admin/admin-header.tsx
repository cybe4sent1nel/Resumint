"use client"

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, LogOut, Shield } from 'lucide-react'
import Link from 'next/link'

interface AdminHeaderProps {
  user: {
    name: string | null
    email: string
    adminRole: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur dark:bg-gray-900/95">
      <div className="flex h-16 items-center px-8">
        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
          <Shield className="h-6 w-6 text-blue-600" />
          <span>Resumint</span>
          <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">ADMIN</span>
        </Link>

        <div className="flex-1" />

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Button>

          {/* Admin Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30">
            <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-300">
              {user.adminRole.replace('_', ' ')}
            </span>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={undefined} />
              <AvatarFallback>
                {user.name?.charAt(0)?.toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {/* Logout */}
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
