"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FileText, Search, Filter, Star, Zap, Code, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { uniqueTemplates, uniqueTemplateCategories } from "@/lib/unique-templates"
import { TemplatePreview } from "@/components/TemplatePreview"

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredTemplates = uniqueTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 min-h-screen py-20" style={{
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(197, 225, 165, 0.05) 100%)'
    }} suppressHydrationWarning>
        {/* Quick Action Buttons */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-3 justify-center mb-8 flex-wrap"
          suppressHydrationWarning
        >
          <Link href="/generate-resume">
            <Button className="btn-primary flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Generate Resume with AI
            </Button>
          </Link>
          <Link href="/generate-portfolio">
            <Button className="btn-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Build Portfolio with AI
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
          suppressHydrationWarning
        >
          <h1 className="heading-h2 mb-6 text-gray-900">
            60+ Unique Resume Templates
          </h1>
          <p className="body-large text-gray-600 max-w-3xl mx-auto">
            Each template features a unique design, color scheme, and layout. Choose the one that matches your professional style.
          </p>
          <div className="accent-line mx-auto w-24 mt-6"></div>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search templates..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {uniqueTemplateCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.5) }}
              className="h-full"
              suppressHydrationWarning
            >
              <Card className="card-wispr overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full border-l-4" style={{borderLeftColor: template.colorScheme.primary}}>
                <div className="bg-white p-6 overflow-hidden flex-shrink-0" style={{backgroundColor: template.colorScheme.background}}>
                  <TemplatePreview template={template} isHovered={false} />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="heading-h3 mb-2 text-gray-900">{template.name}</h3>
                  <p className="body-small text-gray-600 mb-4 line-clamp-2 flex-1">{template.description}</p>
                  
                  <div className="flex items-center justify-between text-xs mb-4 pb-4 border-b border-lemon-100">
                    <span className="font-semibold px-3 py-1 rounded-full bg-lemon-100 text-lemon-700">{template.category}</span>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-500 font-semibold">ATS: {template.atsScore}%</span>
                    </div>
                  </div>
                  
                  <Link href={`/editor/resume/${template.id}`} className="w-full mt-auto">
                    <Button className="btn-primary w-full text-sm font-semibold">
                      Use Template
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              No templates found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
  )
}
