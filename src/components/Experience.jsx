import React, { useState } from 'react'

import { useFormContext, useWatch } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from './ui/button'
import Infocard from './Infocard'



const Experience = () => {
  const {
    register,
    setValue,
    getValues,
    resetField,
    formState: { errors },
  } = useFormContext()

  const experiences = useWatch({
    name: "experience",
  })

  const [checked, setChecked] = useState(false)

  // Disable End Year field if checkbox is checked
  const handleCheckedChange = () => {
    setChecked((prev) => {
      const next = !prev

      if (next) {
        setValue("experienceForm.end", "Currently", {
          shouldValidate: true,
          shouldDirty: true,
        })
      } else {
        setValue("experienceForm.end", "", {
          shouldValidate: true,
          shouldDirty: true,
        })
      }

      return next
    })
  }

  const handleAddExperience = () => {
    const formData = getValues("experienceForm")
    const currentList = getValues("experience") || []

    setValue("experience", [...currentList, formData], {
      shouldDirty: true,
    })

    resetField("experienceForm")

  }


  return (
    <div className='flex flex-col gap-6 px-7 py-2 mb-8'>
      <h1 className='font-bold text-lg'>Profissional Experience</h1>
      <div className='flex flex-col gap-4'>       

        {experiences?.map((exp, index) => (
          <div key={index}>            
            <Infocard 
              title={exp.role}
              company={exp.company}
              location={exp.location}
              start={exp.start}
              end={exp.end}
             />
          </div>
        ))}

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="experienceForm.company">Company: </FieldLabel>
            <Input
              {...register("experienceForm.company")}
              type="text"
              placeholder="Enter Company..."
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="experienceForm.role">Job Title: </FieldLabel>
            <Input
              {...register("experienceForm.role")}
              type="text"
              placeholder="Enter Role / Job title..."
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="experienceForm.location">Location:</FieldLabel>
            <Input
              {...register("experienceForm.location")}
              type="text"
              placeholder="Enter Location (optional)..."
            />
          </Field>

          <FieldGroup className="grid max-w-sm grid-cols-2">
            <Field >
              <FieldLabel htmlFor="experienceForm.start">Start Year</FieldLabel>
              <Input
                {...register("experienceForm.start")}
                type="text"
                placeholder="MM/YYYY"
              />
              {errors.experience?.start && <div className="text-red-500 text-xs">{errors.experience?.start.message}</div>}
            </Field>

            {!checked ?
              <Field>
                <FieldLabel htmlFor="experienceForm.end">End Year</FieldLabel>
                <Input
                  {...register("experienceForm.end")}
                  type="text"
                  placeholder="MM/YYYY"
                />
                {errors.experience?.end && <div className="text-red-500 text-xs">{errors.experience?.end.message}</div>}

              </Field> : ""}
          </FieldGroup>

          <FieldGroup>
            <Field orientation='horizontal'>
              <Checkbox onCheckedChange={handleCheckedChange} className="border-slate-400" />
              <FieldLabel>Currently working here</FieldLabel>
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="experienceForm.description">Key responsabilities and achievementes</FieldLabel>
              <Textarea
                {...register("experienceForm.description")}
                placeholder="Enter key responsibilities and achievements..."
              />
            </Field>
          </FieldGroup>

          <Button
            type="button"
            onClick={handleAddExperience}
          >
            Add Experience
          </Button>
        </FieldGroup>
      </div>
    </div>
  )
}

export default Experience