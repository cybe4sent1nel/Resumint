# ResumINT - AI-Powered Resume & Portfolio Builder

<div align="center">
  <img src="public/resumint.svg" alt="ResumINT Logo" width="200" height="200" />
  
  **Create stunning resumes and portfolio websites in minutes with AI assistance.**
  
  [![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Latest-13AA52?logo=mongodb)](https://www.mongodb.com/)
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Admin Dashboard](#admin-dashboard)
- [AI Features](#ai-features)
- [User Roles & Permissions](#user-roles--permissions)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Developer](#developer)

---

## 🎯 Overview

**ResumINT** is a comprehensive SaaS platform for creating professional resumes and portfolio websites. Built with cutting-edge technologies, it combines intuitive UI/UX with powerful AI capabilities to help users craft compelling career materials.

### Key Highlights
- ✨ **AI-Powered Generation**: Automatically create resumes and portfolios from your online profiles
- 🎨 **50+ Professional Templates**: Choose from carefully designed, ATS-optimized templates
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🔒 **Secure & Private**: End-to-end encryption for sensitive user data
- 🚀 **Lightning Fast**: Optimized performance with Next.js and Turbopack
- 🌙 **Dark Mode**: Full dark mode support for comfortable viewing

---

## ⚡ Features

### For Users

#### Resume Builder
- **AI Resume Generation**: Extract data from LinkedIn, GitHub, personal websites, or paste content
- **Template Selection**: 50+ professionally designed, ATS-optimized templates
- **Real-time Preview**: See changes instantly as you edit
- **Smart Content Enhancement**: AI suggests improvements to language, metrics, and structure
- **Multiple Export Formats**: Download as PDF, DOCX, or plain text
- **Resume Analysis**: Get ATS scores, readability metrics, and improvement suggestions
- **Version Control**: Save and manage multiple resume versions

#### Portfolio Builder
- **AI Portfolio Generation**: Interactive AI-guided portfolio creation
- **Design Customization**: Modern, minimalist, or creative design options
- **Project Showcasing**: Highlight your best work with case studies
- **Custom Domain**: Publish your portfolio on a custom domain
- **SEO Optimization**: Built-in SEO for better discoverability
- **Analytics Dashboard**: Track portfolio views and visitor engagement
- **Responsive Design**: Auto-optimized for all devices

#### LinkedIn Integration
- **Profile Scraping**: Automatically extract LinkedIn profile information
- **Data Verification**: Review and edit extracted data before use
- **Rich Information Extraction**: Pull experience, education, skills, and endorsements

#### Additional Features
- **Email Verification**: Secure account with email verification
- **2FA Authentication**: Two-factor authentication for admin accounts
- **Credit System**: Pay-as-you-go model with credit-based features
- **Pricing Plans**: FREE, PRO, and ENTERPRISE options
- **Offline Support**: Continue working offline with service worker support
- **Dark Mode**: Complete dark mode support throughout the app

### For Admins

#### Admin Dashboard
- **Real-time Statistics**: Monitor users, resumes, portfolios, and revenue
- **User Management**: View, search, and manage all user accounts
- **Content Management**: Manage templates, pricing, and platform content
- **Security Features**: Configure 2FA, password policies, and IP whitelist
- **Email Queue Management**: Monitor email delivery status
- **Transaction History**: Track all credit transactions
- **Analytics & Reporting**: Detailed platform analytics and insights
- **Admin Audit Log**: Track all admin actions for security

#### Admin Features
- **Template Management**: Create and manage resume/portfolio templates
- **Pricing Management**: Configure subscription plans and pricing
- **Feedback Management**: View and respond to user feedback
- **Email Management**: Configure and monitor email queues
- **Content Management**: Update about, privacy, and company information
- **Security Settings**: Manage passwords, 2FA, and access policies

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.1 with App Router
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5.0+
- **Styling**: TailwindCSS 4 + PostCSS
- **Animations**: Framer Motion, Lottie
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React Hooks + TanStack Query
- **Components**: Radix UI, Headless UI

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: JWT + bcryptjs
- **Database**: MongoDB with Prisma ORM
- **Email**: Resend + Nodemailer templates
- **File Storage**: Vercel Blob + AWS S3 compatible storage
- **AI Integration**: OpenAI API for content generation

### Development Tools
- **Code Quality**: ESLint, Prettier
- **Package Manager**: npm
- **Build Tool**: Turbopack (Next.js 16)
- **Testing**: Jest, React Testing Library
- **Version Control**: Git
- **Deployment**: Vercel, Docker

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB database (local or cloud)
- OpenAI API key (for AI features)
- GitHub account (for OAuth - optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/resumint.git
cd resumint
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/resumebuilder

# Authentication
JWT_SECRET=your-secret-key-here
ADMIN_PASSWORD=ChangeMe@123456

# AI & Integrations
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...

# OAuth (optional)
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# File Storage
NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN=...

# Email
ADMIN_EMAIL=resumint.info@gmail.com
SUPPORT_EMAIL=resumint.info@gmail.com
```

4. **Set up database**
```bash
npx prisma generate
npx prisma db push
```

5. **Create admin account**
```bash
npm run setup-admin
```

6. **Start development server**
```bash
npm run dev
```

Visit http://localhost:3000 in your browser.

---

## 📁 Project Structure

```
resumint/
├── src/
│   ├── app/                          # Next.js app directory
│   │   ├── api/                     # API routes
│   │   │   ├── admin/               # Admin endpoints
│   │   │   ├── auth/                # Authentication endpoints
│   │   │   ├── user/                # User endpoints
│   │   │   └── ...
│   │   ├── admin/                   # Admin pages
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── resumes/
│   │   │   ├── portfolios/
│   │   │   ├── templates/
│   │   │   ├── transactions/
│   │   │   ├── analytics/
│   │   │   ├── security/
│   │   │   └── settings/
│   │   ├── dashboard/               # User dashboard
│   │   ├── editor/                  # Resume/portfolio editors
│   │   ├── generate-resume/         # Resume generation
│   │   ├── generate-portfolio/      # Portfolio generation
│   │   ├── templates/               # Template browser
│   │   ├── pricing/                 # Pricing page
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Home page
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   ├── admin/                   # Admin components
│   │   ├── resume-templates/        # Resume preview templates
│   │   ├── portfolio-templates/     # Portfolio templates
│   │   ├── header.tsx               # Main header
│   │   └── ...
│   ├── lib/
│   │   ├── ai/                      # AI utilities & prompts
│   │   ├── auth.ts                  # Authentication helpers
│   │   ├── prisma.ts                # Prisma client
│   │   ├── seo.ts                   # SEO utilities
│   │   ├── utils.ts                 # General utilities
│   │   └── ...
│   └── styles/                      # Global styles
├── prisma/
│   ├── schema.prisma                # Database schema
│   └── migrations/                  # Database migrations
├── public/
│   ├── resumint.svg                 # Logo
│   ├── manifest.json                # PWA manifest
│   └── animations/                  # Lottie animation files
├── scripts/
│   └── setup-admin.js               # Admin setup script
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript config
├── tailwind.config.js               # TailwindCSS config
├── next.config.ts                   # Next.js config
└── README.md                        # This file
```

---

## 📡 API Documentation

### Authentication
```
POST /api/auth/register          # Register new user
POST /api/auth/login             # Login user
POST /api/auth/logout            # Logout user
POST /api/auth/refresh           # Refresh JWT token
POST /api/auth/profile           # Get current user
PUT  /api/auth/profile           # Update user profile
```

### Admin APIs
```
GET  /api/admin/users            # Get all users
GET  /api/admin/resumes          # Get all resumes
GET  /api/admin/portfolios       # Get all portfolios
GET  /api/admin/templates        # Get all templates
GET  /api/admin/transactions     # Get transactions
GET  /api/admin/emails           # Get email queue
GET  /api/admin/admins           # Get admin users
```

### Resume & Portfolio
```
POST /api/scrape-profile         # Scrape LinkedIn/website
POST /api/analyze-resume         # Analyze resume with AI
POST /api/generate-resume        # Generate resume from data
POST /api/generate-portfolio     # Generate portfolio from data
```

### Integrations
```
POST /api/linkedin/import        # Import from LinkedIn
POST /api/stripe/webhook         # Stripe payment webhook
```

---

## 🔐 Admin Dashboard

### Access
- **URL**: `/admin`
- **Requires**: Admin role (ADMIN or SUPER_ADMIN)
- **2FA**: Recommended for security

### Features
- **Dashboard**: Real-time analytics and key metrics
- **Users**: Manage user accounts and roles
- **Resumes**: Monitor all created resumes
- **Portfolios**: View portfolio websites
- **Templates**: Manage resume and portfolio templates
- **Pricing**: Configure subscription plans
- **Transactions**: Track all payments and credits
- **Analytics**: Detailed platform insights
- **Email Queue**: Monitor email delivery
- **Admin Users**: Manage admin accounts
- **Security**: Configure 2FA, passwords, IP whitelist
- **Settings**: Platform configuration

### Default Admin Account
```
Email: resumint.info@gmail.com
Password: ChangeMe@123456 (set via ADMIN_PASSWORD env var)
Role: SUPER_ADMIN
Plan: ENTERPRISE
Credits: 999,999
```

---

## 🤖 AI Features

### Resume Generation
Uses advanced AI to:
- **Extract Information**: Automatically pull data from profiles
- **Structure Content**: Organize information professionally
- **Optimize for ATS**: Ensure compatibility with Applicant Tracking Systems
- **Enhance Language**: Improve content with action verbs and metrics
- **Generate Summaries**: Create compelling professional summaries

### Resume Analysis
Provides:
- **Overall Score**: Comprehensive resume quality score
- **ATS Score**: Compatibility with hiring systems
- **Readability Score**: Ease of reading and comprehension
- **Strengths**: What's working well in your resume
- **Improvements**: Specific, actionable suggestions

### Portfolio Generation
AI guides users through:
- **Content Discovery**: Understand what to showcase
- **Structure Planning**: Organize portfolio effectively
- **Design Recommendations**: Professional design choices
- **Content Enhancement**: Improve project descriptions
- **SEO Optimization**: Improve discoverability

### System Prompts
Professional, role-specific AI prompts for:
- Developers, Designers, Managers, Marketers, Sales, Analysts
- Each tailored to industry-specific language and metrics

---

## 👥 User Roles & Permissions

### User Roles
- **NONE**: Regular user (default)
- **MODERATOR**: Can moderate content and users
- **ADMIN**: Full admin access except security settings
- **SUPER_ADMIN**: Complete platform access including security

### Permissions Matrix

| Action | User | MODERATOR | ADMIN | SUPER_ADMIN |
|--------|------|-----------|-------|-------------|
| Create Resume | ✅ | ✅ | ✅ | ✅ |
| Create Portfolio | ✅ | ✅ | ✅ | ✅ |
| View Own Data | ✅ | ✅ | ✅ | ✅ |
| View All Users | ❌ | ✅ | ✅ | ✅ |
| Manage Users | ❌ | ✅ | ✅ | ✅ |
| Manage Templates | ❌ | ❌ | ✅ | ✅ |
| Manage Pricing | ❌ | ❌ | ❌ | ✅ |
| Security Settings | ❌ | ❌ | ❌ | ✅ |
| 2FA Setup | ✅ | ✅ | ✅ | ✅ |

---

## 📊 Database Schema

### Core Models

**User**
```prisma
- id: String (MongoDB ObjectId)
- email: String (unique)
- password: String (hashed)
- name: String?
- credits: Int (default: 50)
- plan: Plan (FREE|PRO|ENTERPRISE)
- adminRole: AdminRole (NONE|MODERATOR|ADMIN|SUPER_ADMIN)
- emailVerified: Boolean
- twoFAEnabled: Boolean
- twoFASecret: String?
- lastLoginAt: DateTime?
- createdAt: DateTime
```

**Resume**
```prisma
- id: String
- userId: String
- title: String
- templateId: String
- data: JSON (resume content)
- isPublic: Boolean
- pdfUrl: String?
- createdAt: DateTime
```

**Portfolio**
```prisma
- id: String
- userId: String
- title: String
- slug: String (unique)
- data: JSON
- isPublic: Boolean
- aiGenerated: Boolean
- createdAt: DateTime
```

**Template**
```prisma
- id: String
- name: String
- category: TemplateCategory (RESUME|PORTFOLIO)
- isPremium: Boolean
- isActive: Boolean
```

**CreditTransaction**
```prisma
- id: String
- userId: String
- amount: Int
- type: TransactionType (PURCHASE|REWARD|USAGE|REFUND)
- description: String
- createdAt: DateTime
```

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Docker
```bash
# Build image
docker build -t resumint .

# Run container
docker run -p 3000:3000 resumint
```

### Environment Variables
- `DATABASE_URL`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT tokens
- `OPENAI_API_KEY`: OpenAI API key
- `RESEND_API_KEY`: Resend email API key
- `NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN`: Vercel Blob token

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow ESLint configuration
- Use Prettier for formatting
- Write TypeScript strictly
- Add tests for new features
- Update documentation

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👨‍💻 Developer

**Fahad Khan**
- Full-Stack Developer
- Building innovative solutions with modern web technologies
- Passionate about AI, SaaS products, and user experience

### Connect
- GitHub: [@fahadkhan](https://github.com)
- Email: resumint.info@gmail.com
- Portfolio: [fahadkhan.dev](https://fahadkhan.dev)

---

## 🙏 Acknowledgments

- Next.js team for amazing framework
- Vercel for hosting and deployment
- MongoDB for reliable database
- OpenAI for AI capabilities
- Tailwind Labs for CSS framework
- All contributors and users

---

## 📞 Support

- **Email**: resumint.info@gmail.com
- **Documentation**: [docs.resumint.com](https://docs.resumint.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/resumint/issues)
- **Discord**: [Join our community](https://discord.gg/resumint)

---

<div align="center">
  
**Made with ❤️ by Fahad Khan**

**[Star us on GitHub](https://github.com/yourusername/resumint) • [Share your feedback](https://github.com/yourusername/resumint/discussions)**

</div>
