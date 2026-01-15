// Unique Resume Template Designs
// Each template has a distinct visual style, layout, and color scheme

export interface UniqueTemplate {
  id: number
  name: string
  category: string
  description: string
  layout: TemplateLayout
  colorScheme: ColorScheme
  hasProfilePic: boolean
  columns: number
  atsScore: number
  overleafUrl?: string
}

export type TemplateLayout = 
  | 'minimal-clean'
  | 'sidebar-accent'
  | 'split-column'
  | 'infographic'
  | 'modern-gradient'
  | 'professional-grid'
  | 'creative-borders'
  | 'tech-focused'
  | 'academic-formal'
  | 'corporate-classic'
  | 'artistic-flow'
  | 'minimalist-serif'
  | 'bold-modern'
  | 'elegant-ornate'
  | 'startup-trendy'

export interface ColorScheme {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  headerBg?: string
  borderColor?: string
}

export const uniqueTemplates: UniqueTemplate[] = [
  // Modern Templates - Unique Designs
  {
    id: 1,
    name: "Jake's Resume",
    category: "Modern",
    description: "Ultra-clean single column with subtle top border",
    layout: "minimal-clean",
    colorScheme: {
      primary: "#2563eb",
      secondary: "#1e40af",
      accent: "#60a5fa",
      background: "#f9fafb",
      text: "#111827",
      borderColor: "#2563eb"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 98
  },
  {
    id: 2,
    name: "Deedy Resume",
    category: "Modern",
    description: "Two-column sidebar with colorful left accent",
    layout: "sidebar-accent",
    colorScheme: {
      primary: "#a855f7",
      secondary: "#7c3aed",
      accent: "#d946ef",
      background: "#ffffff",
      text: "#1f2937",
      headerBg: "#a855f7"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 95
  },
  {
    id: 3,
    name: "Awesome CV",
    category: "Modern",
    description: "Professional with colorful section icons",
    layout: "tech-focused",
    colorScheme: {
      primary: "#14b8a6",
      secondary: "#0d9488",
      accent: "#2dd4bf",
      background: "#f0fdfa",
      text: "#134e4a",
      borderColor: "#14b8a6"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 96
  },
  {
    id: 4,
    name: "ModernCV Classic",
    category: "Modern",
    description: "Professional with muted color scheme",
    layout: "professional-grid",
    colorScheme: {
      primary: "#1f2937",
      secondary: "#374151",
      accent: "#6b7280",
      background: "#ffffff",
      text: "#111827"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 97
  },
  {
    id: 5,
    name: "ModernCV Banking",
    category: "Modern",
    description: "Conservative with structured grid layout",
    layout: "corporate-classic",
    colorScheme: {
      primary: "#1e3a8a",
      secondary: "#1e40af",
      accent: "#3b82f6",
      background: "#f8fafc",
      text: "#0f172a"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 99
  },
  {
    id: 6,
    name: "ModernCV Casual",
    category: "Modern",
    description: "Relaxed design with green accents",
    layout: "minimal-clean",
    colorScheme: {
      primary: "#16a34a",
      secondary: "#15803d",
      accent: "#4ade80",
      background: "#f0fdf4",
      text: "#166534"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 94
  },
  {
    id: 7,
    name: "ModernCV Oldstyle",
    category: "Modern",
    description: "Traditional with modern typography",
    layout: "minimalist-serif",
    colorScheme: {
      primary: "#991b1b",
      secondary: "#b91c1c",
      accent: "#ef4444",
      background: "#fffbfb",
      text: "#450a0a"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 96
  },
  {
    id: 8,
    name: "ModernCV Fancy",
    category: "Modern",
    description: "Elegant with decorative elements",
    layout: "elegant-ornate",
    colorScheme: {
      primary: "#7c3aed",
      secondary: "#6d28d9",
      accent: "#c084fc",
      background: "#faf5ff",
      text: "#3f0f63"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 92
  },
  {
    id: 9,
    name: "Twenty Seconds",
    category: "Modern",
    description: "Infographic-style with progress bars",
    layout: "infographic",
    colorScheme: {
      primary: "#06b6d4",
      secondary: "#0891b2",
      accent: "#22d3ee",
      background: "#ecf0f1",
      text: "#0c4a6e"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 88
  },
  {
    id: 10,
    name: "Limecv",
    category: "Modern",
    description: "Fresh lime green with modern spacing",
    layout: "modern-gradient",
    colorScheme: {
      primary: "#84cc16",
      secondary: "#65a30d",
      accent: "#bef264",
      background: "#fefce8",
      text: "#365314"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 93
  },
  {
    id: 11,
    name: "Alta CV",
    category: "Modern",
    description: "Minimalist sidebar with blue accent",
    layout: "sidebar-accent",
    colorScheme: {
      primary: "#0ea5e9",
      secondary: "#0284c7",
      accent: "#7dd3fc",
      background: "#f0f9ff",
      text: "#082f49"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 91
  },
  {
    id: 12,
    name: "Developer CV",
    category: "Modern",
    description: "Tech-focused with code block styling",
    layout: "tech-focused",
    colorScheme: {
      primary: "#4f46e5",
      secondary: "#4338ca",
      accent: "#818cf8",
      background: "#f5f3ff",
      text: "#231e4f"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 95
  },
  {
    id: 13,
    name: "Simple CV",
    category: "Modern",
    description: "Ultra-minimal black and white",
    layout: "minimal-clean",
    colorScheme: {
      primary: "#000000",
      secondary: "#404040",
      accent: "#737373",
      background: "#ffffff",
      text: "#000000"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 99
  },
  {
    id: 14,
    name: "Hipster CV",
    category: "Modern",
    description: "Trendy with warm orange tones",
    layout: "startup-trendy",
    colorScheme: {
      primary: "#ea580c",
      secondary: "#c2410c",
      accent: "#fed7aa",
      background: "#fef3c7",
      text: "#7c2d12"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 89
  },
  {
    id: 15,
    name: "Friggeri CV",
    category: "Modern",
    description: "Designer's choice with split layout",
    layout: "split-column",
    colorScheme: {
      primary: "#2563eb",
      secondary: "#1d4ed8",
      accent: "#93c5fd",
      background: "#ffffff",
      text: "#1f2937"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 90
  },

  // Classic Templates - Unique Designs
  {
    id: 16,
    name: "Academic CV",
    category: "Classic",
    description: "Traditional academic format with serif fonts",
    layout: "academic-formal",
    colorScheme: {
      primary: "#001a4d",
      secondary: "#004080",
      accent: "#0066cc",
      background: "#f5f5f5",
      text: "#000000"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 97
  },
  {
    id: 17,
    name: "Executive Resume",
    category: "Classic",
    description: "Premium C-level executive format",
    layout: "corporate-classic",
    colorScheme: {
      primary: "#5a5a5a",
      secondary: "#3a3a3a",
      accent: "#8b8b8b",
      background: "#ffffff",
      text: "#1a1a1a"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 98
  },
  {
    id: 18,
    name: "Legal Resume",
    category: "Classic",
    description: "Formal attorney format",
    layout: "academic-formal",
    colorScheme: {
      primary: "#000000",
      secondary: "#1a1a1a",
      accent: "#4a4a4a",
      background: "#ffffff",
      text: "#000000"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 99
  },
  {
    id: 19,
    name: "Medical CV",
    category: "Classic",
    description: "Healthcare professional format",
    layout: "professional-grid",
    colorScheme: {
      primary: "#1e40af",
      secondary: "#1e3a8a",
      accent: "#3b82f6",
      background: "#eff6ff",
      text: "#1e3a8a"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 97
  },
  {
    id: 20,
    name: "Finance Resume",
    category: "Classic",
    description: "Banking and finance professional",
    layout: "corporate-classic",
    colorScheme: {
      primary: "#1a3a52",
      secondary: "#2a5a7a",
      accent: "#4a8ab8",
      background: "#f0f4f8",
      text: "#1a3a52"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 99
  },
  {
    id: 21,
    name: "Consulting Resume",
    category: "Classic",
    description: "Strategy consultant format",
    layout: "professional-grid",
    colorScheme: {
      primary: "#2c3e50",
      secondary: "#34495e",
      accent: "#7f8c8d",
      background: "#ecf0f1",
      text: "#2c3e50"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 98
  },
  {
    id: 22,
    name: "Government CV",
    category: "Classic",
    description: "Public sector format",
    layout: "academic-formal",
    colorScheme: {
      primary: "#003d82",
      secondary: "#005eb8",
      accent: "#0073e6",
      background: "#f8f9fa",
      text: "#003d82"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 99
  },
  {
    id: 23,
    name: "Research CV",
    category: "Classic",
    description: "Research scientist format",
    layout: "academic-formal",
    colorScheme: {
      primary: "#0d7377",
      secondary: "#14919b",
      accent: "#7ab8c4",
      background: "#f0f7f9",
      text: "#0d7377"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 96
  },
  {
    id: 24,
    name: "Professor CV",
    category: "Classic",
    description: "Academic faculty position format",
    layout: "academic-formal",
    colorScheme: {
      primary: "#8b0000",
      secondary: "#b22222",
      accent: "#cd5c5c",
      background: "#fff5f5",
      text: "#8b0000"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 97
  },
  {
    id: 25,
    name: "Classic Harvard",
    category: "Classic",
    description: "Harvard Business School style",
    layout: "corporate-classic",
    colorScheme: {
      primary: "#a41e34",
      secondary: "#7d1f29",
      accent: "#c9184a",
      background: "#fff9fa",
      text: "#a41e34"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 99
  },
  {
    id: 26,
    name: "Classic MIT",
    category: "Classic",
    description: "MIT career services format",
    layout: "professional-grid",
    colorScheme: {
      primary: "#a41e34",
      secondary: "#c41e3a",
      accent: "#e74c3c",
      background: "#fef5f5",
      text: "#a41e34"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 98
  },
  {
    id: 27,
    name: "Classic Stanford",
    category: "Classic",
    description: "Stanford GSB format",
    layout: "professional-grid",
    colorScheme: {
      primary: "#b3002f",
      secondary: "#820000",
      accent: "#e21828",
      background: "#fef9f9",
      text: "#b3002f"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 99
  },
  {
    id: 28,
    name: "Classic Wharton",
    category: "Classic",
    description: "Wharton MBA format",
    layout: "corporate-classic",
    colorScheme: {
      primary: "#00205b",
      secondary: "#003087",
      accent: "#0051ba",
      background: "#f5f7fa",
      text: "#00205b"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 98
  },
  {
    id: 29,
    name: "Classic Columbia",
    category: "Classic",
    description: "Columbia University style",
    layout: "academic-formal",
    colorScheme: {
      primary: "#4b9cd6",
      secondary: "#3a7aa6",
      accent: "#6ab7e8",
      background: "#f0f6fb",
      text: "#003366"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 97
  },
  {
    id: 30,
    name: "Classic Yale",
    category: "Classic",
    description: "Yale professional format",
    layout: "academic-formal",
    colorScheme: {
      primary: "#00356b",
      secondary: "#004fa3",
      accent: "#0066ff",
      background: "#f0f4fa",
      text: "#00356b"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 98
  },

  // Creative Templates - Unique Designs
  {
    id: 31,
    name: "Creative Designer",
    category: "Creative",
    description: "Graphic designer portfolio showcase",
    layout: "creative-borders",
    colorScheme: {
      primary: "#ec4899",
      secondary: "#db2777",
      accent: "#f472b6",
      background: "#fdf2f8",
      text: "#831843"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 85
  },
  {
    id: 32,
    name: "Artistic Portfolio",
    category: "Creative",
    description: "Artist resume with visual emphasis",
    layout: "infographic",
    colorScheme: {
      primary: "#d946ef",
      secondary: "#c026d3",
      accent: "#e879f9",
      background: "#faf5ff",
      text: "#6b21a8"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 83
  },
  {
    id: 33,
    name: "UX Designer",
    category: "Creative",
    description: "UI/UX specialist format",
    layout: "modern-gradient",
    colorScheme: {
      primary: "#0ea5e9",
      secondary: "#0284c7",
      accent: "#7dd3fc",
      background: "#ecf9ff",
      text: "#0c4a6e"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 87
  },
  {
    id: 34,
    name: "Photographer CV",
    category: "Creative",
    description: "Photography professional format",
    layout: "split-column",
    colorScheme: {
      primary: "#000000",
      secondary: "#262626",
      accent: "#737373",
      background: "#ffffff",
      text: "#000000"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 84
  },
  {
    id: 35,
    name: "Architect CV",
    category: "Creative",
    description: "Architecture portfolio format",
    layout: "professional-grid",
    colorScheme: {
      primary: "#6b7280",
      secondary: "#4b5563",
      accent: "#9ca3af",
      background: "#f9fafb",
      text: "#1f2937"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 86
  },
  {
    id: 36,
    name: "Marketing Creative",
    category: "Creative",
    description: "Marketing specialist format",
    layout: "startup-trendy",
    colorScheme: {
      primary: "#fb923c",
      secondary: "#ea580c",
      accent: "#fed7aa",
      background: "#fefce8",
      text: "#7c2d12"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 88
  },
  {
    id: 37,
    name: "Writer CV",
    category: "Creative",
    description: "Content writer format",
    layout: "minimalist-serif",
    colorScheme: {
      primary: "#14b8a6",
      secondary: "#0d9488",
      accent: "#2dd4bf",
      background: "#f0fdfa",
      text: "#0f766e"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 90
  },
  {
    id: 38,
    name: "Journalist Resume",
    category: "Creative",
    description: "Media professional format",
    layout: "creative-borders",
    colorScheme: {
      primary: "#dc2626",
      secondary: "#991b1b",
      accent: "#fca5a5",
      background: "#fef2f2",
      text: "#7f1d1d"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 89
  },
  {
    id: 39,
    name: "Fashion CV",
    category: "Creative",
    description: "Fashion industry format",
    layout: "elegant-ornate",
    colorScheme: {
      primary: "#f43f5e",
      secondary: "#e11d48",
      accent: "#fb7185",
      background: "#ffe4e6",
      text: "#831843"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 82
  },
  {
    id: 40,
    name: "Film Industry",
    category: "Creative",
    description: "Film & TV professional format",
    layout: "infographic",
    colorScheme: {
      primary: "#9333ea",
      secondary: "#7e22ce",
      accent: "#d8b4fe",
      background: "#faf5ff",
      text: "#581c87"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 84
  },
  {
    id: 41,
    name: "Music Producer",
    category: "Creative",
    description: "Music industry format",
    layout: "modern-gradient",
    colorScheme: {
      primary: "#22c55e",
      secondary: "#16a34a",
      accent: "#86efac",
      background: "#f0fdf4",
      text: "#15803d"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 83
  },
  {
    id: 42,
    name: "Social Media",
    category: "Creative",
    description: "Social media manager format",
    layout: "startup-trendy",
    colorScheme: {
      primary: "#3b82f6",
      secondary: "#2563eb",
      accent: "#93c5fd",
      background: "#eff6ff",
      text: "#1e40af"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 86
  },
  {
    id: 43,
    name: "Brand Manager",
    category: "Creative",
    description: "Brand marketing format",
    layout: "professional-grid",
    colorScheme: {
      primary: "#f97316",
      secondary: "#ea580c",
      accent: "#fed7aa",
      background: "#fff7ed",
      text: "#7c2d12"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 89
  },
  {
    id: 44,
    name: "Event Planner",
    category: "Creative",
    description: "Event management format",
    layout: "creative-borders",
    colorScheme: {
      primary: "#a855f7",
      secondary: "#9333ea",
      accent: "#e9d5ff",
      background: "#faf5ff",
      text: "#6b21a8"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 85
  },
  {
    id: 45,
    name: "Interior Designer",
    category: "Creative",
    description: "Interior design format",
    layout: "split-column",
    colorScheme: {
      primary: "#06b6d4",
      secondary: "#0891b2",
      accent: "#7dd3fc",
      background: "#ecf9ff",
      text: "#164e63"
    },
    hasProfilePic: true,
    columns: 2,
    atsScore: 84
  },

  // Tech Templates - Unique Designs
  {
    id: 46,
    name: "Software Engineer",
    category: "Tech",
    description: "Developer resume with code styling",
    layout: "tech-focused",
    colorScheme: {
      primary: "#1e40af",
      secondary: "#1e3a8a",
      accent: "#3b82f6",
      background: "#eff6ff",
      text: "#1e40af"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 97
  },
  {
    id: 47,
    name: "Data Scientist",
    category: "Tech",
    description: "ML/AI specialist format",
    layout: "modern-gradient",
    colorScheme: {
      primary: "#7c3aed",
      secondary: "#6d28d9",
      accent: "#a78bfa",
      background: "#f5f3ff",
      text: "#5b21b6"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 96
  },
  {
    id: 48,
    name: "DevOps Engineer",
    category: "Tech",
    description: "Cloud & DevOps format",
    layout: "tech-focused",
    colorScheme: {
      primary: "#f97316",
      secondary: "#ea580c",
      accent: "#fed7aa",
      background: "#fff7ed",
      text: "#7c2d12"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 95
  },
  {
    id: 49,
    name: "Frontend Developer",
    category: "Tech",
    description: "React/Vue specialist format",
    layout: "modern-gradient",
    colorScheme: {
      primary: "#06b6d4",
      secondary: "#0891b2",
      accent: "#22d3ee",
      background: "#ecf9ff",
      text: "#164e63"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 94
  },
  {
    id: 50,
    name: "Backend Developer",
    category: "Tech",
    description: "Server-side engineer format",
    layout: "tech-focused",
    colorScheme: {
      primary: "#16a34a",
      secondary: "#15803d",
      accent: "#86efac",
      background: "#f0fdf4",
      text: "#166534"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 96
  },
  {
    id: 51,
    name: "Full Stack",
    category: "Tech",
    description: "Full stack developer format",
    layout: "professional-grid",
    colorScheme: {
      primary: "#4f46e5",
      secondary: "#4338ca",
      accent: "#818cf8",
      background: "#f5f3ff",
      text: "#3730a3"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 95
  },
  {
    id: 52,
    name: "Mobile Developer",
    category: "Tech",
    description: "iOS/Android developer format",
    layout: "modern-gradient",
    colorScheme: {
      primary: "#0284c7",
      secondary: "#0369a1",
      accent: "#7dd3fc",
      background: "#f0f9ff",
      text: "#0c2d48"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 94
  },
  {
    id: 53,
    name: "Security Engineer",
    category: "Tech",
    description: "Cybersecurity expert format",
    layout: "tech-focused",
    colorScheme: {
      primary: "#dc2626",
      secondary: "#b91c1c",
      accent: "#fca5a5",
      background: "#fef2f2",
      text: "#7f1d1d"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 97
  },
  {
    id: 54,
    name: "Cloud Architect",
    category: "Tech",
    description: "AWS/Azure specialist format",
    layout: "professional-grid",
    colorScheme: {
      primary: "#0891b2",
      secondary: "#0e7490",
      accent: "#22d3ee",
      background: "#ecfdf5",
      text: "#164e63"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 96
  },
  {
    id: 55,
    name: "Product Manager",
    category: "Tech",
    description: "Tech PM resume format",
    layout: "startup-trendy",
    colorScheme: {
      primary: "#6b21a8",
      secondary: "#7c3aed",
      accent: "#c084fc",
      background: "#faf5ff",
      text: "#3f0f63"
    },
    hasProfilePic: true,
    columns: 1,
    atsScore: 93
  },
  {
    id: 56,
    name: "QA Engineer",
    category: "Tech",
    description: "Quality assurance format",
    layout: "tech-focused",
    colorScheme: {
      primary: "#059669",
      secondary: "#047857",
      accent: "#6ee7b7",
      background: "#ecfdf5",
      text: "#064e3b"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 95
  },
  {
    id: 57,
    name: "Systems Admin",
    category: "Tech",
    description: "IT administrator format",
    layout: "professional-grid",
    colorScheme: {
      primary: "#6b7280",
      secondary: "#4b5563",
      accent: "#9ca3af",
      background: "#f9fafb",
      text: "#1f2937"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 96
  },
  {
    id: 58,
    name: "Network Engineer",
    category: "Tech",
    description: "Network specialist format",
    layout: "modern-gradient",
    colorScheme: {
      primary: "#2563eb",
      secondary: "#1d4ed8",
      accent: "#60a5fa",
      background: "#f0f9ff",
      text: "#1e3a8a"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 95
  },
  {
    id: 59,
    name: "Database Admin",
    category: "Tech",
    description: "DBA resume format",
    layout: "tech-focused",
    colorScheme: {
      primary: "#ea580c",
      secondary: "#c2410c",
      accent: "#fed7aa",
      background: "#fff7ed",
      text: "#7c2d12"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 96
  },
  {
    id: 60,
    name: "AI Engineer",
    category: "Tech",
    description: "Artificial intelligence engineer format",
    layout: "modern-gradient",
    colorScheme: {
      primary: "#7c3aed",
      secondary: "#6d28d9",
      accent: "#d8b4fe",
      background: "#faf5ff",
      text: "#581c87"
    },
    hasProfilePic: false,
    columns: 1,
    atsScore: 95
  }
]

export function getUniqueTemplateById(id: number): UniqueTemplate | undefined {
  return uniqueTemplates.find(t => t.id === id)
}

export function getUniqueTemplatesByCategory(category: string): UniqueTemplate[] {
  if (category === "All") return uniqueTemplates
  return uniqueTemplates.filter(t => t.category === category)
}

export const uniqueTemplateCategories = ["All", "Modern", "Classic", "Creative", "Tech"]
