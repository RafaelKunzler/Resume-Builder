import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFormContext, useWatch } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from './ui/button'
import { handleDateInputChange } from '@/lib/utils'
import Infocard from './Infocard'

const Education = () => {
  const { t } = useTranslation()

  const {
    register,
    setValue,
    getValues,
    resetField,
    formState: { errors },
  } = useFormContext()

  const educations = useWatch({
    name: "education",
  })

  const [checked, setChecked] = useState(false)

  // Disable End Year field if checkbox is checked
  const handleCheckedChange = () => {
    setChecked((prev) => {
      const next = !prev

      if (next) {
        setValue("educationForm.end", "Present", {
          shouldValidate: true,
          shouldDirty: true,
        })
      } else {
        setValue("educationForm.end", "", {
          shouldValidate: true,
          shouldDirty: true,
        })
      }

      return next
    })
  }

  const handleAddEducation = () => {
    const formData = getValues("educationForm")
    const currentList = getValues("education") || []

    setValue("education", [...currentList, formData], {
      shouldDirty: true,
    })

    resetField("educationForm")
  }

  const handleDeleteEducation = (index) => {
    const currentList = getValues("education") || []
    const newList = currentList.filter((_, i) => i !== index)
    setValue("education", newList, {
      shouldDirty: true,
    })
  }

  const handleMoveEducation = (index, direction) => {
    const currentList = getValues("education") || []
    const newList = [...currentList]

    if (direction === 'up' && index > 0) {
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]]
    } else if (direction === 'down' && index < newList.length - 1) {
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
    }

    setValue("education", newList, {
      shouldDirty: true,
    })
  }

  return (
    <div className='flex flex-col gap-6 px-7 py-2 mb-8'>
      <h1 className='font-bold text-lg'>{t('Education')}</h1>
      <div className='flex flex-col gap-4'>

        {educations?.map((edu, index) => (
          <div key={index}>
            <Infocard
              title={edu.qualification}
              company={edu.institution}
              location={edu.location}
              start={edu.start}
              end={edu.end}
              onDelete={() => handleDeleteEducation(index)}
              onMoveUp={() => handleMoveEducation(index, 'up')}
              onMoveDown={() => handleMoveEducation(index, 'down')}
              canMoveUp={index > 0}
              canMoveDown={index < educations.length - 1}
             />
          </div>
        ))}

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="educationForm.institution">{t('Institution')}: </FieldLabel>
            <Input
              {...register("educationForm.institution")}
              type="text"
              placeholder={t('Enter Institution name...')}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="educationForm.qualification">{t('Qualification/Degree')}: </FieldLabel>
            <Input
              {...register("educationForm.qualification")}
              type="text"
              placeholder={t('e.g., Bachelor of Science in Computer Science...')}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="educationForm.location">{t('Location')}:</FieldLabel>
            <Input
              {...register("educationForm.location")}
              type="text"
              placeholder={t('City, State/Country (optional)...')}
            />
          </Field>

          <FieldGroup className="grid max-w-sm grid-cols-2">
            <Field >
              <FieldLabel htmlFor="educationForm.start">{t('Start Year')}</FieldLabel>
              <Input
                {...register("educationForm.start")}
                type="text"
                placeholder={t('MM/YYYY')}
                onChange={(e) => handleDateInputChange(e, setValue, "educationForm.start")}
              />
              {errors.education?.start && <div className="text-red-500 text-xs">{errors.education?.start.message}</div>}
            </Field>

            {!checked ?
              <Field>
                <FieldLabel htmlFor="educationForm.end">{t('End Year')}</FieldLabel>
                <Input
                  {...register("educationForm.end")}
                  type="text"
                  placeholder={t('MM/YYYY')}
                  onChange={(e) => handleDateInputChange(e, setValue, "educationForm.end")}
                />
                {errors.education?.end && <div className="text-red-500 text-xs">{errors.education?.end.message}</div>}
              </Field> : ""}
          </FieldGroup>

          <FieldGroup>
            <Field orientation='horizontal'>
              <Checkbox onCheckedChange={handleCheckedChange} className="border-slate-400" />
              <FieldLabel>{t('Currently studying here')}</FieldLabel>
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="educationForm.takeaways">{t('Key Takeaways & Achievements')}</FieldLabel>
              <Textarea
                {...register("educationForm.takeaways")}
                placeholder={t('Enter key courses, projects, honors, or achievements...')}
              />
            </Field>
          </FieldGroup>

          <Button
            type="button"
            onClick={handleAddEducation}
          >
            {t('Add Education')}
          </Button>
        </FieldGroup>
      </div>
    </div>
  )
}

export default Education