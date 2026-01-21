import React from 'react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ChevronUp, ChevronDown, Trash2} from 'lucide-react';

const Infocard = (props) => {
  return (
    <Card>
      <div className='flex'>
        <div className='flex flex-col w-10/12'>
          <CardHeader>
            <CardTitle>{props.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{props.company} - {props.location}</p>
            <p>{props.start} - {props.end}</p>
          </CardContent>
        </div>

        <div className='flex flex-col gap-2'>
          <ChevronUp size={18} />
          <ChevronDown size={18}  />
          <Trash2 size={18} className='text-red-400' />
        </div>
      </div>
    </Card>
  )
}

export default Infocard