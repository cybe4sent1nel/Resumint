"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FileText, Globe, Download, Plus, TrendingUp, Star, Settings, LogOut, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user")
      if (!res.ok) {
        router.push("/login")
        return
      }
      const data = await res.json()
      setUser(data.user)
    } catch (error) {
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }
  
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-neutral-950 dark:via-purple-950/20 dark:to-blue-950/20">
      {/* Header */}
      <header className="border-b border-purple-200 dark:border-purple-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            ResumINT Dashboard
          </h1>
          <div className="flex items-center gap-4">
              <div className="text-right">
               <div className="flex items-center gap-2">
                  <p className="font-semibold">{user?.name}</p>
                 {user?.adminRole && user.adminRole !== 'NONE' && (
                   <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-xs font-semibold rounded">
                     {user.adminRole.replace('_', ' ')}
                   </span>
                 )}
               </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{user?.plan || "FREE"} Plan</p>
              </div>
              {user?.adminRole && user.adminRole !== 'NONE' && (
                <Link href="/admin">
                  <Button variant="outline" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back, {user?.name?.split(" ")[0]}! 👋
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Ready to create something amazing today?
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Credits Available</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{user?.credits || 0}</div>
                <p className="text-xs text-neutral-500 mt-1">
                  <Link href="/pricing" className="text-purple-600 hover:underline">
                    Get more credits
                  </Link>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Resumes Created</CardTitle>
                <FileText className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-xs text-neutral-500 mt-1">Create your first resume</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Portfolios Created</CardTitle>
                <Globe className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-xs text-neutral-500 mt-1">Build your portfolio website</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500 cursor-pointer group">
              <div className="flex flex-col">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Create Resume</h4>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm flex-1">
                  Choose from 50+ professional templates
                </p>
                <Link href="/templates">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                    Get Started <Plus className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500 cursor-pointer group">
              <div className="flex flex-col">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                  <Linkedin className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Import from LinkedIn</h4>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm flex-1">
                  Auto-fill resume from your profile
                </p>
                <Link href="/import/linkedin">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                    Import Now <Download className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-2 hover:border-indigo-500 cursor-pointer group">
              <div className="flex flex-col">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Build Portfolio</h4>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm flex-1">
                  Create your portfolio website
                </p>
                <Link href="/portfolio">
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
                    Create Site <Globe className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-neutral-400 mb-4">
                <TrendingUp className="h-16 w-16 mx-auto mb-4" />
              </div>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                No activity yet. Start by creating your first resume or portfolio!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
