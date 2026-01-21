"use client"

import Personal from "@/components/Personal";
import Resume from "@/components/Resume";
import { ResumeProvider } from "@/components/ResumeProvider";
import FormsNavigation from "@/components/FormsNavigation";

export default function Home() { 

  return (
    <ResumeProvider>
      <div className="flex">
      
        <div className="w-4/12 h-screen bg-zinc-100">          
          <FormsNavigation />                  
        </div>      

        <div className="w-8/12">
          <Resume />
        </div>
      </div>
    </ResumeProvider>
  );
}
