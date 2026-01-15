'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Download, Share2, Edit3 } from 'lucide-react';

interface PortfolioSection {
  title: string;
  description: string;
  items: any[];
}

interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  social: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
  };
  skills: string[];
  experience: any[];
  education: any[];
  projects: any[];
}

interface PortfolioPreviewProps {
  data: PortfolioData;
  onEdit?: (section: string) => void;
  onShare?: () => void;
}

export default function PortfolioPreview({
  data,
  onEdit,
  onShare,
}: PortfolioPreviewProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile'>('desktop');

  const previewContent = (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-lemon-500 to-lemon-600 text-white py-16 px-6">
        <div className="container-large text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{data.name}</h1>
          <p className="text-xl text-lemon-100 mb-4">{data.title}</p>
          <p className="text-lemon-50 max-w-2xl mx-auto mb-6">{data.bio}</p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="hover:text-lemon-200 transition"
              >
                ✉️ {data.email}
              </a>
            )}
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="hover:text-lemon-200 transition"
              >
                📱 {data.phone}
              </a>
            )}
            {data.location && (
              <span className="hover:text-lemon-200">📍 {data.location}</span>
            )}
          </div>

          {/* Social Links */}
          {Object.values(data.social).some(Boolean) && (
            <div className="flex justify-center gap-4 mt-6">
              {data.social.linkedin && (
                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-10 h-10 bg-white text-lemon-600 rounded-full flex items-center justify-center hover:bg-lemon-100 transition"
                  title="LinkedIn"
                >
                  in
                </a>
              )}
              {data.social.github && (
                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-10 h-10 bg-white text-lemon-600 rounded-full flex items-center justify-center hover:bg-lemon-100 transition"
                  title="GitHub"
                >
                  GH
                </a>
              )}
              {data.social.portfolio && (
                <a
                  href={data.social.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-10 h-10 bg-white text-lemon-600 rounded-full flex items-center justify-center hover:bg-lemon-100 transition"
                  title="Portfolio"
                >
                  🔗
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <div className="py-12 px-6 bg-gray-50">
          <div className="container-large">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              Skills
              {onEdit && (
                <button
                  onClick={() => onEdit('skills')}
                  className="ml-auto p-2 hover:bg-lemon-100 rounded-lg transition"
                  title="Edit"
                >
                  <Edit3 size={18} className="text-lemon-600" />
                </button>
              )}
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-lemon-100 text-lemon-800 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <div className="py-12 px-6">
          <div className="container-large">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              Experience
              {onEdit && (
                <button
                  onClick={() => onEdit('experience')}
                  className="ml-auto p-2 hover:bg-lemon-100 rounded-lg transition"
                  title="Edit"
                >
                  <Edit3 size={18} className="text-lemon-600" />
                </button>
              )}
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-lemon-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {exp.jobTitle}
                  </h3>
                  <p className="text-lemon-600 font-semibold">{exp.company}</p>
                  <p className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <div className="py-12 px-6 bg-gray-50">
          <div className="container-large">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              Education
              {onEdit && (
                <button
                  onClick={() => onEdit('education')}
                  className="ml-auto p-2 hover:bg-lemon-100 rounded-lg transition"
                  title="Edit"
                >
                  <Edit3 size={18} className="text-lemon-600" />
                </button>
              )}
            </h2>
            <div className="space-y-8">
              {data.education.map((edu, idx) => (
                <div key={idx} className="border-l-4 border-lemon-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {edu.school}
                  </h3>
                  {edu.degree && (
                    <p className="text-lemon-600 font-semibold">
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <div className="py-12 px-6">
          <div className="container-large">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              Projects
              {onEdit && (
                <button
                  onClick={() => onEdit('projects')}
                  className="ml-auto p-2 hover:bg-lemon-100 rounded-lg transition"
                  title="Edit"
                >
                  <Edit3 size={18} className="text-lemon-600" />
                </button>
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      {project.description}
                    </p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lemon-600 hover:text-lemon-700 font-medium text-sm"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Footer */}
      <div className="bg-lemon-50 border-t-4 border-lemon-500 py-12 px-6">
        <div className="container-large text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-gray-700 mb-6">
            Get in touch and let's create something amazing!
          </p>
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="inline-block bg-lemon-500 hover:bg-lemon-600 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Contact Me
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded transition"
          >
            {showPreview ? <Eye size={18} /> : <EyeOff size={18} />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded p-1">
            <button
              onClick={() => setActiveTab('desktop')}
              className={`px-3 py-1 rounded transition ${
                activeTab === 'desktop'
                  ? 'bg-white text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              💻 Desktop
            </button>
            <button
              onClick={() => setActiveTab('mobile')}
              className={`px-3 py-1 rounded transition ${
                activeTab === 'mobile'
                  ? 'bg-white text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              📱 Mobile
            </button>
          </div>

          {onShare && (
            <button
              onClick={onShare}
              className="flex items-center gap-2 px-4 py-2 text-lemon-600 hover:bg-lemon-50 rounded transition"
            >
              <Share2 size={18} />
              Share
            </button>
          )}

          <button className="flex items-center gap-2 px-4 py-2 text-lemon-600 hover:bg-lemon-50 rounded transition">
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div
          className={`rounded-lg overflow-hidden border border-gray-200 bg-gray-100 ${
            activeTab === 'mobile'
              ? 'max-w-md mx-auto'
              : 'w-full'
          }`}
        >
          <div
            className={`${
              activeTab === 'mobile'
                ? 'rounded-2xl overflow-hidden border-8 border-gray-900'
                : ''
            }`}
          >
            {previewContent}
          </div>
        </div>
      )}
    </div>
  );
}
