"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { LottieAnimation } from "@/components/animations"
import {
  Send,
  Loader2,
  MessageCircle,
  Sparkles,
  Layout,
  Code,
  Palette,
  Settings
} from "lucide-react"
import Link from "next/link"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Portfolio {
  title: string
  description: string
  sections: string[]
  design: string
  colorScheme: string
}

type PortfolioResponse = {
  response: string
  config: Portfolio | null
}

export default function GeneratePortfolioPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm here to help you create a stunning portfolio. Tell me about yourself - what's your profession, and what kind of portfolio design would you like? (Modern, Minimalist, Creative, etc.)",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [portfolioConfig, setPortfolioConfig] = useState<Portfolio | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      // Simulate AI response (in production, integrate with actual LLM)
      const { response, config } = await generatePortfolioResponse(input, messages)

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, assistantMessage])

      // Update portfolio config if generated
      if (config) {
        setPortfolioConfig(config)
      }
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Could you rephrase that?",
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const generatePortfolioResponse = async (
    userInput: string,
    conversationHistory: Message[]
  ): Promise<PortfolioResponse> => {

    // This would integrate with an LLM API (OpenAI, Anthropic, etc.)
    // For now, return templated responses

    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("design") || lowerInput.includes("template")) {
      return {
        response: `Great choice! I can help you with that. Here are some design options:

1. **Modern Portfolio** - Clean, minimalist design with dark/light modes
2. **Creative Portfolio** - Colorful with unique layouts and animations
3. **Professional** - Corporate style, perfect for executives
4. **Artistic** - Full-width images and bold typography

Which style appeals to you the most?`,
        config: null
      }
    }

    if (lowerInput.includes("modern") || lowerInput.includes("minimalist")) {
      return {
        response: `Perfect! I'm setting up a modern portfolio for you. Let me know:
- What's your profession/field?
- What projects should we showcase?
- Any specific colors you prefer?

I can then show you template options to choose from.`,
        config: {
          title: "Professional Portfolio",
          description: "Modern, clean design portfolio",
          sections: ["About", "Projects", "Skills", "Contact"],
          design: "modern",
          colorScheme: "blue-gray"
        }
      }
    }

    if (lowerInput.includes("creative") || lowerInput.includes("artistic")) {
      return {
        response: `Awesome! Creative portfolio coming right up. To make it truly yours:
- What type of creative work do you do? (Design, Art, Photography, etc.)
- Preferred color palette?
- Any specific features? (Animation, 3D, Interactive elements)

Once you decide, I'll show you some beautiful template options!`,
        config: {
          title: "Creative Portfolio",
          description: "Artistic, colorful design portfolio",
          sections: ["Gallery", "About", "Services", "Contact"],
          design: "creative",
          colorScheme: "rainbow"
        }
      }
    }

    if (lowerInput.includes("professional") || lowerInput.includes("corporate")) {
      return {
        response: `Excellent choice for a professional portfolio! To customize it:
- Your industry/role?
- Key services or expertise areas?
- Any specific tone? (Corporate, Friendly, Innovative)

Let me show you some professional templates that would be perfect for you.`,
        config: {
          title: "Executive Portfolio",
          description: "Professional corporate portfolio",
          sections: ["About", "Experience", "Services", "Contact"],
          design: "professional",
          colorScheme: "navy-gold"
        }
      }
    }

    // Default response
    return {
      response: `I understand. To help you better, could you tell me:
1. Your profession or field (Designer, Developer, Artist, etc.)
2. What kind of portfolio style interests you?
3. Any specific features you'd like? (Blog, Contact form, Shop, etc.)

This will help me suggest the best portfolio template for you!`,
      config: null
    }
  }

  const templateOptions = [
    {
      id: 1,
      name: "Minimalist",
      icon: Layout,
      color: "from-gray-500 to-gray-600"
    },
    {
      id: 2,
      name: "Developer",
      icon: Code,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 3,
      name: "Creative",
      icon: Palette,
      color: "from-pink-500 to-purple-600"
    },
    {
      id: 4,
      name: "Custom",
      icon: Settings,
      color: "from-emerald-500 to-teal-600"
    }
  ]

  const handleCreatePortfolio = () => {
    if (!selectedTemplate) {
      alert("Please select a template")
      return
    }

    const portfolioData = JSON.stringify({
      config: portfolioConfig,
      template: selectedTemplate,
      messages: messages
        .filter((m) => m.role === "user")
        .map((m) => m.content)
        .join(" | ")
    })

    window.location.href = `/portfolio-editor?data=${encodeURIComponent(portfolioData)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lemon-50 via-white to-lemon-50 py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(197, 225, 165, 0.05) 100%)'
    }}>
      {/* Animated Background - Right Side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-50 dark:opacity-30 pointer-events-none hidden lg:flex items-center justify-end">
        <div className="w-full h-96 max-w-sm">
          <LottieAnimation
            animationPath="/animations/generate potfolio.json"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
          suppressHydrationWarning
        >
          <h1 className="heading-h1 mb-4 text-gray-900">
            Build Your Portfolio with AI
          </h1>
          <p className="body-large text-gray-600 max-w-2xl mx-auto">
            Chat with our AI assistant to design a stunning portfolio that showcases your work
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Chat Interface */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
            suppressHydrationWarning
          >
            <Card className="card-wispr flex flex-col h-[600px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-none"
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                  >
                    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 flex gap-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-neutral-200 dark:border-neutral-700 p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Describe your portfolio vision..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !loading) handleSendMessage()
                    }}
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={loading || !input.trim()}
                    className="btn-primary"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Template Selection */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
            suppressHydrationWarning
          >
            <Card className="card-wispr accent p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Select Template</h3>
              </div>

              <div className="space-y-3">
                {templateOptions.map((template) => {
                  const IconComponent = template.icon
                  return (
                    <motion.button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        selectedTemplate === template.id
                          ? "bg-lemon-500 text-white"
                          : "bg-lemon-50 hover:bg-lemon-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5" />
                        <span className="font-semibold">{template.name}</span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </Card>

            {portfolioConfig && (
              <Card className="card-wispr accent p-6">
                <h3 className="font-semibold mb-4">Portfolio Config</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <label className="text-neutral-600 dark:text-neutral-400">Design:</label>
                    <p className="font-semibold capitalize">{portfolioConfig.design}</p>
                  </div>
                  <div>
                    <label className="text-neutral-600 dark:text-neutral-400">Colors:</label>
                    <p className="font-semibold capitalize">{portfolioConfig.colorScheme}</p>
                  </div>
                  <div>
                    <label className="text-neutral-600 dark:text-neutral-400">Sections:</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {portfolioConfig.sections.map((section, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCreatePortfolio}
                  disabled={!selectedTemplate}
                  className="btn-primary w-full mt-6"
                >
                  Create Portfolio
                </Button>
              </Card>
            )}

            {!portfolioConfig && (
              <Card className="card-wispr p-6 border-2 border-dashed">
                <MessageCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                  Tell the AI about your portfolio vision to get started
                </p>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Quick Start Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Or get started with our pre-made templates:
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/templates">
              <Button variant="outline" className="px-6">
                Resume Templates
              </Button>
            </Link>
            <Link href="/generate-resume">
              <Button variant="outline" className="px-6">
                Generate Resume
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
