import React from "react";
 
 
import {
  AnimatedListDemo,
  AnimatedListDemo2,
} from "@/components/explore/Animated";
import { DevLoomImage } from "@/components/explore/DevLoomImage";
import { Showtext } from "@/components/magic/Showtext";
 
import { MindWellTitle } from "@/components/explore/MindWellTitle";
 
import { GradualSpacingDemo } from "@/components/magic/GradualSpacing";




const AdvicePage = () => {
  return (
    <>
      {/* <Relume /> */}
      <MindWellTitle />
      <Showtext  />
      

      <DevLoomImage />

      <GradualSpacingDemo />

      {/* <div className="grid w-full grid-cols-1 md:grid-cols-2">
        <AnimatedListDemo />
        <AnimatedListDemo2 />
      </div> */}

    
    </>
  );
};

export default AdvicePage;
