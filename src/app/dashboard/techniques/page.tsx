// import React from 'react'
// import GradualSpacing from "@/components/magicui/gradual-spacing";

// const page = () => {
//   return (
//     <>
//       <GradualSpacing
//       className="my-5 text-center text-[16px] font-bold -tracking-widest text-black
//        dark:text-white md:my-7 md:text-5xl md:leading-[5rem]"
//       text="Unlock your Inner Peace Step by step "
//     />

// <div className="flex flex-col ">

//      <div>
//       todo:  Mental Wellness Techniques !
//      </div>

//       <p> Facts and Knowledge</p>

//      <p> Like Yoga (use Image i have some in my public folder) </p>

//   just create 2 blogs !
//     <p>blogs written by mental health Experts </p>

//     </div>
//     </>

//   )
// }

// export default page
"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import Image from "next/image"; // Assuming you're using Next.js for optimized images

const page = () => {
  return (
    <>
      <GradualSpacing
        className="my-5 text-center text-[16px] font-bold -tracking-widest text-black dark:text-white md:my-7 md:text-5xl md:leading-[5rem]"
        text="Unlock your Inner Peace Step by Step"
      />

      <div className="flex flex-col gap-5 px-5 md:px-10">
        {/* Section for Mental Wellness Techniques */}
        <div className="text-center">
          <h2 className="text-xl font-bold md:text-3xl">
            Mental Wellness Techniques
          </h2>
          <p className="my-3 text-gray-600 dark:text-gray-300">
            Here are some techniques to improve your mental well-being and help
            you relax.
          </p>

          <div className="flex justify-center">
            <Image
              src="/files/meditation.png" // Use your actual path to the image
              alt="Yoga for Mental Wellness"
              width={400}
              height={400}
              className="rounded-lg  "
            />
          </div>
        </div>

        {/* Section for Facts and Knowledge */}
        <div className="text-center">
          <h3 className="text-lg font-semibold md:text-2xl">
            Facts on Mental Health{" "}
          </h3>
          <p className="my-3 text-gray-600 dark:text-gray-300">
            Learn more about the benefits of practices like yoga, meditation,
            and breathing exercises for mental well-being.
          </p>
        </div>

        {/* Blog section */}
        <div className=" text-center">
          <div className="flex flex-col  items-center ">
            <Image
              src="/files/doc.png" // Use your actual path to the image
              alt="Yoga for Mental Wellness"
              width={90}
              height={90}
            />
            <h2 className="text-2xl font-bold md:text-4xl">
              Blogs by Mental Health Experts
            </h2>
            <div className="flex justify-center"></div>
          </div>

          {/* Blog 1 */}
          <div className="flex flex-row gap-3">
            <div className="mt-5 p-5 border-b border-gray-300 dark:border-gray-600">
              <h3 className="text-xl font-semibold">
                The Power of Mindfulness
              </h3>
              <p className="my-3 text-gray-600 dark:text-gray-300">
                Discover how mindfulness can reduce stress and anxiety, helping
                you maintain a balanced mental state. Learn more from experts in
                the field.
              </p>

              {/* more blog details  */}
            </div>

            {/* Blog 2 */}
            <div className="mt-5 p-5 border-b border-gray-300 dark:border-gray-600">
              <h3 className="text-xl font-semibold">
                Breathing Techniques for Stress Relief
              </h3>
              <p className="my-3 text-gray-600 dark:text-gray-300">
                Learn the best breathing techniques for immediate stress relief
                and mental clarity, written by health experts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
