'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, FileText, Zap, Users, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lemon-50">
      {/* Announcement Banner */}
      <div className="bg-lemon-600 text-white py-3 px-4 text-center">
        <div className="container mx-auto">
          <p className="text-sm font-medium">
            🎉 New Feature: AI-Powered Resume Analysis Now Available!
            <Link href="/features" className="ml-2 underline hover:text-lemon-100">
              Learn more →
            </Link>
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-lemon-600" />
              <span className="text-2xl font-bold text-gray-900">Resumint</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/templates" className="text-gray-700 hover:text-lemon-600 font-medium transition-colors">
                Templates
              </Link>
              <Link href="/portfolio" className="text-gray-700 hover:text-lemon-600 font-medium transition-colors">
                Portfolio
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-lemon-600 font-medium transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-lemon-600 font-medium transition-colors">
                About
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-lemon-50 hover:text-lemon-700">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-lemon-600 hover:bg-lemon-700 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-lemon-100 text-lemon-800 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">60+ Unique Resume Templates</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Don't type,{' '}
              <span className="relative inline-block">
                <span className="relative z-10">just create</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 4 100 2 150 6C200 10 250 8 298 4"
                    stroke="#9CCC65"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto font-semibold">
              The AI-powered resume builder that turns your experience into a 
              perfectly formatted, ATS-friendly resume in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/templates">
                <Button size="lg" className="bg-lemon-600 hover:bg-lemon-700 text-white text-lg px-8 py-6">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create Resume
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-lemon-600 text-lemon-700 hover:bg-lemon-50 text-lg px-8 py-6">
                  View Examples
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-500">
              Free to start • 60+ templates • LinkedIn import • No credit card required
            </p>
          </motion.div>

          {/* Hero Animation Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-lemon-200">
              <div className="bg-gradient-to-br from-lemon-50 to-lime-50 p-8 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-24 w-24 text-lemon-600 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg font-medium">
                    Your resume preview will appear here
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-lemon-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">60+</div>
              <div className="text-lemon-100">Unique Templates</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-lemon-100">Portfolio Designs</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-lemon-100">Resumes Created</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">4.9★</div>
              <div className="text-lemon-100">User Rating</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Resumint is made{' '}
              <span className="text-lemon-600">for you</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a professional resume that stands out
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="AI Auto-Formatting"
              description="Smart AI automatically formats your content into clean, professional layouts"
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8" />}
              title="60+ Templates"
              description="Every template is unique with different styles, colors, and layouts"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="LinkedIn Import"
              description="Import your LinkedIn profile data instantly to save time"
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8" />}
              title="ATS-Friendly"
              description="All templates are optimized to pass Applicant Tracking Systems"
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-8 w-8" />}
              title="Real-time Preview"
              description="See your changes instantly with live preview as you edit"
            />
            <FeatureCard
              icon={<Star className="h-8 w-8" />}
              title="Portfolio Builder"
              description="Create stunning portfolio websites alongside your resume"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-lemon-500 to-lime-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start building your dream resume
            </h2>
            <p className="text-xl mb-8 text-lemon-50">
              Join thousands of professionals who landed their dream jobs with Resumint
            </p>
            <Link href="/templates">
              <Button size="lg" className="bg-white text-lemon-700 hover:bg-lemon-50 text-lg px-8 py-6">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-4 text-lemon-100 text-sm">
              No credit card required • Free templates available
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-rose-100 via-pink-100 to-orange-100 text-slate-900 py-16 overflow-hidden">
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6 text-emerald-700 drop-shadow" />
                <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Resumint</span>
              </div>
              <p className="text-sm font-medium text-slate-700">
                Professional resume builder trusted by thousands worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><Link href="/templates" className="hover:text-slate-900 transition font-medium">Templates</Link></li>
                <li><Link href="/portfolio" className="hover:text-slate-900 transition font-medium">Portfolio</Link></li>
                <li><Link href="/pricing" className="hover:text-slate-900 transition font-medium">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><Link href="/about" className="hover:text-slate-900 transition font-medium">About</Link></li>
                <li><Link href="/blog" className="hover:text-slate-900 transition font-medium">Blog</Link></li>
                <li><Link href="/support" className="hover:text-slate-900 transition font-medium">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><Link href="/privacy" className="hover:text-slate-900 transition font-medium">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-slate-900 transition font-medium">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-rose-200 pt-8 text-center text-sm">
            <p className="font-medium text-slate-700">© {new Date().getFullYear()} Resumint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-xl border-2 border-lemon-200 hover:border-lemon-400 hover:shadow-xl transition-all duration-300"
    >
      <div className="bg-lemon-100 text-lemon-700 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
