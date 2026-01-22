"use client"

import Resume from "@/components/Resume";
import { ResumeProvider } from "@/components/ResumeProvider";
import FormsNavigation from "@/components/FormsNavigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {

  return (
    <ResumeProvider>
      <div className="flex">

        <div className="w-4/12 h-screen bg-zinc-100">
          <div className="px-4 py-1">
            <LanguageSwitcher />
          </div>
          <FormsNavigation />
        </div>

        <div className="w-8/12">
          <Resume />
        </div>
      </div>
    </ResumeProvider>
  );
}
