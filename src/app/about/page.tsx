"use client"

import { motion } from "framer-motion"
import { User, Target, Lightbulb, Sparkles, CheckCircle, HelpCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-blue-50 dark:from-neutral-950 dark:via-purple-950/20 dark:to-blue-950/20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <img 
              src="https://xerothermic-beige-i5tbo3rmdi.edgeone.dev/resumint.png"
              alt="Resumint Logo"
              className="h-24 w-24 mx-auto mb-6 rounded-2xl shadow-2xl"
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Resumint
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto">
              Empowering job seekers with AI-powered tools to create stunning resumes and portfolios
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 md:p-12 bg-white/50 dark:bg-neutral-900/50 backdrop-blur">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                  <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    At Resumint, we envision a world where everyone has access to professional-grade career tools, 
                    regardless of their background or budget. We believe that your dream job shouldn't be out of reach 
                    because of an outdated resume or lack of a portfolio. Our mission is to democratize career success 
                    by providing AI-powered tools that level the playing field.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            How Resumint Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 text-center hover:shadow-2xl transition-all hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-950/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            Key Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white/70 dark:bg-neutral-900/70 p-6 rounded-xl backdrop-blur"
              >
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                  <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-2">{faq.question}</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">{faq.answer}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <User className="h-20 w-20 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Meet the Creator</h2>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-3xl font-bold mb-2">Fahad Khan</h3>
              <p className="text-xl opacity-90 mb-4">Full Stack Developer & AI Enthusiast</p>
              <p className="text-lg opacity-80 leading-relaxed">
                Passionate about building tools that make a difference in people's careers. 
                Resumint was born from the belief that everyone deserves access to professional-grade 
                career tools, powered by the latest in AI technology.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const steps = [
  {
    title: "Sign Up & Enter Details",
    description: "Create your account and fill in your professional information, or import from LinkedIn."
  },
  {
    title: "Choose a Template",
    description: "Select from 50+ resume templates or let AI generate a unique portfolio for you."
  },
  {
    title: "Download & Share",
    description: "Export your resume as PDF/DOC and share your portfolio website instantly."
  }
]

const features = [
  {
    title: "50+ Professional Templates",
    description: "Industry-specific resume templates designed by experts"
  },
  {
    title: "AI-Powered Generation",
    description: "Let AI create personalized content based on your profile"
  },
  {
    title: "25+ Portfolio Designs",
    description: "Unique portfolio websites generated for every user"
  },
  {
    title: "Instant PDF & DOC Export",
    description: "Download in multiple formats with one click"
  },
  {
    title: "ATS Optimization",
    description: "Templates optimized for Applicant Tracking Systems"
  },
  {
    title: "LinkedIn Integration",
    description: "Import your profile data directly from LinkedIn"
  },
  {
    title: "Real-Time Preview",
    description: "See changes instantly as you edit"
  },
  {
    title: "Prompt-Based Editing",
    description: "Use natural language to modify your portfolio"
  }
]

const faqs = [
  {
    question: "Is Resumint really free?",
    answer: "Yes! We offer a generous free tier with access to basic templates and features. Premium plans unlock advanced AI features, more templates, and unlimited exports."
  },
  {
    question: "How does the AI portfolio generator work?",
    answer: "Our AI analyzes your profession, skills, and preferences to generate a unique portfolio website tailored to your industry. You can further customize it using natural language prompts."
  },
  {
    question: "Can I use my resume for ATS systems?",
    answer: "Absolutely! All our templates are ATS-optimized, meaning they're designed to pass through Applicant Tracking Systems used by most companies."
  },
  {
    question: "How do I import from LinkedIn?",
    answer: "Simply connect your LinkedIn account in your dashboard, and we'll automatically import your work experience, education, and skills."
  },
  {
    question: "What export formats are supported?",
    answer: "You can export your resume in PDF and DOC formats. Portfolio websites are hosted on our platform with a shareable link."
  }
]
