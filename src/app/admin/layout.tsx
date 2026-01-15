import { getCurrentUser, hasAdminRole } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }
  
  if (user.adminRole === 'NONE') {
    redirect('/dashboard')
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminSidebar userRole={user.adminRole} />
        <main className="flex-1 p-8 ml-64 min-h-[calc(100vh-5rem)]">
          {children}
        </main>
      </div>
    </div>
  )
}
