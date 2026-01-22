import React from 'react'

import { useFormContext, useWatch } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button'
import Infocard from './Infocard'

const Projects = () => {
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
      <h1 className='font-bold text-lg'>Portfolio Projects</h1>
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
            <FieldLabel htmlFor="projectForm.name">Project Name: </FieldLabel>
            <Input
              {...register("projectForm.name")}
              type="text"
              placeholder="Enter project name..."
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="projectForm.description">Description: </FieldLabel>
            <Textarea
              {...register("projectForm.description")}
              placeholder="Brief description of the project..."
              rows={3}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="projectForm.technologies">Technologies/Tools: </FieldLabel>
            <Input
              {...register("projectForm.technologies")}
              type="text"
              placeholder="e.g., React, Node.js, MongoDB..."
            />
          </Field>

          <FieldGroup className="grid max-w-md grid-cols-1 gap-4">
            <Field>
              <FieldLabel htmlFor="projectForm.url">Project URL (optional):</FieldLabel>
              <Input
                {...register("projectForm.url")}
                type="url"
                placeholder="https://your-project.com"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="projectForm.github">GitHub Repository (optional):</FieldLabel>
              <Input
                {...register("projectForm.github")}
                type="url"
                placeholder="https://github.com/username/repo"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="projectForm.features">Key Features & Achievements</FieldLabel>
              <Textarea
                {...register("projectForm.features")}
                placeholder="List key features, challenges overcome, or notable achievements..."
                rows={4}
              />
            </Field>
          </FieldGroup>

          <Button
            type="button"
            onClick={handleAddProject}
          >
            Add Project
          </Button>
        </FieldGroup>
      </div>
    </div>
  )
}

export default Projects