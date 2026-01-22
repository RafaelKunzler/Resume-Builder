import React from 'react'
import { useTranslation } from 'react-i18next'

import { useFormContext } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

const Personal = () => {
  const { t } = useTranslation()

  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (

    <div className='flex flex-col gap-6 px-7 py-2 mb-8'>
      <h1 className='font-bold text-lg'>{t('Personal Information')}</h1>
      <div className='flex flex-col gap-4'>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="personal.name">{t('Full Name')}:</FieldLabel>
            <Input
              {...register("personal.name")}
              type="text"
              placeholder={t('Full Name')}
            />
            {errors.personal?.name && <div className="text-red-500 text-xs">{errors.personal?.name.message}</div>}
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.email">{t('Email')}:</FieldLabel>
            <Input
              {...register("personal.email")}
              type="email"
              placeholder={t('Email')}
            />
            {errors.personal?.email && <div className="text-red-500 text-xs">{errors.personal?.email.message}</div>}
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.phone">{t('Phone')}:</FieldLabel>
            <Input
              {...register("personal.phone")}
              type="tel"
              placeholder={t('Phone')}
            />
            {errors.personal?.phone && <div className="text-red-500 text-xs">{errors.personal?.phone.message}</div>}
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.location">{t('Location')}:</FieldLabel>
            <Input
              {...register("personal.location")}
              type="text"
              placeholder={t('Location')}
            />
            {errors.personal?.location && <div className="text-red-500 text-xs">{errors.personal?.location.message}</div>}
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.linkedin">{t('LinkedIn')}:</FieldLabel>
            <Input
              {...register("personal.linkedin")}
              type="text"
              placeholder={t('LinkedIn')}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.github">{t('GitHub')}:</FieldLabel>
            <Input
              {...register("personal.github")}
              type="text"
              placeholder={t('GitHub')}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.summary">{t('Professional Summary')}:</FieldLabel>
            <Textarea
              {...register("personal.summary")}
              placeholder={t('Enter your professional summary...')}
            />
          </Field>
        </FieldGroup>
        
      </div>


    </div>



  )
}

export default Personal