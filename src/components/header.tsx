'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ProfileMenu } from './profile-menu'

interface User {
  id: string
  email: string
  name: string
  adminRole: string
}

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/profile', {
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
    } finally {
      setLoading(false)
    }
  }

  const isAdmin = user?.adminRole && ['ADMIN', 'SUPER_ADMIN'].includes(user.adminRole)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Resumint Home">
          <img 
            src="https://xerothermic-beige-i5tbo3rmdi.edgeone.dev/resumint.png" 
            alt="Resumint Logo - AI Resume Builder" 
            className="h-10 w-10 rounded-lg"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Resumint
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/#features" className="text-neutral-700 dark:text-neutral-300 hover:text-purple-600 transition">
            Features
          </Link>
          <Link href="/templates" className="text-neutral-700 dark:text-neutral-300 hover:text-purple-600 transition">
            Templates
          </Link>
          <Link href="/portfolio" className="text-neutral-700 dark:text-neutral-300 hover:text-purple-600 transition">
            Portfolio
          </Link>
          <Link href="/pricing" className="text-neutral-700 dark:text-neutral-300 hover:text-purple-600 transition">
            Pricing
          </Link>
          <Link href="/about" className="text-neutral-700 dark:text-neutral-300 hover:text-purple-600 transition">
            About
          </Link>
          <Link href="/contact" className="text-neutral-700 dark:text-neutral-300 hover:text-purple-600 transition">
            Contact
          </Link>

          <div className="flex items-center gap-3">
            {!loading && user ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-sm px-3 py-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <ProfileMenu user={user} />
              </>
            ) : (
              <>
                <Link href="/login" className="text-neutral-700 dark:text-neutral-300 hover:text-purple-600 transition">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
