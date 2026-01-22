'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form'
import { z } from "zod"
import { useMemo } from 'react'

export function ResumeProvider({ children }) {
  const schema = useMemo(() => z.object({
  personal: z.object({
    name: z.string().min(2,"Invalid name").regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Name should only contain letters and spaces"),
    email: z.email(),
    phone: z.string().min(10, "Invalid phone number").max(15, "Invalid phone number").regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Invalid phone number"),
    location: z.string(),
    linkedin: z.string().refine((string) => string.includes("linkedin.com"), { message: "Must be a valid LinkedIn URL" }).or(z.literal("")).optional(),
    github: z.string().refine((string) => string.includes("github.com"), { message: "Must be a valid GitHub URL" }).or(z.literal("")).optional(),
    portfolio: z.url().optional(),
    summary: z.string().min(10, "Minimum 10 characters").optional(),
  }),
  experienceForm: z.object({
    company: z.string().min(1, "Invalid company name").optional(),
    role: z.string().min(1, "Invalid role"),
    start: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Invalid format. Use MM/AAAA"),
    end: z.union([z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Invalid format. Use MM/AAAA"), z.literal("Currently")]),
    description: z.string().optional()

  }),
  experience: z.array(z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    start: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Invalid format. Use MM/YYYY"),
    end: z.union([z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Invalid format. Use MM/YYYY"), z.literal("Currently")]),
    description: z.string().optional()

  })),
  educationForm: z.object({
    institution: z.string().min(1, "Invalid institution name"),
    qualification: z.string().min(1, "Invalid qualification/degree"),
    location: z.string().optional(),
    start: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Invalid format. Use MM/YYYY"),
    end: z.union([z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Invalid format. Use MM/YYYY"), z.literal("Present")]),
    takeaways: z.string().optional()
  }),
  education: z.array(z.object({
    institution: z.string().min(1),
    qualification: z.string().min(1),
    location: z.string().optional(),
    start: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Invalid format. Use MM/AAAA"),
    end: z.union([z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Invalid format. Use MM/AAAA"), z.literal("Present")]),
    takeaways: z.string().optional()
  })),
  projectsForm: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    technologies: z.string().optional(),
    url: z.string().url().optional().or(z.literal("")),
    features: z.string().optional()
  }),
  projects: z.array(z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    technologies: z.string().optional(),
    url: z.string().url().optional().or(z.literal("")),
    features: z.string().optional()
  })),
  skills: z.array(z.string().min(1))
}), [])

  const resolver = useMemo(() => zodResolver(schema), [schema])

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
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
      educationForm: {
        institution: "",
        qualification: "",
        location: "",
        start: "",
        end: "",
        takeaways: "",
      },
      education: [],
      projectsForm: {
        name: "",
        description: "",
        technologies: "",
        url: "",
        features: "",
      },
      projects: [],
      skills: []
    },
    resolver
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