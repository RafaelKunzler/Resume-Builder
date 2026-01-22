import React from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <Tabs defaultValue="personal">
      <TabsList variant="line" className="flex w-full">
        <TabsTrigger value="personal">{t('Personal')}</TabsTrigger>
        <TabsTrigger value="experience">{t('Experience')}</TabsTrigger>
        <TabsTrigger value="education">{t('Education')}</TabsTrigger>
        <TabsTrigger value="projects">{t('Projects')}</TabsTrigger>
        <TabsTrigger value="skills">{t('Skills')}</TabsTrigger>
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