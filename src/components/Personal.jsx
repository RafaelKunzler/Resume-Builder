import React from 'react'

import { useFormContext } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"




const Personal = () => {

  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (

    <div className='flex flex-col gap-6 px-7 py-2 mb-8'>
      <h1 className='font-bold text-lg'>Personal Information</h1>
      <form className='flex flex-col gap-4'>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="personal.name">Full name:</FieldLabel>
            <Input
              {...register("personal.name")}
              type="text"
              placeholder="Name"
            />
            {errors.personal?.name && <div className="text-red-500 text-xs">{errors.personal?.name.message}</div>}
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.email">E-mail:</FieldLabel>
            <Input
              {...register("personal.email")}
              type="email"
              placeholder="E-mail"
            />
            {errors.personal?.email && <div className="text-red-500 text-xs">{errors.personal?.email.message}</div>}
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.phone">Phone number:</FieldLabel>
            <Input
              {...register("personal.phone")}
              type="tel"
              placeholder="Phone number"
            />
            {errors.personal?.phone && <div className="text-red-500 text-xs">{errors.personal?.phone.message}</div>}
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.location">Location:</FieldLabel>
            <Input
              {...register("personal.location")}
              type="text"
              placeholder="Location"
            />
            {errors.personal?.location && <div className="text-red-500 text-xs">{errors.personal?.location.message}</div>}
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.linkedin">Linkedin:</FieldLabel>
            <Input
              {...register("personal.linkedin")}
              type="text"
              placeholder='Linkedin link'
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.github">Github:</FieldLabel>
            <Input
              {...register("personal.github")}
              type="text"
              placeholder='Github link'
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="personal.summary">Summary:</FieldLabel>
            <Textarea
              {...register("personal.summary")}
              placeholder='Summary about yourself'
            />
          </Field>
        </FieldGroup>
        
      </form>


    </div>



  )
}

export default Personal