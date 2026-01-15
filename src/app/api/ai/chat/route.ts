import { NextRequest, NextResponse } from 'next/server';

/**
 * AI Chat Handler for Resume Assistant
 */

interface ChatRequest {
  message: string;
  resumeData?: any;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

interface ChatResponse {
  response: string;
  suggestedUpdates?: any;
}

const SYSTEM_PROMPT = `You are an expert resume writing assistant. Help users:
1. Improve their resume content
2. Optimize for ATS (Applicant Tracking Systems)
3. Tailor resumes for specific jobs
4. Provide professional writing suggestions
5. Score and analyze resume completeness

When users ask for specific improvements, analyze their resume data and provide actionable suggestions.
Be encouraging, professional, and specific with your recommendations.
Keep responses concise and focused.`;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { message, resumeData, conversationHistory } =
      (await request.json()) as ChatRequest;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'OpenAI API key not configured',
        },
        { status: 501 }
      );
    }

    // Build conversation messages
    const messages: Array<{
      role: 'system' | 'user' | 'assistant';
      content: string;
    }> = [
      {
        role: 'system',
        content: buildSystemPrompt(resumeData),
      },
    ];

    // Add conversation history
    if (conversationHistory) {
      messages.push(
        ...conversationHistory.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))
      );
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message,
    });

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantResponse =
      data.choices?.[0]?.message?.content ||
      'Unable to generate response';

    // Parse suggested updates from response if any
    const suggestedUpdates = parseSuggestedUpdates(assistantResponse);

    const chatResponse: ChatResponse = {
      response: assistantResponse.trim(),
      suggestedUpdates: suggestedUpdates || undefined,
    };

    return NextResponse.json(chatResponse);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function buildSystemPrompt(resumeData?: any): string {
  let prompt = SYSTEM_PROMPT;

  if (resumeData) {
    const resumeSummary = `
Current Resume Summary:
- Name: ${resumeData.personalInfo?.fullName || 'Not provided'}
- Email: ${resumeData.personalInfo?.email || 'Not provided'}
- Experience entries: ${resumeData.experience?.length || 0}
- Education entries: ${resumeData.education?.length || 0}
- Skills: ${resumeData.skills?.length || 0}
- Current summary: ${resumeData.professionalSummary ? 'Provided' : 'Not provided'}

Use this context to provide relevant suggestions for this specific resume.
`;

    prompt += '\n\n' + resumeSummary;
  }

  return prompt;
}

function parseSuggestedUpdates(response: string): any {
  // Try to extract JSON suggestions from the response
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      return null;
    }
  }
  return null;
}
