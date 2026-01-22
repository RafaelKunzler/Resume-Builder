import React from 'react'
import { useTranslation } from 'react-i18next'

import { useFormContext, useWatch } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button'
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

  const handleAddProject = () => {
    const formData = getValues("projectForm")
    const currentList = getValues("projects") || []

    setValue("projects", [...currentList, formData], {
      shouldDirty: true,
    })

    resetField("projectForm")
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
            <Infocard
              title={project.name}
              company={project.technologies}
              location={project.url ? `🔗 ${project.url}` : ''}
              start=""
              end=""
              onDelete={() => handleDeleteProject(index)}
              onMoveUp={() => handleMoveProject(index, 'up')}
              onMoveDown={() => handleMoveProject(index, 'down')}
              canMoveUp={index > 0}
              canMoveDown={index < projects.length - 1}
             />
          </div>
        ))}

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="projectForm.name">{t('Project Name')}: </FieldLabel>
            <Input
              {...register("projectForm.name")}
              type="text"
              placeholder={t('Enter project name...')}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="projectForm.description">{t('Description')}: </FieldLabel>
            <Textarea
              {...register("projectForm.description")}
              placeholder={t('Brief description of the project...')}
              rows={3}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="projectForm.technologies">{t('Technologies/Tools')}: </FieldLabel>
            <Input
              {...register("projectForm.technologies")}
              type="text"
              placeholder={t('e.g., React, Node.js, MongoDB...')}
            />
          </Field>

          <FieldGroup className="grid max-w-md grid-cols-1 gap-4">
            <Field>
              <FieldLabel htmlFor="projectForm.url">{t('Project URL (optional):')}</FieldLabel>
              <Input
                {...register("projectForm.url")}
                type="url"
                placeholder={t('https://your-project.com')}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="projectForm.github">{t('GitHub Repository (optional):')}</FieldLabel>
              <Input
                {...register("projectForm.github")}
                type="url"
                placeholder={t('https://github.com/username/repo')}
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