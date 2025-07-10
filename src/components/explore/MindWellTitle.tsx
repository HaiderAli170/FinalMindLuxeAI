/* eslint-disable react/no-unescaped-entities */
"use client";

import RetroGrid from "@/components/magicui/retro-grid";

export function MindLuxeAiTitle() {
  return (
    <div className="relative flex h-[220px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:h-[440px]">
      <span className="pointer-events-none font-semibold z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-4xl  leading-none tracking-tighter text-transparent md:text-6xl">
        MindLuxe's Advice 
      </span>

      <RetroGrid />
    </div>
  );
}
