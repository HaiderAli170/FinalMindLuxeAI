import React from "react";
import MaxWidthWrapper from "../global/max-width-wrapper";
import AnimationContainer from "../global/animation-container";
import Icons from "../global/icons";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import {  STEPS } from "@/constants";
import { Phone, ShareIcon, User } from "lucide-react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
const Footer = () => {
  return (
    <footer className="w-full relative bottom-0 border-t border-border pt-20 pb-8">
      <MaxWidthWrapper>
        <AnimationContainer>
          <div className="flex flex-col md:flex-row items-start justify-between w-full">
            <div className="flex flex-col items-start justify-between w-full max-w-md mr-auto">
              <div className="flex items-center gap-2 mb-6 md:mb-0">
                <Icons.logo className="w-8 h-8" />
              </div>
              <div className="flex flex-col items-start mt-5">
                <h2 className="text-lg font-semibold font-heading mb-2">
                  Quick Health Navigation
                </h2>
                <p className="text-muted-foreground text-sm mb-4 text-center md:text-left">
                  Explore important health resources and tools right from the footer.
                </p>
                <nav className="flex flex-col gap-2">
                  <Link href="/helplines" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Mental Health Helplines
                  </Link>
                  <Link href="/about" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                    <InfoCircledIcon className="w-4 h-4" />
                    About Mind Luxe AI
                  </Link>
                  <Link href="/privacy" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                    <ShareIcon className="w-4 h-4" />
                    Privacy Policy
                  </Link>
                  <Link href="/" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Home
                  </Link>
                </nav>
              </div>
            </div>
            <div className="md:text-left mt-8 gap-20">
            <Link
              href="/"
              className="flex items-center font-semibold gap-3 text-xl"
            >
             <Image src="/images/brain-hi.png" height={200} width={200} alt="MindWell logo"/>
            </Link>
            </div>
          </div>
          <div className="border-t border-neutral-200 mt-10 pt-6 flex items-center justify-between w-full">
            <p className="text-start text-muted-foreground text-sm">
              All rights reserved @{new Date().getFullYear()}  MIND LUXE AI
            </p>
           
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
