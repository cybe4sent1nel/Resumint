"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, FileText, Globe, Zap, Shield, Download, Star, ArrowRight, Users, TrendingUp, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LottieAnimation } from "@/components/animations"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-purple-50 to-blue-50 dark:from-neutral-950 dark:via-purple-950/20 dark:to-blue-950/20">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800" />
        
        {/* Animated Background - Task Assigning Animation (Right Side) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-60 dark:opacity-40 pointer-events-none hidden lg:flex items-center justify-end">
          <div className="w-full h-96 max-w-md">
            <LottieAnimation
              animationPath="/animations/Task Assigning.json"
              className="w-full h-full"
            />
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight lg:leading-snug mx-auto max-w-6xl"
          >
            Build Your Dream Career with AI-Powered Resumes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-center text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto mt-8"
          >
            Create stunning resumes and portfolio websites in minutes with our AI assistant. 
            50+ templates, instant PDF export, and personalized designs.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12 flex-wrap"
            suppressHydrationWarning
          >
            <Link href="/generate-resume">
              <Button size="lg" className="btn-primary px-8 py-6 text-lg font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Generate Resume with AI
              </Button>
            </Link>
            <Link href="/generate-portfolio">
              <Button size="lg" className="btn-primary px-8 py-6 text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Build Portfolio with AI
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" className="btn-secondary px-8 py-6 text-lg font-semibold flex items-center gap-2">
                Browse Templates
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            ))}
            <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">
              Trusted by 10,000+ professionals
            </span>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Everything You Need to Stand Out
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Powerful features designed to help you create professional resumes and portfolios
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500 hover:-translate-y-2 bg-white/50 dark:bg-neutral-900/50 backdrop-blur">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-lg">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with Animation */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Get your professional resume ready in just 3 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <LottieAnimation
                animationPath="/animations/Programming.json"
                className="w-full h-96"
              />
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Choose Your Template",
                  description: "Select from 50+ professionally designed resume templates and 25+ portfolio designs"
                },
                {
                  step: "02",
                  title: "AI-Powered Generation",
                  description: "Our AI analyzes your profile and generates personalized content tailored to your career goals"
                },
                {
                  step: "03",
                  title: "Download & Apply",
                  description: "Export your resume in PDF or DOC format and start applying to your dream jobs"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold text-2xl w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-950/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Trusted by Professionals Worldwide
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400">
                Join thousands of successful professionals who have landed their dream jobs using our platform
              </p>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-lg border-2 border-purple-200 dark:border-purple-800"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400 font-semibold">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <LottieAnimation
                animationPath="/animations/Team.json"
                className="w-full h-96"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Everything You Need to Stand Out
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Powerful features designed to help you create professional resumes and portfolios
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500 hover:-translate-y-2 bg-white/50 dark:bg-neutral-900/50 backdrop-blur">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-lg">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-950/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              50+ Resume Templates
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              25+ Portfolio Designs
            </h3>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto">
              Every template is fully customizable and ATS-optimized. Our AI generates unique portfolio designs tailored to your profession.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <LottieAnimation
                animationPath="/animations/Startup.json"
                className="w-full h-80"
              />
            </motion.div>

            <div className="space-y-4">
              {[
                "50+ Professional Resume Templates",
                "25+ Stunning Portfolio Designs",
                "100% ATS-Optimized Formats",
                "Instant PDF & DOC Export",
                "Fully Customizable Layouts",
                "Mobile-Responsive Designs"
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-md"
                >
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg font-semibold">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Animation */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Join thousands of satisfied professionals who transformed their careers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <LottieAnimation
                animationPath="/animations/Company employees sharing thoughts and ideas.json"
                className="w-full h-96"
              />
            </motion.div>

            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-2 border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-white"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Build Your Future?
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Join thousands of professionals who landed their dream jobs
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-neutral-100 px-10 py-7 text-xl font-semibold shadow-2xl">
                  Start Creating Now - It's Free
                  <Zap className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <LottieAnimation
                animationPath="/animations/saas cloud.json"
                className="w-full h-96"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Let AI create personalized resumes and portfolios based on your unique profile and career goals.",
  },
  {
    icon: FileText,
    title: "50+ Resume Templates",
    description: "Choose from professionally designed templates for every industry and career level.",
  },
  {
    icon: Globe,
    title: "25+ Portfolio Templates",
    description: "Showcase your work with stunning, responsive portfolio websites generated by AI.",
  },
  {
    icon: Download,
    title: "Instant PDF & DOC Export",
    description: "Download your resume in multiple formats with a single click. Print-ready and ATS-friendly.",
  },
  {
    icon: Zap,
    title: "Real-Time Preview",
    description: "See changes instantly as you edit. WYSIWYG editor with live preview functionality.",
  },
  {
    icon: Shield,
    title: "ATS Optimization",
    description: "Our templates are optimized for Applicant Tracking Systems to improve your chances.",
  },
]

const stats = [
  { value: "10K+", label: "Happy Users" },
  { value: "50K+", label: "Resumes Created" },
  { value: "98%", label: "Success Rate" },
  { value: "24/7", label: "Support" },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    text: "This platform helped me land my dream job at Google! The AI-generated resume was professional and perfectly tailored to the role."
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    text: "The portfolio builder is amazing! I created a stunning website in minutes that really showcased my projects and skills."
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    text: "Best investment I've made in my career. The templates are beautiful and the customization options are endless."
  }
]
