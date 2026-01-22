import React, { useState } from 'react'

import { useFormContext, useWatch } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from './ui/button'
import { Card, CardContent } from "@/components/ui/card"
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react'

const Skills = () => {
  const {
    register,
    setValue,
    getValues,
    resetField,
  } = useFormContext()

  const skills = useWatch({
    name: "skills",
  })

  const [newSkill, setNewSkill] = useState('')

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const currentList = getValues("skills") || []
      setValue("skills", [...currentList, newSkill.trim()], {
        shouldDirty: true,
      })
      setNewSkill('')
    }
  }

  const handleDeleteSkill = (index) => {
    const currentList = getValues("skills") || []
    const newList = currentList.filter((_, i) => i !== index)
    setValue("skills", newList, {
      shouldDirty: true,
    })
  }

  const handleMoveSkill = (index, direction) => {
    const currentList = getValues("skills") || []
    const newList = [...currentList]

    if (direction === 'up' && index > 0) {
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]]
    } else if (direction === 'down' && index < newList.length - 1) {
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
    }

    setValue("skills", newList, {
      shouldDirty: true,
    })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill()
    }
  }

  return (
    <div className='flex flex-col gap-6 px-7 py-2 mb-8'>
      <h1 className='font-bold text-lg'>Skills</h1>
      <div className='flex flex-col gap-4'>

        {skills?.map((skill, index) => (
          <Card key={index} className="flex-row items-center justify-between p-4">
            <span className="font-medium">{skill}</span>
            <div className='flex gap-2'>
              <ChevronUp
                size={18}
                className={`${index > 0 ? 'cursor-pointer hover:text-blue-600' : 'text-gray-300 cursor-not-allowed'}`}
                onClick={index > 0 ? () => handleMoveSkill(index, 'up') : undefined}
              />
              <ChevronDown
                size={18}
                className={`${index < skills.length - 1 ? 'cursor-pointer hover:text-blue-600' : 'text-gray-300 cursor-not-allowed'}`}
                onClick={index < skills.length - 1 ? () => handleMoveSkill(index, 'down') : undefined}
              />
              <Trash2
                size={18}
                className='text-red-400 cursor-pointer hover:text-red-600'
                onClick={() => handleDeleteSkill(index)}
              />
            </div>
          </Card>
        ))}

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="newSkill">Add Skill: </FieldLabel>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                type="text"
                placeholder="Enter a skill..."
              />
              <Button
                type="button"
                onClick={handleAddSkill}
                disabled={!newSkill.trim()}
              >
                Add
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </div>
    </div>
  )
}

export default Skills