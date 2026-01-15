import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

/**
 * Generate text embeddings for semantic search
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const result = await hf.featureExtraction({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    inputs: text,
  })

  if (Array.isArray(result)) {
    if (Array.isArray(result[0])) {
      return result[0] as number[]
    }
    return result as number[]
  }
  return [result as number]
}

/**
 * Classify resume section type
 */
export async function classifyResumeSection(
  text: string
): Promise<string> {
  const result: any = await hf.zeroShotClassification({
    model: 'facebook/bart-large-mnli',
    inputs: text,
    parameters: {
      candidate_labels: [
        'work experience',
        'education',
        'skills',
        'projects',
        'certifications',
        'personal information',
        'summary',
      ],
    },
  })

  return result.labels?.[0] || 'personal information'
}

/**
 * Extract keywords from job description
 */
export async function extractKeywords(
  jobDescription: string
): Promise<string[]> {
  const result = await hf.tokenClassification({
    model: 'dslim/bert-base-NER',
    inputs: jobDescription,
  })

  // Extract unique entities
  const keywords = new Set<string>()
  result.forEach((token) => {
    if (token.entity_group === 'MISC' || token.entity_group === 'ORG') {
      keywords.add(token.word)
    }
  })

  return Array.from(keywords)
}

/**
 * Summarize long text
 */
export async function summarizeText(
  text: string,
  maxLength: number = 150
): Promise<string> {
  const result = await hf.summarization({
    model: 'facebook/bart-large-cnn',
    inputs: text,
    parameters: {
      max_length: maxLength,
      min_length: 30,
    },
  })

  return result.summary_text
}

export { hf }
