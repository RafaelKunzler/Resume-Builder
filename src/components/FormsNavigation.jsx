import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Personal from './Personal'
import Experience from './Experience'
import Education from './Education'
import Projects from './Projects'
import Skills from './Skills'

const FormsNavigation = () => {
  return (
    <Tabs defaultValue="personal" className="flex">
      <TabsList variant="line">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <Personal />
      </TabsContent>

      <TabsContent value="experience">
        <Experience/>
      </TabsContent>

      <TabsContent value="education">
        <Education/>
      </TabsContent>

      <TabsContent value="projects">
        <Projects/>
      </TabsContent>

      <TabsContent value="skills">
        <Skills/>
      </TabsContent>
    </Tabs>
  )
}

export default FormsNavigation