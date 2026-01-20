import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"


const schema = z.object({
  name: z.string().min(2, "Invalid name"),
  email: z.email(),
  phone: z.string().min(10, "Invalid phone number").max(15, "Invalid phone number").regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Invalid phone number"),
  location: z.string(),
  linkedin: z.string(),
  github: z.string(),
  summary: z.string(). min(10, "Minimum 10 characters")
})

const Personal = () => {

  const { 
    register, 
    handleSubmit, 
    setError,
    formState: {errors, isSubmitting} 
  } = useForm({
    defaultValues: {
      email: "test@email.com",
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(data); 
    } catch (error) {
      setError("root", {
        message: "Error, try again!"
      })
    }   
  }

  return (
    <div>
      <h1>Personal Information: </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">
            Full name:
          </label>
          <input 
            {...register("name")} 
            type="text" 
            placeholder="Name"             
          />          
          {errors.name && <div className="text-red-500 text-xs">{errors.name.message}</div>}
        </div>

        <div>
          <label htmlFor="email">
            E-mail:
          </label>
          <input 
            {...register("email")} 
            type="email" 
            placeholder="E-mail" 
          />
          {errors.email && <div className="text-red-500 text-xs">{errors.email.message}</div>}
        </div>

        <div>
          <label htmlFor="phone">
            Phone number:
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Phone number"
          />
          {errors.phone && <div className="text-red-500 text-xs">{errors.phone.message}</div>}
        </div>

        <div>
          <label htmlFor="location">
            Location:
          </label>
          <input 
            {...register("location")}
            type="text"
            placeholder='Location'
          />
          {errors.location && <div className="text-red-500 text-xs">{errors.location.message}</div>}
        </div>

        <div>
          <label htmlFor="linkedin">
            Linkedin:
          </label>
          <input 
            {...register("linkedin")}
            type="text" 
            placeholder='Linkedin link'
          />
        </div>

        <div>
          <label htmlFor="github">
            Github:
          </label>
          <input 
            {...register("github")}
            type="text" 
            placeholder='Github link'
          />
        </div>

        <div>
          <label htmlFor="summary">
            Summary:
          </label>
          <input 
            {...register("summary")}
            type="text" 
            placeholder='Summary about yourself'
          />
        </div>

        


          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
          {errors.root && <div className="text-red-500">{errors.root.message}</div>}
        </form>
    </div>
  )
}

export default Personal