// LaTeX Resume Templates Library
// Based on popular Overleaf templates

export interface LatexTemplate {
  id: number
  name: string
  category: string
  description: string
  hasProfilePic: boolean
  columns: number
  color: string
  atsScore: number
}

export const latexTemplates: LatexTemplate[] = [
  // Modern Templates (1-15)
  { id: 1, name: "Jake's Resume", category: "Modern", description: "Clean single-column ATS-friendly", hasProfilePic: true, columns: 1, color: "blue", atsScore: 98 },
  { id: 2, name: "Deedy Resume", category: "Modern", description: "Two-column modern design", hasProfilePic: true, columns: 2, color: "purple", atsScore: 95 },
  { id: 3, name: "Awesome CV", category: "Modern", description: "Professional with icons", hasProfilePic: true, columns: 1, color: "teal", atsScore: 96 },
  { id: 4, name: "ModernCV Classic", category: "Modern", description: "Classic professional style", hasProfilePic: true, columns: 1, color: "blue", atsScore: 97 },
  { id: 5, name: "ModernCV Banking", category: "Modern", description: "Conservative banking style", hasProfilePic: true, columns: 1, color: "gray", atsScore: 99 },
  { id: 6, name: "ModernCV Casual", category: "Modern", description: "Relaxed modern design", hasProfilePic: true, columns: 1, color: "green", atsScore: 94 },
  { id: 7, name: "ModernCV Oldstyle", category: "Modern", description: "Traditional with modern touch", hasProfilePic: true, columns: 1, color: "red", atsScore: 96 },
  { id: 8, name: "ModernCV Fancy", category: "Modern", description: "Elegant with decorations", hasProfilePic: true, columns: 1, color: "purple", atsScore: 92 },
  { id: 9, name: "Twenty Seconds", category: "Modern", description: "Infographic style resume", hasProfilePic: true, columns: 2, color: "cyan", atsScore: 88 },
  { id: 10, name: "Limecv", category: "Modern", description: "Fresh lime green accent", hasProfilePic: true, columns: 1, color: "lime", atsScore: 93 },
  { id: 11, name: "Alta CV", category: "Modern", description: "Minimalist sidebar design", hasProfilePic: true, columns: 2, color: "blue", atsScore: 91 },
  { id: 12, name: "Developer CV", category: "Modern", description: "Tech-focused layout", hasProfilePic: true, columns: 1, color: "indigo", atsScore: 95 },
  { id: 13, name: "Simple CV", category: "Modern", description: "Ultra-clean minimal", hasProfilePic: false, columns: 1, color: "black", atsScore: 99 },
  { id: 14, name: "Hipster CV", category: "Modern", description: "Trendy with personality", hasProfilePic: true, columns: 2, color: "orange", atsScore: 89 },
  { id: 15, name: "Friggeri CV", category: "Modern", description: "Designer's choice", hasProfilePic: true, columns: 2, color: "blue", atsScore: 90 },

  // Classic Templates (16-30)
  { id: 16, name: "Academic CV", category: "Classic", description: "Traditional academic format", hasProfilePic: true, columns: 1, color: "navy", atsScore: 97 },
  { id: 17, name: "Executive Resume", category: "Classic", description: "C-level professional", hasProfilePic: true, columns: 1, color: "gray", atsScore: 98 },
  { id: 18, name: "Legal Resume", category: "Classic", description: "Attorney format", hasProfilePic: false, columns: 1, color: "black", atsScore: 99 },
  { id: 19, name: "Medical CV", category: "Classic", description: "Healthcare professional", hasProfilePic: true, columns: 1, color: "blue", atsScore: 97 },
  { id: 20, name: "Finance Resume", category: "Classic", description: "Banking & finance", hasProfilePic: false, columns: 1, color: "darkblue", atsScore: 99 },
  { id: 21, name: "Consulting Resume", category: "Classic", description: "Strategy consultant", hasProfilePic: false, columns: 1, color: "navy", atsScore: 98 },
  { id: 22, name: "Government CV", category: "Classic", description: "Public sector format", hasProfilePic: true, columns: 1, color: "blue", atsScore: 99 },
  { id: 23, name: "Research CV", category: "Classic", description: "Research scientist", hasProfilePic: true, columns: 1, color: "teal", atsScore: 96 },
  { id: 24, name: "Professor CV", category: "Classic", description: "Faculty position", hasProfilePic: true, columns: 1, color: "maroon", atsScore: 97 },
  { id: 25, name: "Classic Harvard", category: "Classic", description: "Harvard Business School", hasProfilePic: false, columns: 1, color: "crimson", atsScore: 99 },
  { id: 26, name: "Classic MIT", category: "Classic", description: "MIT career services", hasProfilePic: false, columns: 1, color: "red", atsScore: 98 },
  { id: 27, name: "Classic Stanford", category: "Classic", description: "Stanford GSB format", hasProfilePic: false, columns: 1, color: "cardinal", atsScore: 99 },
  { id: 28, name: "Classic Wharton", category: "Classic", description: "Wharton MBA format", hasProfilePic: false, columns: 1, color: "blue", atsScore: 98 },
  { id: 29, name: "Classic Columbia", category: "Classic", description: "Columbia style", hasProfilePic: false, columns: 1, color: "lightblue", atsScore: 97 },
  { id: 30, name: "Classic Yale", category: "Classic", description: "Yale professional", hasProfilePic: true, columns: 1, color: "blue", atsScore: 98 },

  // Creative Templates (31-45)
  { id: 31, name: "Creative Designer", category: "Creative", description: "Graphic designer showcase", hasProfilePic: true, columns: 2, color: "pink", atsScore: 85 },
  { id: 32, name: "Artistic Portfolio", category: "Creative", description: "Artist resume", hasProfilePic: true, columns: 2, color: "purple", atsScore: 83 },
  { id: 33, name: "UX Designer", category: "Creative", description: "UI/UX specialist", hasProfilePic: true, columns: 2, color: "blue", atsScore: 87 },
  { id: 34, name: "Photographer CV", category: "Creative", description: "Photography professional", hasProfilePic: true, columns: 2, color: "black", atsScore: 84 },
  { id: 35, name: "Architect CV", category: "Creative", description: "Architecture portfolio", hasProfilePic: true, columns: 2, color: "gray", atsScore: 86 },
  { id: 36, name: "Marketing Creative", category: "Creative", description: "Marketing specialist", hasProfilePic: true, columns: 2, color: "orange", atsScore: 88 },
  { id: 37, name: "Writer CV", category: "Creative", description: "Content writer format", hasProfilePic: true, columns: 1, color: "teal", atsScore: 90 },
  { id: 38, name: "Journalist Resume", category: "Creative", description: "Media professional", hasProfilePic: true, columns: 1, color: "red", atsScore: 89 },
  { id: 39, name: "Fashion CV", category: "Creative", description: "Fashion industry", hasProfilePic: true, columns: 2, color: "pink", atsScore: 82 },
  { id: 40, name: "Film Industry", category: "Creative", description: "Film & TV professional", hasProfilePic: true, columns: 2, color: "purple", atsScore: 84 },
  { id: 41, name: "Music Producer", category: "Creative", description: "Music industry", hasProfilePic: true, columns: 2, color: "green", atsScore: 83 },
  { id: 42, name: "Social Media", category: "Creative", description: "Social media manager", hasProfilePic: true, columns: 2, color: "blue", atsScore: 86 },
  { id: 43, name: "Brand Manager", category: "Creative", description: "Brand marketing", hasProfilePic: true, columns: 1, color: "orange", atsScore: 89 },
  { id: 44, name: "Event Planner", category: "Creative", description: "Event management", hasProfilePic: true, columns: 2, color: "purple", atsScore: 85 },
  { id: 45, name: "Interior Designer", category: "Creative", description: "Interior design", hasProfilePic: true, columns: 2, color: "teal", atsScore: 84 },

  // Tech Templates (46-60)
  { id: 46, name: "Software Engineer", category: "Tech", description: "Developer resume", hasProfilePic: false, columns: 1, color: "blue", atsScore: 97 },
  { id: 47, name: "Data Scientist", category: "Tech", description: "ML/AI specialist", hasProfilePic: false, columns: 1, color: "purple", atsScore: 96 },
  { id: 48, name: "DevOps Engineer", category: "Tech", description: "Cloud & DevOps", hasProfilePic: false, columns: 1, color: "orange", atsScore: 95 },
  { id: 49, name: "Frontend Developer", category: "Tech", description: "React/Vue specialist", hasProfilePic: true, columns: 1, color: "cyan", atsScore: 94 },
  { id: 50, name: "Backend Developer", category: "Tech", description: "Server-side engineer", hasProfilePic: false, columns: 1, color: "green", atsScore: 96 },
  { id: 51, name: "Full Stack", category: "Tech", description: "Full stack developer", hasProfilePic: true, columns: 1, color: "indigo", atsScore: 95 },
  { id: 52, name: "Mobile Developer", category: "Tech", description: "iOS/Android dev", hasProfilePic: false, columns: 1, color: "blue", atsScore: 94 },
  { id: 53, name: "Security Engineer", category: "Tech", description: "Cybersecurity expert", hasProfilePic: false, columns: 1, color: "red", atsScore: 97 },
  { id: 54, name: "Cloud Architect", category: "Tech", description: "AWS/Azure specialist", hasProfilePic: false, columns: 1, color: "cyan", atsScore: 96 },
  { id: 55, name: "Product Manager", category: "Tech", description: "Tech PM resume", hasProfilePic: true, columns: 1, color: "purple", atsScore: 93 },
  { id: 56, name: "QA Engineer", category: "Tech", description: "Quality assurance", hasProfilePic: false, columns: 1, color: "green", atsScore: 95 },
  { id: 57, name: "Systems Admin", category: "Tech", description: "IT administrator", hasProfilePic: false, columns: 1, color: "gray", atsScore: 96 },
  { id: 58, name: "Network Engineer", category: "Tech", description: "Network specialist", hasProfilePic: false, columns: 1, color: "blue", atsScore: 95 },
  { id: 59, name: "Database Admin", category: "Tech", description: "DBA resume", hasProfilePic: false, columns: 1, color: "orange", atsScore: 96 },
  { id: 60, name: "AI Engineer", category: "Tech", description: "Artificial intelligence", hasProfilePic: false, columns: 1, color: "purple", atsScore: 95 },
]

export function getTemplateById(id: number): LatexTemplate | undefined {
  return latexTemplates.find(t => t.id === id)
}

export function getTemplatesByCategory(category: string): LatexTemplate[] {
  if (category === "All") return latexTemplates
  return latexTemplates.filter(t => t.category === category)
}

export const templateCategories = ["All", "Modern", "Classic", "Creative", "Tech"]
