// Portfolio Website Template Previews - Based on popular free templates

interface PortfolioPreviewProps {
  name: string
  title: string
}

// 1. Modern Developer (Inspired by HTML5 UP Paradigm Shift)
export function ModernDeveloperPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 rounded-lg shadow-2xl">
      <div className="text-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{name || 'Your Name'}</h1>
            <p className="text-blue-200">{title || 'Full Stack Developer'}</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
            {(name || 'Y').charAt(0)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
            <div className="text-2xl font-bold">5+</div>
            <div className="text-xs text-blue-200">Years Exp</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
            <div className="text-2xl font-bold">50+</div>
            <div className="text-xs text-blue-200">Projects</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
            <div className="text-2xl font-bold">30+</div>
            <div className="text-xs text-blue-200">Clients</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-1.5 bg-white/20 rounded"><div className="h-full bg-white rounded" style={{width: '90%'}}></div></div>
          <div className="h-1.5 bg-white/20 rounded"><div className="h-full bg-white rounded" style={{width: '75%'}}></div></div>
        </div>
      </div>
    </div>
  )
}

// 2. Creative Designer (Inspired by HTML5 UP Photon)
export function CreativeDesignerPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-pink-500 to-orange-500 p-8 rounded-lg shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
      <div className="bg-white rounded-lg p-6 space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              {name || 'Your Name'}
            </h1>
            <p className="text-gray-600 text-sm">{title || 'Creative Designer'}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500"></div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-square bg-gradient-to-br from-pink-200 to-pink-300 rounded"></div>
          <div className="aspect-square bg-gradient-to-br from-orange-200 to-orange-300 rounded"></div>
          <div className="aspect-square bg-gradient-to-br from-pink-300 to-orange-200 rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-1 bg-pink-500 rounded flex-1"></div>
          <div className="h-1 bg-orange-500 rounded flex-1"></div>
        </div>
      </div>
    </div>
  )
}

