import React from 'react'
import { useWatch, useFormContext } from "react-hook-form"

const Resume = () => {
  const { control } = useFormContext()

  const personal = useWatch({
    control,
    name: "personal",
  })

  return (
    <div>
      <h1>{personal?.name || "Seu nome"}</h1>
      <h1>{personal?.email || "E-mail"}</h1>
      <h1>{personal?.phone || "Telefone"}</h1>
      <h1>{personal?.location || "Localização"}</h1>
      <h1>{personal?.linkedin}</h1>
      <h1>{personal?.github}</h1>
      <h1>{personal?.summary}</h1>

    </div>
  )
}

export default Resume