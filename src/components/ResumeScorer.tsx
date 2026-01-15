'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  Target,
} from 'lucide-react';
import {
  scoreResume,
  optimizeForATS,
  matchResumeWithJob,
  type ResumeScore,
} from '@/lib/linkedin-scraper';

interface ResumeScorerProps {
  resumeData: any;
  jobDescription?: string;
}

interface ScorerState {
  resumeScore: ResumeScore | null;
  atsWarnings: string[];
  jobMatch: any;
  isLoading: boolean;
}

export default function ResumeScorer({
  resumeData,
  jobDescription,
}: ResumeScorerProps) {
  const [state, setState] = useState<ScorerState>({
    resumeScore: null,
    atsWarnings: [],
    jobMatch: null,
    isLoading: true,
  });

  useEffect(() => {
    const scoreAndOptimize = async () => {
      try {
        // Score resume
        const score = scoreResume(resumeData);

        // Optimize for ATS
        const { warnings } = optimizeForATS(resumeData);

        // Match with job description if provided
        let jobMatch = null;
        if (jobDescription) {
          jobMatch = matchResumeWithJob(resumeData, jobDescription);
        }

        setState({
          resumeScore: score,
          atsWarnings: warnings,
          jobMatch,
          isLoading: false,
        });
      } catch (error) {
        console.error('Scoring error:', error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    scoreAndOptimize();
  }, [resumeData, jobDescription]);

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lemon-500"></div>
      </div>
    );
  }

  if (!state.resumeScore) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className={`p-6 rounded-lg border ${getScoreBgColor(state.resumeScore.overallScore)}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp size={24} className={getScoreColor(state.resumeScore.overallScore)} />
            Resume Score
          </h2>
          <div className="text-4xl font-bold" style={{
            color: state.resumeScore.overallScore >= 80 ? '#16a34a' : 
                   state.resumeScore.overallScore >= 60 ? '#eab308' : '#dc2626'
          }}>
            {state.resumeScore.overallScore}%
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {state.resumeScore.overallScore >= 80
            ? 'Excellent! Your resume is well-structured and complete.'
            : state.resumeScore.overallScore >= 60
            ? 'Good! Your resume has room for improvement.'
            : 'Fair. Add more details to strengthen your resume.'}
        </p>
      </div>

      {/* Section Scores */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Section Breakdown
        </h3>
        <div className="space-y-4">
          {Object.entries(state.resumeScore.sections).map(
            ([section, score]: [string, any]) => (
              <div key={section}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {section.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
                    {score}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      score >= 80
                        ? 'bg-green-500'
                        : score >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* ATS Warnings */}
      {state.atsWarnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
            <AlertCircle size={20} />
            ATS Optimization Issues
          </h3>
          <ul className="space-y-3">
            {state.atsWarnings.map((warning, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-amber-800"
              >
                <span className="text-amber-500 mt-1">⚠</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvement Suggestions */}
      {state.resumeScore.suggestions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Zap size={20} />
            Improvement Suggestions
          </h3>
          <ul className="space-y-3">
            {state.resumeScore.suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-blue-800"
              >
                <span className="text-blue-500 mt-1">💡</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Job Match */}
      {state.jobMatch && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
            <Target size={20} />
            Job Match Score
          </h3>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-purple-700">
                Match: {state.jobMatch.matchScore}%
              </span>
              <span className={`text-sm font-semibold ${
                state.jobMatch.matchScore >= 70 ? 'text-green-600' :
                state.jobMatch.matchScore >= 50 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {state.jobMatch.matchScore >= 70 ? 'Strong' :
                 state.jobMatch.matchScore >= 50 ? 'Moderate' : 'Weak'}
              </span>
            </div>
            <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  state.jobMatch.matchScore >= 70
                    ? 'bg-green-500'
                    : state.jobMatch.matchScore >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${state.jobMatch.matchScore}%` }}
              />
            </div>
          </div>

          {/* Matched Skills */}
          {state.jobMatch.matchedSkills.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                Matching Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {state.jobMatch.matchedSkills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {state.jobMatch.missingSkills.length > 0 && (
            <div>
              <p className="text-sm font-medium text-purple-900 mb-2 flex items-center gap-2">
                <AlertCircle size={16} className="text-orange-600" />
                Missing Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {state.jobMatch.missingSkills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {state.jobMatch.recommendations.length > 0 && (
            <div className="mt-4 pt-4 border-t border-purple-200">
              <p className="text-sm font-medium text-purple-900 mb-2">
                Recommendations:
              </p>
              <ul className="space-y-1">
                {state.jobMatch.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="text-xs text-purple-800 flex items-start gap-2">
                    <span className="text-purple-500 mt-1">→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
