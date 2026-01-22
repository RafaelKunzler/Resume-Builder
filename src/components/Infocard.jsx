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
          <ChevronUp 
            size={18} 
            className={`${props.canMoveUp ? 'cursor-pointer hover:text-blue-600' : 'text-gray-300 '}`}
            onClick={props.canMoveUp ? props.onMoveUp : undefined}
          />
          <ChevronDown 
            size={18} 
            className={`${props.canMoveDown ? 'cursor-pointer hover:text-blue-600' : 'text-gray-300'}`}
            onClick={props.canMoveDown ? props.onMoveDown : undefined}
          />
          <Trash2 
            size={18} 
            className='text-red-400 cursor-pointer hover:text-red-600' 
            onClick={props.onDelete}
          />
        </div>
      </div>
    </Card>
  )
}

export default Infocard