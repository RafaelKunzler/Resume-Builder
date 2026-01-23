import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFormContext, useWatch } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button'
import { Card } from './ui/card'
import Infocard from './Infocard'

const Projects = () => {
  const { t } = useTranslation()

  const {
    register,
    setValue,
    getValues,
    resetField,
    formState: { errors },
  } = useFormContext()

  const projects = useWatch({
    name: "projects",
  })

  const [editingIndex, setEditingIndex] = useState(null)

  // Handle editing a project
  const handleEditProject = (index) => {
    const project = projects[index]
    setValue("projectForm.name", project.name || "")
    setValue("projectForm.description", project.description || "")
    setValue("projectForm.technologies", project.technologies || "")
    setValue("projectForm.url", project.url || "")
    setValue("projectForm.github", project.github || "")
    setValue("projectForm.features", project.features || "")
    setEditingIndex(index)
  }

  // Handle saving edited project
  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedProjects = [...projects]
      const formData = getValues("projectForm")

      updatedProjects[editingIndex] = {
        name: formData.name,
        description: formData.description,
        technologies: formData.technologies,
        url: formData.url,
        github: formData.github,
        features: formData.features
      }

      setValue("projects", updatedProjects, { shouldDirty: true })

      // Clear form and reset state
      resetField("projectForm.name")
      resetField("projectForm.description")
      resetField("projectForm.technologies")
      resetField("projectForm.url")
      resetField("projectForm.github")
      resetField("projectForm.features")
      setEditingIndex(null)
    }
  }

  // Handle canceling edit
  const handleCancelEdit = () => {
    resetField("projectForm.name")
    resetField("projectForm.description")
    resetField("projectForm.technologies")
    resetField("projectForm.url")
    resetField("projectForm.github")
    resetField("projectForm.features")
    setEditingIndex(null)
  }

  const handleAddProject = () => {
    const formData = getValues("projectForm")
    const currentList = getValues("projects") || []

    setValue("projects", [...currentList, formData], {
      shouldDirty: true,
    })

    // Reset all form fields individually
    resetField("projectForm.name")
    resetField("projectForm.description")
    resetField("projectForm.technologies")
    resetField("projectForm.url")
    resetField("projectForm.github")

  }

  const handleDeleteProject = (index) => {
    const currentList = getValues("projects") || []
    const newList = currentList.filter((_, i) => i !== index)
    setValue("projects", newList, {
      shouldDirty: true,
    })
  }

  const handleMoveProject = (index, direction) => {
    const currentList = getValues("projects") || []
    const newList = [...currentList]

    if (direction === 'up' && index > 0) {
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]]
    } else if (direction === 'down' && index < newList.length - 1) {
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
    }

    setValue("projects", newList, {
      shouldDirty: true,
    })
  }

  return (
    <div className='flex flex-col gap-6 px-7 py-2 mb-8'>
      <h1 className='font-bold text-lg'>{t('Portfolio Projects')}</h1>
      <div className='flex flex-col gap-4'>

        {projects?.map((project, index) => (
          <div key={index}>
            {editingIndex === index ? (
              // Edit form
              <Card className="p-4 border-2 border-purple-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">{t('Edit Project')}</h3>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleSaveEdit}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {t('Save')}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancelEdit}
                      variant="outline"
                    >
                      {t('Cancel')}
                    </Button>
                  </div>
                </div>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="projectForm.name">{t('Project Name')}: </FieldLabel>
                    <Input
                      {...register("projectForm.name")}
                      type="text"
                      placeholder={t('Enter project name...')}
                      className={errors.projects?.name ? "border-red-500 focus-visible:border-red-500" : ""}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="projectForm.description">{t('Description')}: </FieldLabel>
                    <Textarea
                      {...register("projectForm.description")}
                      placeholder={t('Brief description of the project...')}
                      className={errors.projects?.description ? "border-red-500 focus-visible:border-red-500" : ""}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="projectForm.technologies">{t('Technologies/Tools')}: </FieldLabel>
                    <Input
                      {...register("projectForm.technologies")}
                      type="text"
                      placeholder={t('e.g., React, Node.js, MongoDB...')}
                      className={errors.projects?.technologies ? "border-red-500 focus-visible:border-red-500" : ""}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="projectForm.github">{t('GitHub Repository (optional):')}</FieldLabel>
                    <Input
                      {...register("projectForm.github")}
                      type="url"
                      placeholder={t('https://github.com/username/repo')}
                      className={errors.projects?.github ? "border-red-500 focus-visible:border-red-500" : ""}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="projectForm.url">{t('Project URL (optional):')}</FieldLabel>
                    <Input
                      {...register("projectForm.url")}
                      type="text"
                      placeholder={t('https://your-project.com')}
                      className={errors.projects?.url ? "border-red-500 focus-visible:border-red-500" : ""}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="projectForm.features">{t('Key Features & Achievements')}:</FieldLabel>
                    <Textarea
                      {...register("projectForm.features")}
                      placeholder={t('List key features, challenges overcome, or notable achievements...')}
                      className={errors.projects?.features ? "border-red-500 focus-visible:border-red-500" : ""}
                    />
                  </Field>
                </FieldGroup>
              </Card>
            ) : (
              <Infocard
                title={project.name}
                company={project.technologies}
                location={project.url ? `${t('Live Demo')}: ${project.url}` : ''}
                start=""
                end=""
                onDelete={() => handleDeleteProject(index)}
                onEdit={() => handleEditProject(index)}
                onMoveUp={() => handleMoveProject(index, 'up')}
                onMoveDown={() => handleMoveProject(index, 'down')}
                canMoveUp={index > 0}
                canMoveDown={index < projects.length - 1}
              />
            )}
          </div>
        ))}

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="projectForm.name">{t('Project Name')}: </FieldLabel>
            <Input
              {...register("projectForm.name")}
              type="text"
              placeholder={t('Enter project name...')}
              className={errors.projects?.name ? "border-red-500 focus-visible:border-red-500" : ""}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="projectForm.description">{t('Description')}: </FieldLabel>
            <Textarea
              {...register("projectForm.description")}
              placeholder={t('Brief description of the project...')}
              rows={3}
              className={errors.projects?.description ? "border-red-500 focus-visible:border-red-500" : ""}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="projectForm.technologies">{t('Technologies/Tools')}: </FieldLabel>
            <Input
              {...register("projectForm.technologies")}
              type="text"
              placeholder={t('e.g., React, Node.js, MongoDB...')}
              className={errors.projects?.technologies ? "border-red-500 focus-visible:border-red-500" : ""}
            />
          </Field>

          <FieldGroup className="grid max-w-md grid-cols-1 gap-4">
            <Field>
              <FieldLabel htmlFor="projectForm.url">{t('Project URL (optional):')}</FieldLabel>
              <Input
                {...register("projectForm.url")}
                type="url"
                placeholder={t('https://your-project.com')}
                className={errors.projects?.url ? "border-red-500 focus-visible:border-red-500" : ""}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="projectForm.github">{t('GitHub Repository (optional):')}</FieldLabel>
              <Input
                {...register("projectForm.github")}
                type="url"
                placeholder={t('https://github.com/username/repo')}
                className={errors.projects?.github ? "border-red-500 focus-visible:border-red-500" : ""}
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="projectForm.features">{t('Key Features & Achievements')}</FieldLabel>
              <Textarea
                {...register("projectForm.features")}
                placeholder={t('List key features, challenges overcome, or notable achievements...')}
                rows={4}
                className={errors.projects?.features ? "border-red-500 focus-visible:border-red-500" : ""}
              />
            </Field>
          </FieldGroup>

          <Button
            type="button"
            onClick={handleAddProject}
          >
            {t('Add Project')}
          </Button>
        </FieldGroup>
      </div>
    </div>
  )
}

export default Projects