"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import Confetti from "react-dom-confetti";

const StepFive = () => {
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => setShowConfetti(true), []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full py-2 relative">
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex h-full justify-center z-30"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 250, spread: 250 }}
        />
      </div>
      <div className="max-w-5xl mx-auto text-center">
        <Image
          src="/files/allset.png"
          alt="Onboarding Complete"
          width={800}
          height={800}
          className="w-52 h-auto object-cover mx-auto"
        />
        <h2 className=" text-xl md:text-2xl font-bold font-heading text-foreground mt-4">
          You&apos;re all done!
        </h2>
        <p className=" text-slate-200 text-slate-900 mb-5 md:mb-3 text-[16px] md:text-[17px] font-bold max-w-lg mt-2">
          Congratulations, you&apos;ve completed the onboarding process. Get
          ready to start your journey to better health with{" "}
          <span className="text-orange-500">MIND LUXE AI.</span>
        </p>
        <Link
          href="/dashboard"
          className={buttonVariants({ className: "mt-4" })}
        >
          Get personalized plan
          <ArrowRightIcon className="w-4 h-4 ml-1.5" />
        </Link>
      </div>
    </div>
  );
};

export default StepFive;
