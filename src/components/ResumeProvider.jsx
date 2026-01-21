'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form'
import { z } from "zod"

const schema = z.object({
  personal: z.object({
    name: z.string().min(2, "Invalid name"),
    email: z.email(),
    phone: z.string().min(10, "Invalid phone number").max(15, "Invalid phone number").regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Invalid phone number"),
    location: z.string(),
    linkedin: z.string(),
    github: z.string(),
    summary: z.string(). min(10, "Minimum 10 characters")
  }),


})

export function ResumeProvider({ children }) {
  const methods = useForm({
    defaultValues: {
      personal: {
        name: "",
        email: "",
      }
    },
    resolver: zodResolver(schema)
  });

  return(
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  )
}