// 3. Professional Business (Inspired by HTML5 UP Solid State)
export function ProfessionalBusinessPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-2xl">
      <div className="space-y-4">
        <div className="border-l-4 border-white pl-4">
          <h1 className="text-3xl font-bold text-white">{name || 'Your Name'}</h1>
          <p className="text-gray-400">{title || 'Business Professional'}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded border-l-2 border-blue-500">
            <div className="text-xs text-gray-400 mb-1">Experience</div>
            <div className="text-lg font-bold text-white">10+ Years</div>
          </div>
          <div className="bg-gray-800 p-4 rounded border-l-2 border-green-500">
            <div className="text-xs text-gray-400 mb-1">Success Rate</div>
            <div className="text-lg font-bold text-white">95%</div>
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="h-1 bg-gray-700 rounded flex-1">
                <div className="h-full bg-white rounded" style={{width: `${90-i*10}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 4. Minimalist Portfolio (Inspired by HTML5 UP Strata)
export function MinimalistPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-white border-4 border-teal-500 p-8 rounded-lg shadow-2xl">
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-light text-gray-900">{name || 'Your Name'}</h1>
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="w-8 h-px bg-teal-500"></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <div className="w-8 h-px bg-teal-500"></div>
          </div>
          <p className="text-gray-600 text-xs uppercase tracking-widest">{title || 'Minimalist'}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square border-2 border-teal-300 rounded hover:bg-teal-50 transition"></div>
          ))}
        </div>
        <div className="text-center">
          <div className="inline-block px-4 py-1 border border-teal-500 text-teal-600 text-xs rounded-full">
            View Portfolio
          </div>
        </div>
      </div>
    </div>
  )
}

// 5. Bold Entrepreneur (Inspired by HTML5 UP Massively)
export function BoldEntrepreneurPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 p-1 rounded-lg shadow-2xl">
      <div className="bg-white rounded-lg p-6 space-y-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase">{name || 'YOUR NAME'}</h1>
          <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded w-24 my-2"></div>
          <p className="text-xl font-bold text-orange-600">{title || 'Entrepreneur'}</p>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded" style={{width: '100%'}}></div>
          <div className="h-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded" style={{width: '85%'}}></div>
          <div className="h-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded" style={{width: '70%'}}></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-red-100 p-2 rounded text-center">
            <div className="text-xl font-bold text-red-600">$1M+</div>
            <div className="text-xs text-red-700">Revenue</div>
          </div>
          <div className="bg-orange-100 p-2 rounded text-center">
            <div className="text-xl font-bold text-orange-600">100+</div>
            <div className="text-xs text-orange-700">Clients</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 6. Artistic Showcase (Inspired by HTML5 UP Big Picture)
export function ArtisticShowcasePreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 p-8 rounded-lg shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -ml-12 -mb-12"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      <div className="relative text-white space-y-4">
        <div>
          <h1 className="text-3xl font-bold italic">{name || 'Your Name'}</h1>
          <p className="text-purple-200">{title || 'Artist & Creative'}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-20 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30"></div>
          <div className="h-20 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30"></div>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 7. Tech Startup (Inspired by HTML5 UP Hyperspace)
export function TechStartupPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
      <div className="relative space-y-4">
        <div className="flex items-center justify-between text-white">
          <div>
            <h1 className="text-3xl font-bold">{name || 'Your Name'}</h1>
            <p className="text-cyan-400 text-sm">{title || 'Tech Innovator'}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-800 border border-cyan-500/30 p-2 rounded">
            <div className="text-cyan-400 text-lg font-bold">AI</div>
          </div>
          <div className="bg-gray-800 border border-blue-500/30 p-2 rounded">
            <div className="text-blue-400 text-lg font-bold">ML</div>
          </div>
          <div className="bg-gray-800 border border-purple-500/30 p-2 rounded">
            <div className="text-purple-400 text-lg font-bold">IoT</div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-cyan-500 rounded" style={{width: '90%'}}></div>
          <div className="h-1 bg-blue-500 rounded" style={{width: '75%'}}></div>
          <div className="h-1 bg-purple-500 rounded" style={{width: '85%'}}></div>
        </div>
      </div>
    </div>
  )
}

// 8. Photography Portfolio (Inspired by HTML5 UP Lens)
export function PhotographyPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-black p-8 rounded-lg shadow-2xl">
      <div className="space-y-4">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-2 border-white mx-auto rounded-full flex items-center justify-center mb-3">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <h1 className="text-2xl font-light tracking-widest">{name || 'YOUR NAME'}</h1>
          <p className="text-gray-400 text-xs mt-1 tracking-wider">{title || 'PHOTOGRAPHER'}</p>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 9. Agency/Studio (Inspired by HTML5 UP Stellar)
export function AgencyPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-lg shadow-2xl">
      <div className="text-white space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-2xl font-bold">
            {(name || 'A').charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{name || 'Agency Name'}</h1>
            <p className="text-amber-400 text-sm">{title || 'Creative Studio'}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-700/50 backdrop-blur p-3 rounded text-center border border-amber-500/20">
            <div className="text-amber-400 text-xs">Projects</div>
            <div className="text-xl font-bold">200+</div>
          </div>
          <div className="bg-slate-700/50 backdrop-blur p-3 rounded text-center border border-orange-500/20">
            <div className="text-orange-400 text-xs">Clients</div>
            <div className="text-xl font-bold">50+</div>
          </div>
          <div className="bg-slate-700/50 backdrop-blur p-3 rounded text-center border border-yellow-500/20">
            <div className="text-yellow-400 text-xs">Awards</div>
            <div className="text-xl font-bold">15+</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 10. Corporate Professional (Inspired by HTML5 UP Editorial)
export function CorporatePreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl border-l-8 border-blue-600">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{name || 'Corporate Name'}</h1>
          <p className="text-blue-600 font-semibold">{title || 'Executive Leader'}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded">
            <div className="text-xs text-blue-600 uppercase">Leadership</div>
            <div className="text-lg font-bold text-gray-900">15Y</div>
          </div>
          <div className="bg-blue-50 p-3 rounded">
            <div className="text-xs text-blue-600 uppercase">Revenue</div>
            <div className="text-lg font-bold text-gray-900">$10M+</div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3 space-y-2">
          {[1, 2].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
              <div className="h-1 bg-gray-200 rounded flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 11. Freelancer Portfolio (Inspired by HTML5 UP Phantom)
export function FreelancerPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-teal-400 to-cyan-500 p-8 rounded-lg shadow-2xl">
      <div className="bg-white/95 backdrop-blur rounded-lg p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg"></div>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-2 h-2 bg-teal-500 rounded-full"></div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name || 'Freelancer'}</h1>
          <p className="text-teal-600 text-sm">{title || 'Independent Professional'}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square bg-gradient-to-br from-teal-100 to-cyan-100 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 12. Developer Showcase (Inspired by GitHub Profile)
export function DevShowcasePreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-2xl border border-gray-700">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold text-white">{name || 'DevName'}</h1>
            <p className="text-gray-400 text-sm">{title || 'Full Stack Developer'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-800 px-3 py-1 rounded-full text-xs text-green-400 border border-green-400/30">
            React
          </div>
          <div className="bg-gray-800 px-3 py-1 rounded-full text-xs text-blue-400 border border-blue-400/30">
            Node.js
          </div>
          <div className="bg-gray-800 px-3 py-1 rounded-full text-xs text-purple-400 border border-purple-400/30">
            Python
          </div>
        </div>
        <div className="space-y-1">
          {[90, 75, 60].map((width, i) => (
            <div key={i} className="h-1.5 bg-gray-800 rounded">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded" style={{width: `${width}%`}}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 13. Fashion/Lifestyle (Inspired by HTML5 UP Story)
export function FashionPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-rose-400 via-pink-300 to-fuchsia-400 p-1 rounded-lg shadow-2xl">
      <div className="bg-white rounded-lg p-6 space-y-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-fuchsia-500 rounded-full mx-auto mb-3"></div>
          <h1 className="text-3xl font-serif italic text-gray-900">{name || 'Fashion Name'}</h1>
          <p className="text-pink-600 text-sm tracking-widest uppercase">{title || 'Lifestyle Curator'}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="aspect-[3/4] bg-gradient-to-br from-rose-200 to-pink-200 rounded"></div>
          <div className="aspect-[3/4] bg-gradient-to-br from-pink-200 to-fuchsia-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

// 14. Consultant Profile (Inspired by HTML5 UP Forty)
export function ConsultantPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-lg shadow-2xl">
      <div className="text-white space-y-4">
        <div className="border-b border-white/30 pb-4">
          <h1 className="text-3xl font-bold">{name || 'Consultant Name'}</h1>
          <p className="text-indigo-200 text-sm">{title || 'Strategy Consultant'}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur p-3 rounded border border-white/20">
            <div className="text-2xl font-bold">25+</div>
            <div className="text-xs text-indigo-200">Companies</div>
          </div>
          <div className="bg-white/10 backdrop-blur p-3 rounded border border-white/20">
            <div className="text-2xl font-bold">$5M+</div>
            <div className="text-xs text-indigo-200">Value Added</div>
          </div>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex-1 h-16 bg-white/10 backdrop-blur rounded border border-white/20"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 15. Writer/Blogger (Inspired by Medium)
export function WriterPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-amber-50 p-8 rounded-lg shadow-2xl border-t-4 border-amber-500">
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-serif text-gray-900 mb-2">{name || 'Writer Name'}</h1>
          <p className="text-amber-700 italic">{title || 'Content Creator & Storyteller'}</p>
        </div>
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="border-l-4 border-amber-400 pl-3 py-2">
              <div className="h-2 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-2 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 text-xs text-gray-600">
          <span>✍️ 100+ Articles</span>
          <span>•</span>
          <span>📚 5 Books</span>
        </div>
      </div>
    </div>
  )
}

// 16. Architect Portfolio (Inspired by HTML5 UP Multiverse)
export function ArchitectPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-2xl">
      <div className="space-y-4">
        <div className="flex items-end justify-between border-b-4 border-gray-900 pb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">{name || 'Architect'}</h1>
            <p className="text-xs text-gray-600 uppercase tracking-widest">{title || 'Design & Architecture'}</p>
          </div>
          <div className="w-12 h-12 bg-gray-900"></div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 17. Music Artist (Inspired by Spotify Artist Page)
export function MusicArtistPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-lg shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="relative text-white space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full border-2 border-white"></div>
          <div>
            <div className="text-xs uppercase tracking-widest text-green-200">Verified Artist</div>
            <h1 className="text-3xl font-bold">{name || 'Artist Name'}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-white/10 backdrop-blur rounded p-2 text-center border border-white/20">
            <div className="text-lg font-bold">1.2M</div>
            <div className="text-xs text-green-200">Listeners</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur rounded p-2 text-center border border-white/20">
            <div className="text-lg font-bold">50+</div>
            <div className="text-xs text-green-200">Tracks</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 18. Chef/Culinary (Inspired by Food Network)
export function ChefPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 p-1 rounded-lg shadow-2xl">
      <div className="bg-white rounded-lg p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="text-4xl">👨‍🍳</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{name || 'Chef Name'}</h1>
            <p className="text-orange-600 font-semibold text-sm">{title || 'Executive Chef'}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['🍽️', '⭐', '🏆'].map((emoji, i) => (
            <div key={i} className="bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded text-center">
              <div className="text-2xl mb-1">{emoji}</div>
              <div className="text-xs font-bold text-gray-700">{['Dishes', 'Michelin', 'Awards'][i]}</div>
            </div>
          ))}
        </div>
        <div className="h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded"></div>
      </div>
    </div>
  )
}

// 19. Fitness Coach (Inspired by Nike Training)
export function FitnessPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-black p-8 rounded-lg shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
      <div className="relative text-white space-y-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">{name || 'FITNESS PRO'}</h1>
          <p className="text-red-500 font-bold uppercase text-sm">{title || 'Personal Trainer'}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['💪', '🏃', '🥇'].map((emoji, i) => (
            <div key={i} className="bg-red-500/10 border border-red-500/30 p-3 rounded text-center">
              <div className="text-2xl">{emoji}</div>
              <div className="text-xs text-red-400 mt-1 font-bold">{['Strength', 'Cardio', 'Results'][i]}</div>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-red-400 mb-1">
            <span>Transformation</span>
            <span>95%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded">
            <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded" style={{width: '95%'}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 20. Real Estate Agent
export function RealEstatePreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-8 rounded-lg shadow-2xl">
      <div className="bg-white rounded-lg p-6 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{name || 'Agent Name'}</h1>
            <p className="text-sky-600 font-semibold">{title || 'Luxury Real Estate'}</p>
          </div>
          <div className="text-3xl">🏡</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-sky-50 p-3 rounded">
            <div className="text-lg font-bold text-gray-900">$50M+</div>
            <div className="text-xs text-sky-700">Sales Volume</div>
          </div>
          <div className="bg-sky-50 p-3 rounded">
            <div className="text-lg font-bold text-gray-900">200+</div>
            <div className="text-xs text-sky-700">Properties Sold</div>
          </div>
        </div>
        <div className="border-t border-sky-200 pt-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-4 h-4 bg-sky-400 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 21. Gaming Streamer
export function GamerPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-8 rounded-lg shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50"></div>
      <div className="relative text-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs uppercase tracking-widest text-red-300">Live</span>
            </div>
            <h1 className="text-3xl font-black">{name || 'GamerTag'}</h1>
            <p className="text-pink-200 text-sm">{title || 'Pro Gamer & Streamer'}</p>
          </div>
          <div className="text-4xl">🎮</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/10 backdrop-blur p-2 rounded text-center border border-white/20">
            <div className="text-lg font-bold">50K</div>
            <div className="text-xs text-purple-200">Followers</div>
          </div>
          <div className="bg-white/10 backdrop-blur p-2 rounded text-center border border-white/20">
            <div className="text-lg font-bold">1.2M</div>
            <div className="text-xs text-pink-200">Views</div>
          </div>
          <div className="bg-white/10 backdrop-blur p-2 rounded text-center border border-white/20">
            <div className="text-lg font-bold">500+</div>
            <div className="text-xs text-red-200">Streams</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 22. Academic/Researcher
export function AcademicPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl border-4 border-blue-900">
      <div className="space-y-4">
        <div className="text-center border-b-2 border-blue-900 pb-3">
          <h1 className="text-2xl font-serif text-blue-900 mb-1">{name || 'Dr. Academic Name'}</h1>
          <p className="text-sm text-gray-700">{title || 'PhD, Research Professor'}</p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-900">50+</div>
            <div className="text-xs text-gray-600">Publications</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-900">1000+</div>
            <div className="text-xs text-gray-600">Citations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-900">h-20</div>
            <div className="text-xs text-gray-600">Index</div>
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2].map(i => (
            <div key={i} className="bg-blue-50 p-2 rounded border-l-4 border-blue-900">
              <div className="h-1.5 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-1.5 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 23. E-commerce Store Owner
export function EcommercePreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-8 rounded-lg shadow-2xl">
      <div className="bg-white rounded-lg p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{name || 'Store Name'}</h1>
            <p className="text-emerald-600 font-semibold text-sm">{title || 'Online Boutique'}</p>
          </div>
          <div className="text-3xl">🛍️</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded flex items-center justify-center">
              <div className="text-2xl opacity-50">📦</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-emerald-50 p-2 rounded text-center">
            <div className="text-sm font-bold text-gray-900">5K+</div>
            <div className="text-xs text-emerald-700">Products</div>
          </div>
          <div className="flex-1 bg-teal-50 p-2 rounded text-center">
            <div className="text-sm font-bold text-gray-900">10K+</div>
            <div className="text-xs text-teal-700">Customers</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 24. Non-Profit/NGO
export function NonProfitPreview({ name, title }: PortfolioPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-green-600 to-lime-600 p-8 rounded-lg shadow-2xl">
      <div className="text-white space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
            ❤️
          </div>
          <div>
            <h1 className="text-2xl font-bold">{name || 'Organization Name'}</h1>
            <p className="text-green-100 text-sm">{title || 'Making a Difference'}</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-xs text-green-200">People Helped</div>
            </div>
            <div>
              <div className="text-2xl font-bold">100+</div>
              <div className="text-xs text-green-200">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold">25</div>
              <div className="text-xs text-green-200">Countries</div>
            </div>
          </div>
        </div>
        <div className="h-2 bg-white/20 rounded">
          <div className="h-full bg-white rounded" style={{width: '75%'}}></div>
        </div>
      </div>
    </div>
  )
}

// 25. Podcast Host
export function PodcastPreview({ name, title }: PortfolioPreviewProps) {
  // Use deterministic heights based on bar index to avoid hydration mismatch
  const barHeights = [35, 42, 28, 38, 32, 45, 38, 42]
  
  return (
    <div className="bg-gradient-to-br from-violet-600 to-purple-700 p-8 rounded-lg shadow-2xl relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent"></div>
      <div className="relative text-white space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-3xl border-2 border-white/30">
            🎙️
          </div>
          <div>
            <h1 className="text-2xl font-bold">{name || 'Podcast Name'}</h1>
            <p className="text-violet-200 text-sm">{title || 'Host & Producer'}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur p-3 rounded border border-white/20">
            <div className="text-xl font-bold">100+</div>
            <div className="text-xs text-violet-200">Episodes</div>
          </div>
          <div className="bg-white/10 backdrop-blur p-3 rounded border border-white/20">
            <div className="text-xl font-bold">50K+</div>
            <div className="text-xs text-violet-200">Listeners</div>
          </div>
        </div>
        <div className="flex gap-1">
          {barHeights.map((height, i) => (
            <div key={i} className={`flex-1 bg-white/30 rounded-t`} style={{height: `${height}px`}}></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const portfolioTemplates = [
  { id: 1, name: "Modern Developer", component: ModernDeveloperPreview, category: "Tech", gradient: "from-blue-500 to-purple-600" },
  { id: 2, name: "Creative Designer", component: CreativeDesignerPreview, category: "Design", gradient: "from-pink-500 to-orange-500" },
  { id: 3, name: "Professional Business", component: ProfessionalBusinessPreview, category: "Business", gradient: "from-gray-700 to-gray-900" },
  { id: 4, name: "Minimalist Portfolio", component: MinimalistPreview, category: "Minimal", gradient: "from-teal-500 to-cyan-600" },
  { id: 5, name: "Bold Entrepreneur", component: BoldEntrepreneurPreview, category: "Business", gradient: "from-red-500 to-orange-600" },
  { id: 6, name: "Artistic Showcase", component: ArtisticShowcasePreview, category: "Creative", gradient: "from-purple-500 to-indigo-600" },
  { id: 7, name: "Tech Startup", component: TechStartupPreview, category: "Tech", gradient: "from-gray-900 to-blue-900" },
  { id: 8, name: "Photography", component: PhotographyPreview, category: "Creative", gradient: "from-black to-gray-800" },
  { id: 9, name: "Agency/Studio", component: AgencyPreview, category: "Business", gradient: "from-slate-800 to-amber-600" },
  { id: 10, name: "Corporate Professional", component: CorporatePreview, category: "Business", gradient: "from-blue-600 to-blue-800" },
  { id: 11, name: "Freelancer Portfolio", component: FreelancerPreview, category: "Freelance", gradient: "from-teal-400 to-cyan-500" },
  { id: 12, name: "Developer Showcase", component: DevShowcasePreview, category: "Tech", gradient: "from-gray-900 to-green-900" },
  { id: 13, name: "Fashion & Lifestyle", component: FashionPreview, category: "Creative", gradient: "from-rose-400 to-fuchsia-500" },
  { id: 14, name: "Consultant Profile", component: ConsultantPreview, category: "Business", gradient: "from-indigo-600 to-violet-700" },
  { id: 15, name: "Writer & Blogger", component: WriterPreview, category: "Creative", gradient: "from-amber-400 to-amber-600" },
  { id: 16, name: "Architect Portfolio", component: ArchitectPreview, category: "Design", gradient: "from-gray-400 to-gray-600" },
  { id: 17, name: "Music Artist", component: MusicArtistPreview, category: "Creative", gradient: "from-green-500 to-emerald-600" },
  { id: 18, name: "Chef & Culinary", component: ChefPreview, category: "Lifestyle", gradient: "from-orange-400 to-red-500" },
  { id: 19, name: "Fitness Coach", component: FitnessPreview, category: "Lifestyle", gradient: "from-black to-red-900" },
  { id: 20, name: "Real Estate Agent", component: RealEstatePreview, category: "Business", gradient: "from-sky-500 to-blue-600" },
  { id: 21, name: "Gaming Streamer", component: GamerPreview, category: "Entertainment", gradient: "from-purple-600 to-red-600" },
  { id: 22, name: "Academic Researcher", component: AcademicPreview, category: "Education", gradient: "from-blue-900 to-indigo-900" },
  { id: 23, name: "E-commerce Store", component: EcommercePreview, category: "Business", gradient: "from-emerald-400 to-teal-500" },
  { id: 24, name: "Non-Profit/NGO", component: NonProfitPreview, category: "Social", gradient: "from-green-600 to-lime-600" },
  { id: 25, name: "Podcast Host", component: PodcastPreview, category: "Entertainment", gradient: "from-violet-600 to-purple-700" },
]
