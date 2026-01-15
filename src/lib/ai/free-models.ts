/**
 * Free AI Models Configuration
 * All models are 100% FREE to use
 */

export const FREE_AI_MODELS = {
  // OpenRouter Free Models
  openRouter: {
    // Meta's Llama 3.1 8B - FREE, fast, good for resume parsing
    llama8b: {
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      provider: 'openrouter',
      apiKey: process.env.OPENROUTER_API_KEY,
      endpoint: 'https://openrouter.ai/api/v1/chat/completions',
      maxTokens: 8192,
      temperature: 0.3,
      useCases: ['resume-parsing', 'text-extraction', 'formatting'],
      speed: 'fast',
      quality: 'good',
    },
    
    // Google Gemma 7B - FREE, balanced
    gemma7b: {
      model: 'google/gemma-2-9b-it:free',
      provider: 'openrouter',
      apiKey: process.env.OPENROUTER_API_KEY,
      endpoint: 'https://openrouter.ai/api/v1/chat/completions',
      maxTokens: 8192,
      temperature: 0.5,
      useCases: ['resume-writing', 'cover-letter', 'optimization'],
      speed: 'medium',
      quality: 'excellent',
    },

    // Mistral 7B - FREE, creative writing
    mistral7b: {
      model: 'mistralai/mistral-7b-instruct:free',
      provider: 'openrouter',
      apiKey: process.env.OPENROUTER_API_KEY,
      endpoint: 'https://openrouter.ai/api/v1/chat/completions',
      maxTokens: 8192,
      temperature: 0.7,
      useCases: ['creative-writing', 'portfolio-bio', 'summaries'],
      speed: 'fast',
      quality: 'good',
    },
  },

  // HuggingFace Free Inference API
  huggingFace: {
    // BART for summarization - FREE
    bart: {
      model: 'facebook/bart-large-cnn',
      provider: 'huggingface',
      apiKey: process.env.HUGGINGFACE_API_KEY,
      endpoint: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      maxTokens: 1024,
      useCases: ['text-summarization', 'job-description-summary'],
      speed: 'fast',
      quality: 'excellent',
    },

    // GPT-2 for text generation - FREE (no API key needed)
    gpt2: {
      model: 'gpt2',
      provider: 'huggingface',
      apiKey: process.env.HUGGINGFACE_API_KEY || 'not-required',
      endpoint: 'https://api-inference.huggingface.co/models/gpt2',
      maxTokens: 1024,
      useCases: ['text-completion', 'bullet-points'],
      speed: 'very-fast',
      quality: 'moderate',
    },

    // T5 for text-to-text - FREE
    t5: {
      model: 'google/flan-t5-large',
      provider: 'huggingface',
      apiKey: process.env.HUGGINGFACE_API_KEY,
      endpoint: 'https://api-inference.huggingface.co/models/google/flan-t5-large',
      maxTokens: 512,
      useCases: ['skill-extraction', 'keyword-optimization'],
      speed: 'fast',
      quality: 'good',
    },
  },

  // Groq (Super Fast, FREE tier)
  groq: {
    // Llama 3 70B - FREE, very fast
    llama70b: {
      model: 'llama3-70b-8192',
      provider: 'groq',
      apiKey: process.env.GROQ_API_KEY,
      endpoint: 'https://api.groq.com/openai/v1/chat/completions',
      maxTokens: 8192,
      temperature: 0.4,
      useCases: ['resume-scoring', 'ats-optimization', 'advice'],
      speed: 'extremely-fast',
      quality: 'excellent',
    },

    // Mixtral 8x7B - FREE, creative
    mixtral: {
      model: 'mixtral-8x7b-32768',
      provider: 'groq',
      apiKey: process.env.GROQ_API_KEY,
      endpoint: 'https://api.groq.com/openai/v1/chat/completions',
      maxTokens: 32768,
      temperature: 0.6,
      useCases: ['portfolio-content', 'project-descriptions'],
      speed: 'very-fast',
      quality: 'excellent',
    },
  },
}

/**
 * AI Model Router - Automatically selects best free model for task
 */
export function selectBestModel(task: string) {
  const modelMap: Record<string, any> = {
    'resume-parsing': FREE_AI_MODELS.openRouter.llama8b,
    'resume-writing': FREE_AI_MODELS.openRouter.gemma7b,
    'resume-scoring': FREE_AI_MODELS.groq.llama70b,
    'ats-optimization': FREE_AI_MODELS.groq.llama70b,
    'cover-letter': FREE_AI_MODELS.openRouter.gemma7b,
    'portfolio-bio': FREE_AI_MODELS.openRouter.mistral7b,
    'text-summarization': FREE_AI_MODELS.huggingFace.bart,
    'skill-extraction': FREE_AI_MODELS.huggingFace.t5,
    'creative-writing': FREE_AI_MODELS.groq.mixtral,
    'bullet-points': FREE_AI_MODELS.huggingFace.gpt2,
    'project-descriptions': FREE_AI_MODELS.groq.mixtral,
  }

  return modelMap[task] || FREE_AI_MODELS.openRouter.llama8b
}

/**
 * Universal AI Call Function
 */
export async function callAI(task: string, prompt: string, options: any = {}) {
  const model = selectBestModel(task)
  const apiKey = model.apiKey
  
  try {
    if (model.provider === 'openrouter' || model.provider === 'groq') {
      const response = await fetch(model.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          ...(model.provider === 'openrouter' && {
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://resumint.com',
            'X-Title': 'Resumint AI Resume Builder',
          }),
        },
        body: JSON.stringify({
          model: model.model,
          messages: [{ role: 'user', content: prompt }],
          temperature: options.temperature || model.temperature,
          max_tokens: options.maxTokens || model.maxTokens,
        }),
      })

      const data = await response.json()
      return data.choices[0].message.content
    }

    if (model.provider === 'huggingface') {
      const response = await fetch(model.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(model.apiKey !== 'not-required' && {
            'Authorization': `Bearer ${apiKey}`,
          }),
        },
        body: JSON.stringify({ inputs: prompt }),
      })

      const data = await response.json()
      return Array.isArray(data) ? data[0].summary_text || data[0].generated_text : data.generated_text
    }
  } catch (error) {
    console.error(`AI call failed for ${model.provider}:`, error)
    throw error
  }
}
