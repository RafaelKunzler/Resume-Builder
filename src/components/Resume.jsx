import React from 'react'
import { useTranslation } from 'react-i18next'
import { useWatch, useFormContext } from "react-hook-form"

const Resume = () => {
  const { t } = useTranslation()
  const { control } = useFormContext()

  const personal = useWatch({
    control,
    name: "personal",
  })

  const experience = useWatch({
    control,
    name: "experience",
  })

  const education = useWatch({
    control,
    name: "education",
  })

  const projects = useWatch({
    control,
    name: "projects",
  })

  const skills = useWatch({
    control,
    name: "skills",
  })

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{personal?.name || "Seu Nome"}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personal?.email && <span>📧 {personal.email}</span>}
          {personal?.phone && <span>📱 {personal.phone}</span>}
          {personal?.location && <span>📍 {personal.location}</span>}
          {personal?.linkedin && <span>💼 {personal.linkedin}</span>}
          {personal?.github && <span>💻 {personal.github}</span>}
        </div>
      </div>

      {/* Summary Section */}
      {personal?.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-gray-300 pb-1">{t('Professional Summary')}</h2>
          <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
        </div>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-gray-300 pb-1">{t('Profissional Experience')}</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <p className="text-lg text-gray-700 mb-1">{exp.company}</p>
                {exp.location && <p className="text-sm text-gray-600 mb-2">{exp.location}</p>}
                <p className="text-sm text-gray-600 mb-3">{exp.start} - {exp.end}</p>
                {exp.description && (
                  <div className="text-gray-700">
                    <p className="whitespace-pre-line">{exp.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-gray-300 pb-1">{t('Education')}</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold">{edu.qualification}</h3>
                <p className="text-lg text-gray-700 mb-1">{edu.institution}</p>
                {edu.location && <p className="text-sm text-gray-600 mb-2">{edu.location}</p>}
                <p className="text-sm text-gray-600 mb-3">{edu.start} - {edu.end}</p>
                {edu.gpa && <p className="text-sm text-gray-600 mb-2">GPA: {edu.gpa}</p>}
                {edu.takeaways && (
                  <div className="text-gray-700">
                    <p className="whitespace-pre-line">{edu.takeaways}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-gray-300 pb-1">{t('Portfolio Projects')}</h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-lg text-gray-700 mb-2">{project.technologies}</p>
                {project.description && <p className="text-gray-700 mb-3">{project.description}</p>}
                <div className="flex flex-wrap gap-4 text-sm text-blue-600 mb-3">
                  {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline">🔗 Live Demo</a>}
                  {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:underline">💻 Source Code</a>}
                </div>
                {project.features && (
                  <div className="text-gray-700">
                    <p className="font-medium mb-1">Key Features:</p>
                    <p className="whitespace-pre-line">{project.features}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 border-b-2 border-gray-300 pb-1">{t('Skills')}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Resume