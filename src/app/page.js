"use client"
import Image from "next/image";

import Personal from "@/components/Personal";
import Resume from "@/components/Resume";
import { ResumeProvider } from "@/components/ResumeProvider";

export default function Home() { 

  return (
    <ResumeProvider>
      <div className="flex">
        <div className="w-4/12">          
            <Personal />          
        </div>
        
        <div className="w-8/12">
          <Resume />
        </div>
      </div>
    </ResumeProvider>
  );
}
