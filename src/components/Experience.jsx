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



const Experience = () => {
  const { t } = useTranslation()

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
  const [editingIndex, setEditingIndex] = useState(null)
  const [editFormData, setEditFormData] = useState({
    company: "",
    role: "",
    location: "",
    start: "",
    end: "",
    description: ""
  })

  // Handle editing an experience
  const handleEditExperience = (index) => {
    const exp = experiences[index]
    setEditFormData({
      company: exp.company || "",
      role: exp.role || "",
      location: exp.location || "",
      start: exp.start || "",
      end: exp.end === "Currently" ? "" : exp.end || "",
      description: exp.description || ""
    })
    setChecked(exp.end === "Currently")
    setEditingIndex(index)
  }

  // Handle saving edited experience
  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedExperiences = [...experiences]
      
      updatedExperiences[editingIndex] = {
        company: editFormData.company,
        role: editFormData.role,
        location: editFormData.location,
        start: editFormData.start,
        end: checked ? "Currently" : editFormData.end,
        description: editFormData.description
      }
      
      setValue("experience", updatedExperiences, { shouldDirty: true })
      
      // Clear form and reset state
      setEditFormData({
        company: "",
        role: "",
        location: "",
        start: "",
        end: "",
        description: ""
      })
      setChecked(false)
      setEditingIndex(null)
    }
  }

  // Handle canceling edit
  const handleCancelEdit = () => {
    setEditFormData({
      company: "",
      role: "",
      location: "",
      start: "",
      end: "",
      description: ""
    })
    setChecked(false)
    setEditingIndex(null)
  }

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

    // Reset all form fields individually
    resetField("experienceForm.company")
    resetField("experienceForm.role")
    resetField("experienceForm.location")
    resetField("experienceForm.start")
    resetField("experienceForm.end")
    resetField("experienceForm.description")

  }

  const handleDeleteExperience = (index) => {
    const currentList = getValues("experience") || []
    const newList = currentList.filter((_, i) => i !== index)
    setValue("experience", newList, {
      shouldDirty: true,
    })
  }

  const handleMoveExperience = (index, direction) => {
    const currentList = getValues("experience") || []
    const newList = [...currentList]
    
    if (direction === 'up' && index > 0) {
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]]
    } else if (direction === 'down' && index < newList.length - 1) {
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
    }
    
    setValue("experience", newList, {
      shouldDirty: true,
    })
  }


  return (
    <div className='flex flex-col gap-6 px-7 py-2 mb-8'>
      <h1 className='font-bold text-lg'>{t('Profissional Experience')}</h1>
      <div className='flex flex-col gap-4'>       

        {experiences?.map((exp, index) => (
          <div key={index}>
            {editingIndex === index ? (
              // Edit form - temporarily disable validation
              <Card className="p-4 border-2 border-blue-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">{t('Edit Experience')}</h3>
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
                    <FieldLabel htmlFor="edit-company">{t('Company')}: </FieldLabel>
                    <Input
                      id="edit-company"
                      type="text"
                      placeholder={t('Enter Company...')}
                      value={editFormData.company}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="edit-role">{t('Job Title')}: </FieldLabel>
                    <Input
                      id="edit-role"
                      type="text"
                      placeholder={t('Enter Role / Job title...')}
                      value={editFormData.role}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, role: e.target.value }))}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="edit-location">{t('Location:')}</FieldLabel>
                    <Input
                      id="edit-location"
                      type="text"
                      placeholder={t('Enter Location (optional)...')}
                      value={editFormData.location}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </Field>
                  <FieldGroup className="grid max-w-sm grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="edit-start">{t('Start Year')}:</FieldLabel>
                      <Input
                        id="edit-start"
                        type="text"
                        placeholder={t('MM/YYYY')}
                        value={editFormData.start}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, start: e.target.value }))}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="edit-end">{t('End Year')}:</FieldLabel>
                      <Input
                        id="edit-end"
                        type="text"
                        placeholder={t('MM/YYYY')}
                        disabled={checked}
                        value={editFormData.end}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, end: e.target.value }))}
                      />
                    </Field>
                  </FieldGroup>
                  <Field className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-experience-current"
                      checked={checked}
                      onCheckedChange={() => setChecked(prev => !prev)}
                    />
                    <label
                      htmlFor="edit-experience-current"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('Currently working here')}
                    </label>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="edit-description">{t('Key responsabilities and achievementes')}:</FieldLabel>
                    <Textarea
                      id="edit-description"
                      placeholder={t('Enter key responsibilities and achievements...')}
                      value={editFormData.description}
                      onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </Field>
                </FieldGroup>
              </Card>
            ) : (
              <Infocard 
                title={exp.role}
                company={exp.company}
                location={exp.location}
                start={exp.start}
                end={exp.end}
                onDelete={() => handleDeleteExperience(index)}
                onEdit={() => handleEditExperience(index)}
                onMoveUp={() => handleMoveExperience(index, 'up')}
                onMoveDown={() => handleMoveExperience(index, 'down')}
                canMoveUp={index > 0}
                canMoveDown={index < experiences.length - 1}
               />
            )}
          </div>
        ))}

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="experienceForm.company">{t('Company')}: </FieldLabel>
            <Input
              {...register("experienceForm.company")}
              type="text"
              placeholder={t('Enter Company...')}
              className={errors.experience?.company ? "border-red-500 focus-visible:border-red-500" : ""}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="experienceForm.role">{t('Job Title')}: </FieldLabel>
            <Input
              {...register("experienceForm.role")}
              type="text"
              placeholder={t('Enter Role / Job title...')}
              className={errors.experience?.role ? "border-red-500 focus-visible:border-red-500" : ""}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="experienceForm.location">{t('Location:')}</FieldLabel>
            <Input
              {...register("experienceForm.location")}
              type="text"
              placeholder={t('Enter Location (optional)...')}
              className={errors.experience?.location ? "border-red-500 focus-visible:border-red-500" : ""}
            />
          </Field>

          <FieldGroup className="grid max-w-sm grid-cols-2">
            <Field >
              <FieldLabel htmlFor="experienceForm.start">{t('Start Year')}</FieldLabel>
              <Input
                {...register("experienceForm.start")}
                type="text"
                placeholder={t('MM/YYYY')}
                onChange={(e) => handleDateInputChange(e, setValue, "experienceForm.start")}
                className={errors.experienceForm?.start ? "border-red-500 focus-visible:border-red-500" : ""}
              />
              {errors.experienceForm?.start && <div className="text-red-500 text-xs">{errors.experienceForm?.start.message}</div>}
            </Field>

            {!checked ?
              <Field>
                <FieldLabel htmlFor="experienceForm.end">{t('End Year')}</FieldLabel>
                <Input
                  {...register("experienceForm.end")}
                  type="text"
                  placeholder={t('MM/YYYY')}
                  onChange={(e) => handleDateInputChange(e, setValue, "experienceForm.end")}
                  className={errors.experienceForm?.end ? "border-red-500 focus-visible:border-red-500" : ""}
                />
                {errors.experienceForm?.end && <div className="text-red-500 text-xs">{errors.experienceForm?.end.message}</div>}

              </Field> : ""}
          </FieldGroup>

          <FieldGroup>
            <Field orientation='horizontal'>
              <Checkbox onCheckedChange={handleCheckedChange} className="border-slate-400" />
              <FieldLabel>{t('Currently working here')}</FieldLabel>
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="experienceForm.description">{t('Key responsabilities and achievementes')}</FieldLabel>
              <Textarea
                {...register("experienceForm.description")}
                placeholder={t('Enter key responsibilities and achievements...')}
                className={errors.experience?.description ? "border-red-500 focus-visible:border-red-500" : ""}
              />
            </Field>
          </FieldGroup>

          <Button
            type="button"
            onClick={handleAddExperience}
          >
            {t('Add Experience')}
          </Button>
        </FieldGroup>
      </div>
    </div>
  )
}

export default Experience