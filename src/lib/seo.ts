import { Metadata } from 'next'

export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
  canonical?: string
  noindex?: boolean
  author?: string
}

const defaultConfig = {
  siteName: 'Resumint',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://resumint.com',
  defaultTitle: 'Resumint - AI-Powered Resume & Portfolio Builder',
  defaultDescription: 'Create stunning resumes and portfolio websites in minutes with AI assistance. 50+ professional templates, instant PDF export, ATS-optimized, and completely free to start.',
  defaultKeywords: [
    'resume builder',
    'AI resume',
    'portfolio builder',
    'resume maker',
    'CV builder',
    'professional resume',
    'ATS resume',
    'free resume builder',
    'online resume',
    'portfolio website',
    'career tools',
    'job application',
    'resume templates',
    'CV templates',
    'LinkedIn resume',
  ],
  defaultImage: 'https://xerothermic-beige-i5tbo3rmdi.edgeone.dev/resumint.png',
  twitterHandle: '@resumint',
  author: 'Fahad Khan',
}

export function generateMetadata(config: SEOConfig = {}): Metadata {
  const title = config.title
    ? `${config.title} | ${defaultConfig.defaultTitle}`
    : defaultConfig.defaultTitle

  const description = config.description || defaultConfig.defaultDescription
  const keywords = config.keywords || defaultConfig.defaultKeywords
  const ogImage = config.ogImage || defaultConfig.defaultImage
  const canonical = config.canonical
    ? `${defaultConfig.siteUrl}${config.canonical}`
    : undefined

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: config.author || defaultConfig.author }],
    creator: defaultConfig.author,
    publisher: defaultConfig.siteName,
    robots: config.noindex
      ? 'noindex,nofollow'
      : 'index,follow',
    alternates: canonical ? {
      canonical,
    } : undefined,
    openGraph: {
      type: (config.ogType as any) || 'website',
      title,
      description,
      siteName: defaultConfig.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: defaultConfig.twitterHandle,
    },
    icons: {
      icon: defaultConfig.defaultImage,
      apple: defaultConfig.defaultImage,
    },
    manifest: '/manifest.json',
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    },
  }
}

export function generateStructuredData(type: 'Organization' | 'WebSite' | 'FAQPage', data?: any) {
  const baseUrl = defaultConfig.siteUrl

  if (type === 'Organization') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: defaultConfig.siteName,
      description: defaultConfig.defaultDescription,
      url: baseUrl,
      logo: defaultConfig.defaultImage,
      founder: {
        '@type': 'Person',
        name: defaultConfig.author,
      },
      sameAs: [
        // Add social media links here
      ],
    }
  }

  if (type === 'WebSite') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: defaultConfig.siteName,
      description: defaultConfig.defaultDescription,
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }
  }

  if (type === 'FAQPage' && data?.faqs) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map((faq: any) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }
  }

  return null
}
