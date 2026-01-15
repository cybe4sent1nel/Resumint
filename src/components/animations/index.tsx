// Lottie Animation Mappings and Component
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

// Animation imports
import companyEmployees from '@/../public/animations/Company employees sharing thoughts and ideas.json'
import downloading from '@/../public/animations/downloading.json'
import error404 from '@/../public/animations/Error 404 Animation.json'
import errorMaintenance from '@/../public/animations/error maintenance.json'
import contactUs from '@/../public/animations/Man with contact us board.json'
import noConnection from '@/../public/animations/No Connection.json'
import programming from '@/../public/animations/Programming.json'
import revenue from '@/../public/animations/Revenue.json'
import saasCloud from '@/../public/animations/saas cloud.json'
import loading from '@/../public/animations/Sandy Loading.json'
import startup from '@/../public/animations/Startup.json'
import taskAssigning from '@/../public/animations/Task Assigning.json'
import team from '@/../public/animations/Team.json'
import uploadData from '@/../public/animations/Upload data.json'
import generateResume from '@/../public/animations/generate resume.json'
import generatePortfolio from '@/../public/animations/generate potfolio.json'

export const animations = {
  // Team & Collaboration
  companyEmployees,
  team,
  
  // Loading & Progress
  downloading,
  loading,
  
  // Errors
  error404,
  errorMaintenance,
  noConnection,
  
  // Features
  programming,
  revenue,
  saasCloud,
  startup,
  taskAssigning,
  uploadData,
  contactUs,
  generateResume,
  generatePortfolio,
}

export type AnimationName = keyof typeof animations

interface AnimationPlayerProps {
  name: AnimationName
  className?: string
  loop?: boolean
  autoplay?: boolean
  style?: React.CSSProperties
}

export function AnimationPlayer({
  name,
  className = '',
  loop = true,
  autoplay = true,
  style,
}: AnimationPlayerProps) {
  const animationData = animations[name]

  if (!animationData) {
    console.warn(`Animation "${name}" not found`)
    return null
  }

  return (
    <div className={className} style={style}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoPlay={autoplay}
      />
    </div>
  )
}

// Usage examples and mapping guide
export const animationUseCases = {
  // Homepage hero section
  hero: 'saasCloud',
  
  // Loading states
  pageLoading: 'loading',
  fileUploading: 'uploadData',
  dataDownloading: 'downloading',
  
  // Error pages
  notFound: 'error404',
  serverError: 'errorMaintenance',
  offline: 'noConnection',
  
  // Feature sections
  aiFeature: 'programming',
  teamFeature: 'team',
  pricingFeature: 'revenue',
  collaborationFeature: 'companyEmployees',
  
  // About/Contact
  aboutTeam: 'team',
  startupStory: 'startup',
  contactSupport: 'contactUs',
} as const

// Alternative component for dynamic animation loading by path
interface LottieAnimationProps {
  animationPath: string
  className?: string
  loop?: boolean
  autoplay?: boolean
}

export function LottieAnimation({
  animationPath,
  className = '',
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  // Extract animation name from path
  const animationName = animationPath.split('/').pop()?.replace('.json', '') || ''
  
  // Map file names to animation keys
  const pathToKey: Record<string, AnimationName> = {
    'Company employees sharing thoughts and ideas': 'companyEmployees',
    'downloading': 'downloading',
    'Error 404 Animation': 'error404',
    'error maintenance': 'errorMaintenance',
    'Man with contact us board': 'contactUs',
    'No Connection': 'noConnection',
    'Programming': 'programming',
    'Revenue': 'revenue',
    'saas cloud': 'saasCloud',
    'Sandy Loading': 'loading',
    'Startup': 'startup',
    'Task Assigning': 'taskAssigning',
    'Team': 'team',
    'Upload data': 'uploadData',
    'generate resume': 'generateResume',
    'generate potfolio': 'generatePortfolio',
  }

  const key = pathToKey[animationName]
  
  if (!key) {
    console.warn(`Animation path "${animationPath}" not mapped`)
    return null
  }

  return <AnimationPlayer name={key} className={className} loop={loop} autoplay={autoplay} />
}
