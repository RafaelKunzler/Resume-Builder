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
  experienceForm: z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    start: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Formato inválido. Use MM/AAAA"),
    end: z.union([z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Formato inválido. Use MM/AAAA"), z.literal("Currently")]),
    description: z.string().optional()
  }),
  experience: z.array({
    company: z.string().min(1),
    role: z.string().min(1),
    start: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Formato inválido. Use MM/AAAA"),
    end: z.union([z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Formato inválido. Use MM/AAAA"), z.literal("Currently")]),
    description: z.string().optional()
  })


})

export function ResumeProvider({ children }) {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      personal: {
        name: "",
        email: "",
      },
      experienceForm: {
        company: "",
        role: "",
        start: "",
        end: "",
        description: "",
      },
      experience: [],
    },
    resolver: zodResolver(schema)
  });

  const onFinalSubmit = () => {
    console.log("Submit");
    
  }

  return(
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFinalSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}