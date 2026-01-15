import { NextRequest, NextResponse } from 'next/server';

/**
 * AI Resume Summary Generator
 * Uses OpenAI or similar to generate professional summaries
 */

export async function POST(request: NextRequest) {
  try {
    const { profile, jobDescription } = await request.json();

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile data is required' },
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

    // Build prompt for AI
    const prompt = buildSummaryPrompt(profile, jobDescription);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert resume writer. Generate professional, ATS-optimized resume summaries based on user profiles and job descriptions.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      return NextResponse.json(
        { error: 'Failed to generate summary' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const summary =
      data.choices?.[0]?.message?.content ||
      'Unable to generate summary';

    return NextResponse.json({
      summary: summary.trim(),
    });
  } catch (error) {
    console.error('Summary Generation Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function buildSummaryPrompt(profile: any, jobDescription?: string): string {
  const baseInfo = `
Name: ${profile.firstName} ${profile.lastName}
Headline: ${profile.headline}
Years of Experience: ${calculateYearsOfExperience(profile.experience)}
Top Skills: ${profile.skills?.slice(0, 5).join(', ') || 'N/A'}
Key Experiences: ${profile.experience
    ?.slice(0, 2)
    .map((exp: any) => `${exp.title} at ${exp.company}`)
    .join(', ')}
`;

  let prompt = `Generate a professional resume summary for the following candidate:\n${baseInfo}`;

  if (jobDescription) {
    prompt += `\n\nOptimize this summary for the following job description:\n${jobDescription}`;
    prompt +=
      '\n\nEnsure the summary highlights relevant skills and experiences that match the job requirements.';
  } else {
    prompt +=
      '\n\nCreate a compelling professional summary that showcases their strengths and career goals.';
  }

  prompt +=
    '\n\nThe summary should be 2-3 sentences, use action words, and be ATS-compatible.';

  return prompt;
}

function calculateYearsOfExperience(experience: any[]): number {
  if (!experience || experience.length === 0) return 0;

  let totalMonths = 0;

  experience.forEach((exp: any) => {
    if (exp.startDate && exp.endDate) {
      const start = new Date(exp.startDate);
      const end = new Date(exp.endDate);
      totalMonths += (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30);
    } else if (exp.startDate && exp.currentlyWorking) {
      const start = new Date(exp.startDate);
      const now = new Date();
      totalMonths += (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30);
    }
  });

  return Math.round(totalMonths / 12);
}
