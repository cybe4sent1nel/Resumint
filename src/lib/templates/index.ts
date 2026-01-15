export const RESUME_TEMPLATES = [
  {
    id: "minimal-pro",
    name: "Minimal Pro",
    type: "RESUME" as const,
    category: "professional",
    description: "Clean, ATS-friendly design perfect for any industry",
    isPremium: false,
    previewImage: "/templates/minimal-pro.png",
    config: {
      layout: "single-column",
      colors: {
        primary: "#1a1a1a",
        accent: "#3b82f6",
        text: "#374151",
        background: "#ffffff"
      },
      fonts: {
        heading: "Inter",
        body: "Inter"
      },
      sections: [
        { id: "header", required: true, title: "Personal Information" },
        { id: "summary", required: false, title: "Professional Summary" },
        { id: "experience", required: true, title: "Work Experience" },
        { id: "education", required: true, title: "Education" },
        { id: "skills", required: true, title: "Skills" },
        { id: "projects", required: false, title: "Projects" },
        { id: "certifications", required: false, title: "Certifications" }
      ]
    }
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    type: "RESUME" as const,
    category: "creative",
    description: "Bold, visual design for creative professionals",
    isPremium: true,
    previewImage: "/templates/creative-designer.png",
    config: {
      layout: "two-column",
      colors: {
        primary: "#8b5cf6",
        accent: "#ec4899",
        text: "#1f2937",
        background: "#fafafa"
      },
      fonts: {
        heading: "Poppins",
        body: "Inter"
      },
      sections: [
        { id: "header", required: true, title: "Profile" },
        { id: "summary", required: true, title: "About Me" },
        { id: "experience", required: true, title: "Experience" },
        { id: "education", required: true, title: "Education" },
        { id: "skills", required: true, title: "Expertise" },
        { id: "projects", required: true, title: "Portfolio" }
      ]
    }
  },
  {
    id: "tech-engineer",
    name: "Tech Engineer",
    type: "RESUME" as const,
    category: "technical",
    description: "Code-focused layout for developers and engineers",
    isPremium: false,
    previewImage: "/templates/tech-engineer.png",
    config: {
      layout: "single-column",
      colors: {
        primary: "#0f172a",
        accent: "#06b6d4",
        text: "#334155",
        background: "#ffffff"
      },
      fonts: {
        heading: "JetBrains Mono",
        body: "Inter"
      },
      sections: [
        { id: "header", required: true, title: "Contact" },
        { id: "summary", required: false, title: "Summary" },
        { id: "skills", required: true, title: "Technical Skills" },
        { id: "experience", required: true, title: "Professional Experience" },
        { id: "projects", required: true, title: "Projects" },
        { id: "education", required: true, title: "Education" },
        { id: "certifications", required: false, title: "Certifications" }
      ]
    }
  },
  {
    id: "executive",
    name: "Executive",
    type: "RESUME" as const,
    category: "leadership",
    description: "Sophisticated design for senior leadership roles",
    isPremium: true,
    previewImage: "/templates/executive.png",
    config: {
      layout: "two-column-sidebar",
      colors: {
        primary: "#1e40af",
        accent: "#d97706",
        text: "#1f2937",
        background: "#ffffff"
      },
      fonts: {
        heading: "Playfair Display",
        body: "Source Sans Pro"
      },
      sections: [
        { id: "header", required: true, title: "Executive Profile" },
        { id: "summary", required: true, title: "Executive Summary" },
        { id: "experience", required: true, title: "Leadership Experience" },
        { id: "education", required: true, title: "Education & Credentials" },
        { id: "skills", required: true, title: "Core Competencies" }
      ]
    }
  }
] as const

export const PORTFOLIO_TEMPLATES = [
  {
    id: "developer-portfolio",
    name: "Developer Portfolio",
    type: "PORTFOLIO" as const,
    category: "technical",
    description: "Dark mode, project showcase for developers",
    isPremium: false,
    previewImage: "/templates/developer-portfolio.png",
    config: {
      theme: "dark",
      layout: "modern",
      colors: {
        primary: "#3b82f6",
        accent: "#8b5cf6",
        text: "#f3f4f6",
        background: "#0f172a"
      },
      sections: [
        { id: "hero", title: "Hero Section", enabled: true },
        { id: "about", title: "About Me", enabled: true },
        { id: "projects", title: "Projects", enabled: true },
        { id: "skills", title: "Tech Stack", enabled: true },
        { id: "experience", title: "Experience", enabled: true },
        { id: "contact", title: "Contact", enabled: true },
        { id: "blog", title: "Blog", enabled: false }
      ],
      features: {
        animations: true,
        darkMode: true,
        contactForm: true,
        blog: false
      }
    }
  },
  {
    id: "designer-gallery",
    name: "Designer Gallery",
    type: "PORTFOLIO" as const,
    category: "creative",
    description: "Image-heavy grid layout for designers",
    isPremium: true,
    previewImage: "/templates/designer-gallery.png",
    config: {
      theme: "light",
      layout: "masonry",
      colors: {
        primary: "#ec4899",
        accent: "#8b5cf6",
        text: "#1f2937",
        background: "#ffffff"
      },
      sections: [
        { id: "hero", title: "Hero", enabled: true },
        { id: "portfolio", title: "Work", enabled: true },
        { id: "about", title: "About", enabled: true },
        { id: "services", title: "Services", enabled: true },
        { id: "testimonials", title: "Testimonials", enabled: true },
        { id: "contact", title: "Get in Touch", enabled: true }
      ],
      features: {
        animations: true,
        darkMode: false,
        contactForm: true,
        lightbox: true
      }
    }
  },
  {
    id: "minimalist",
    name: "Minimalist",
    type: "PORTFOLIO" as const,
    category: "minimal",
    description: "Typography-focused clean design",
    isPremium: false,
    previewImage: "/templates/minimalist.png",
    config: {
      theme: "light",
      layout: "minimal",
      colors: {
        primary: "#000000",
        accent: "#666666",
        text: "#1a1a1a",
        background: "#ffffff"
      },
      sections: [
        { id: "intro", title: "Introduction", enabled: true },
        { id: "work", title: "Selected Work", enabled: true },
        { id: "about", title: "Background", enabled: true },
        { id: "contact", title: "Connect", enabled: true }
      ],
      features: {
        animations: false,
        darkMode: false,
        contactForm: true,
        minimal: true
      }
    }
  }
] as const

export type ResumeTemplate = typeof RESUME_TEMPLATES[number]
export type PortfolioTemplate = typeof PORTFOLIO_TEMPLATES[number]
export type Template = ResumeTemplate | PortfolioTemplate
