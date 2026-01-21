import React from 'react'


import { useFormContext } from "react-hook-form"


const Personal = () => {

  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting},    
   } = useFormContext()

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
          <label htmlFor="personal.name">
            Full name:
          </label>
          <input 
            {...register("personal.name")} 
            type="text" 
            placeholder="Name"             
          />          
          {errors.personal?.name && <div className="text-red-500 text-xs">{errors.personal?.name.message}</div>}
        </div>

        <div>
          <label htmlFor="personal.email">
            E-mail:
          </label>
          <input 
            {...register("personal.email")} 
            type="email" 
            placeholder="E-mail" 
          />
          {errors.personal?.email && <div className="text-red-500 text-xs">{errors.personal?.email.message}</div>}
        </div>

        <div>
          <label htmlFor="personal.phone">
            Phone number:
          </label>
          <input
            {...register("personal.phone")}
            type="tel"
            placeholder="Phone number"
          />
          {errors.personal?.phone && <div className="text-red-500 text-xs">{errors.personal?.phone.message}</div>}
        </div>

        <div>
          <label htmlFor="personal.location">
            Location:
          </label>
          <input 
            {...register("personal.location")}
            type="text"
            placeholder='Location'
          />
          {errors.personal?.location && <div className="text-red-500 text-xs">{errors.personal?.location.message}</div>}
        </div>

        <div>
          <label htmlFor="personal.linkedin">
            Linkedin:
          </label>
          <input 
            {...register("personal.linkedin")}
            type="text" 
            placeholder='Linkedin link'
          />
        </div>

        <div>
          <label htmlFor="personal.github">
            Github:
          </label>
          <input 
            {...register("personal.github")}
            type="text" 
            placeholder='Github link'
          />
        </div>

        <div>
          <label htmlFor="personal.summary">
            Summary:
          </label>
          <input 
            {...register("personal.summary")}
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