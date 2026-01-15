'use client';

import React, { useState } from 'react';
import { Linkedin, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import {
  fetchLinkedInProfile,
  convertLinkedInToResume,
  scoreResume,
} from '@/lib/linkedin-scraper';

interface LinkedInImporterProps {
  onImportSuccess?: (resumeData: any) => void;
  onError?: (error: string) => void;
}

type ImportStep = 'idle' | 'connecting' | 'fetching' | 'converting' | 'success';

export default function LinkedInImporter({
  onImportSuccess,
  onError,
}: LinkedInImporterProps) {
  const [step, setStep] = useState<ImportStep>('idle');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [score, setScore] = useState<any>(null);

  const validateLinkedInUrl = (url: string): boolean => {
    const linkedinUrlPattern =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/;
    return linkedinUrlPattern.test(url.trim());
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateLinkedInUrl(linkedInUrl)) {
      setError(
        'Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourprofile)'
      );
      onError?.(error);
      return;
    }

    try {
      setStep('connecting');
      const profile = await fetchLinkedInProfile(linkedInUrl);

      if (!profile) {
        setError(
          'Failed to fetch LinkedIn profile. Please check the URL and try again.'
        );
        setStep('idle');
        onError?.('Failed to fetch profile');
        return;
      }

      setStep('converting');
      const resumeData = convertLinkedInToResume(profile);

      setStep('success');
      setSuccessMessage(
        'Successfully imported your LinkedIn profile! Your resume has been populated with your information.'
      );

      // Score the resume
      const resumeScore = scoreResume(resumeData);
      setScore(resumeScore);

      onImportSuccess?.(resumeData);

      // Reset form after 2 seconds
      setTimeout(() => {
        setLinkedInUrl('');
        setStep('idle');
      }, 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setStep('idle');
      onError?.(errorMessage);
    }
  };

  const getStepMessage = () => {
    switch (step) {
      case 'connecting':
        return 'Connecting to LinkedIn...';
      case 'fetching':
        return 'Fetching your profile...';
      case 'converting':
        return 'Converting to resume format...';
      case 'success':
        return 'Import successful!';
      default:
        return 'Import from LinkedIn';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <Linkedin size={24} />
            <h2 className="text-xl font-semibold">Import from LinkedIn</h2>
          </div>
          <p className="text-blue-100 text-sm">
            Automatically populate your resume from your LinkedIn profile
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success State */}
          {step === 'success' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <p className="text-center text-green-600 font-medium">
                {successMessage}
              </p>

              {/* Resume Score */}
              {score && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-3">
                    Resume Score: {score.overallScore}%
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(score.sections).map(
                      ([section, value]: [string, any]) => (
                        <div key={section} className="flex justify-between items-center">
                          <span className="text-sm text-green-800 capitalize">
                            {section.replace(/([A-Z])/g, ' $1')}:
                          </span>
                          <div className="w-24 h-2 bg-green-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 transition-all"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-green-900 w-8 text-right">
                            {value}%
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  {/* Suggestions */}
                  {score.suggestions.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <p className="text-sm font-semibold text-green-900 mb-2">
                        Suggestions:
                      </p>
                      <ul className="space-y-1">
                        {score.suggestions.map((suggestion: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-xs text-green-800 flex items-start gap-2"
                          >
                            <span className="text-green-500 mt-1">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          {step !== 'success' && (
            <form onSubmit={handleImport} className="space-y-4">
              <div>
                <label htmlFor="linkedin-url" className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  id="linkedin-url"
                  type="url"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  disabled={step !== 'idle'}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Paste your LinkedIn profile URL here
                </p>
              </div>

              <button
                type="submit"
                disabled={step !== 'idle' || !linkedInUrl.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {step !== 'idle' && <Loader size={16} className="animate-spin" />}
                {getStepMessage()}
              </button>
            </form>
          )}

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              How it works:
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>✓ Extracts your profile information</li>
              <li>✓ Populates experience and education</li>
              <li>✓ Imports skills and endorsements</li>
              <li>✓ Scores your resume completeness</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
