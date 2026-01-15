'use client';

import React, { useState } from 'react';
import {
  RESUME_TEMPLATES,
  downloadResume,
  exportToHTML,
} from '@/lib/resume-templates';
import { Download, Eye, ExternalLink } from 'lucide-react';

interface ResumeSelectorProps {
  resumeData: any;
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export default function ResumeTemplateSelector({
  resumeData,
  selectedTemplate,
  onTemplateSelect,
}: ResumeSelectorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(selectedTemplate);
  const [isExporting, setIsExporting] = useState(false);

  const currentTemplate = RESUME_TEMPLATES.find(
    (t) => t.id === selectedTemplate
  );

  const handlePreview = (templateId: string) => {
    setPreviewTemplate(templateId);
    setShowPreview(true);
  };

  const handleExport = async (format: 'pdf' | 'html' | 'docx') => {
    setIsExporting(true);
    try {
      await downloadResume(resumeData, selectedTemplate, format);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export resume. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getPreviewHTML = () => {
    return exportToHTML(resumeData, previewTemplate);
  };

  return (
    <div className="space-y-6">
      {/* Template Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choose Template
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RESUME_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? 'border-lemon-500 bg-lemon-50'
                  : 'border-gray-200 bg-white hover:border-lemon-300'
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-lemon-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Selected
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {template.description}
              </p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Features:
                </p>
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(template.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded transition-colors"
                >
                  <Eye size={16} />
                  Preview
                </button>
                {template.overleafUrl && (
                  <a
                    href={template.overleafUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} />
                    Overleaf
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Template Info */}
      {currentTemplate && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {currentTemplate.name}
          </h3>
          <p className="text-gray-600 mb-4">{currentTemplate.description}</p>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Customizable Fields:
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {currentTemplate.fields.map((field) => (
                <div key={field.name} className="p-3 bg-gray-50 rounded">
                  <p className="font-medium text-sm text-gray-900">
                    {field.name}
                  </p>
                  <p className="text-xs text-gray-600">{field.section}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Download Resume</h4>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleExport('pdf')}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
              >
                <Download size={18} />
                PDF
              </button>
              <button
                onClick={() => handleExport('html')}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
              >
                <Download size={18} />
                HTML
              </button>
              <button
                onClick={() => handleExport('docx')}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
              >
                <Download size={18} />
                DOCX
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <iframe
                srcDoc={getPreviewHTML()}
                className="w-full h-full border-0"
                title="Resume Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
