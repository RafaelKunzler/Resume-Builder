import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFormContext, useWatch } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from './ui/button'
import { Card } from './ui/card'
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
  const [editingIndex, setEditingIndex] = useState(null)
  const [editFormData, setEditFormData] = useState({
    institution: "",
    qualification: "",
    location: "",
    start: "",
    end: "",
    takeaways: ""
  })

  // Handle editing an education
  const handleEditEducation = (index) => {
    const edu = educations[index]
    setEditFormData({
      institution: edu.institution || "",
      qualification: edu.qualification || "",
      location: edu.location || "",
      start: edu.start || "",
      end: edu.end === "Present" ? "" : edu.end || "",
      takeaways: edu.takeaways || ""
    })
    setChecked(edu.end === "Present")
    setEditingIndex(index)
  }

  // Handle saving edited education
  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedEducations = [...educations]
      
      updatedEducations[editingIndex] = {
        institution: editFormData.institution,
        qualification: editFormData.qualification,
        location: editFormData.location,
        start: editFormData.start,
        end: checked ? "Present" : editFormData.end,
        takeaways: editFormData.takeaways
      }
      
      setValue("education", updatedEducations, { shouldDirty: true })
      
      // Clear form and reset state
      setEditFormData({
        institution: "",
        qualification: "",
        location: "",
        start: "",
        end: "",
        takeaways: ""
      })
      setChecked(false)
      setEditingIndex(null)
    }
  }

  // Handle canceling edit
  const handleCancelEdit = () => {
    setEditFormData({
      institution: "",
      qualification: "",
      location: "",
      start: "",
      end: "",
      takeaways: ""
    })
    setChecked(false)
    setEditingIndex(null)
  }

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

    // Reset all form fields individually
    resetField("educationForm.institution")
    resetField("educationForm.qualification")
    resetField("educationForm.location")
    resetField("educationForm.start")
    resetField("educationForm.end")
    resetField("educationForm.takeaways")

    // Also reset the checkbox state
    setChecked(false)
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
            {editingIndex === index ? (
              // Edit form using local state
              <Card className="p-4 border-2 border-green-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">{t('Edit Education')}</h3>
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
                    <FieldLabel>{t('Institution')}: </FieldLabel>
                    <Input
                      value={editFormData.institution}
                      onChange={(e) => setEditFormData({...editFormData, institution: e.target.value})}
                      type="text"
                      placeholder={t('Enter Institution name...')}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>{t('Qualification/Degree')}: </FieldLabel>
                    <Input
                      value={editFormData.qualification}
                      onChange={(e) => setEditFormData({...editFormData, qualification: e.target.value})}
                      type="text"
                      placeholder={t('e.g., Bachelor of Science in Computer Science...')}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>{t('City, State/Country (optional)...')}</FieldLabel>
                    <Input
                      value={editFormData.location}
                      onChange={(e) => setEditFormData({...editFormData, location: e.target.value})}
                      type="text"
                      placeholder={t('City, State/Country (optional)...')}
                    />
                  </Field>
                  <FieldGroup className="grid max-w-sm grid-cols-2">
                    <Field>
                      <FieldLabel>{t('Start Year')}:</FieldLabel>
                      <Input
                        value={editFormData.start}
                        onChange={(e) => setEditFormData({...editFormData, start: e.target.value})}
                        type="text"
                        placeholder={t('MM/YYYY')}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>{t('End Year')}:</FieldLabel>
                      <Input
                        value={editFormData.end}
                        onChange={(e) => setEditFormData({...editFormData, end: e.target.value})}
                        type="text"
                        placeholder={t('MM/YYYY')}
                        disabled={checked}
                      />
                    </Field>
                  </FieldGroup>
                  <Field className="flex items-center space-x-2">
                    <Checkbox
                      id="education-current-edit"
                      checked={checked}
                      onCheckedChange={handleCheckedChange}
                    />
                    <label
                      htmlFor="education-current-edit"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('Currently studying here')}
                    </label>
                  </Field>
                  <Field>
                    <FieldLabel>{t('Key Takeaways & Achievements')}:</FieldLabel>
                    <Textarea
                      value={editFormData.takeaways}
                      onChange={(e) => setEditFormData({...editFormData, takeaways: e.target.value})}
                      placeholder={t('Enter key courses, projects, honors, or achievements...')}
                    />
                  </Field>
                </FieldGroup>
              </Card>
            ) : (
              <Infocard
                title={edu.qualification}
                company={edu.institution}
                location={edu.location}
                start={edu.start}
                end={edu.end}
                onDelete={() => handleDeleteEducation(index)}
                onEdit={() => handleEditEducation(index)}
                onMoveUp={() => handleMoveEducation(index, 'up')}
                onMoveDown={() => handleMoveEducation(index, 'down')}
                canMoveUp={index > 0}
                canMoveDown={index < educations.length - 1}
               />
            )}
          </div>
        ))}

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="educationForm.institution">{t('Institution')}: </FieldLabel>
            <Input
              {...register("educationForm.institution")}
              type="text"
              placeholder={t('Enter Institution name...')}
              className={errors.education?.institution ? "border-red-500 focus-visible:border-red-500" : ""}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="educationForm.qualification">{t('Qualification/Degree')}: </FieldLabel>
            <Input
              {...register("educationForm.qualification")}
              type="text"
              placeholder={t('e.g., Bachelor of Science in Computer Science...')}
              className={errors.education?.qualification ? "border-red-500 focus-visible:border-red-500" : ""}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="educationForm.location">{t('Location')}:</FieldLabel>
            <Input
              {...register("educationForm.location")}
              type="text"
              placeholder={t('City, State/Country (optional)...')}
              className={errors.educationForm?.location ? "border-red-500 focus-visible:border-red-500" : ""}
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
                className={errors.educationForm?.start ? "border-red-500 focus-visible:border-red-500" : ""}
              />
              {errors.educationForm?.start && <div className="text-red-500 text-xs">{errors.educationForm?.start.message}</div>}
            </Field>

            {!checked ?
              <Field>
                <FieldLabel htmlFor="educationForm.end">{t('End Year')}</FieldLabel>
                <Input
                  {...register("educationForm.end")}
                  type="text"
                  placeholder={t('MM/YYYY')}
                  onChange={(e) => handleDateInputChange(e, setValue, "educationForm.end")}
                  className={errors.educationForm?.end ? "border-red-500 focus-visible:border-red-500" : ""}
                />
                {errors.educationForm?.end && <div className="text-red-500 text-xs">{errors.educationForm?.end.message}</div>}
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
                className={errors.education?.takeaways ? "border-red-500 focus-visible:border-red-500" : ""}
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