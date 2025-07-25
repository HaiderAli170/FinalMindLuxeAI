/* eslint-disable react/no-unescaped-entities */
"use client"
import { AnimationContainer, Icons, MaxWidthWrapper } from "@/components";
import { Button, buttonVariants } from "@/components/ui/button";
import { FEATURES, PLANS } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib";
import { ArrowRightIcon, CheckIcon, Star } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { getReviews,createReview } from "@/actions";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const HomePage = () => {
  const baseDelay = 0.2;
  // Form state for review submission
  const [formData, setFormData] = useState({
    name: "",
    stars: 0,
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stars" ? Number(value) : value,
    }));
  };

  // API: createReview


  // Handle form submit
  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.stars) {
      alert("Please fill all fields and select a star rating.");
      return;
    }
    setSubmitting(true);
    try {
      const newReview = await createReview(formData);
      setReviews((prev) => [newReview, ...prev]);
      setFormData({ name: "", stars: 0, description: "" });
    } catch (err: any) {
      alert(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const [reviews, setReviews] = useState<any[]>([]);

  
  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getReviews();
      setReviews(reviews);
    };
    fetchReviews();
  }, []);
  useEffect(() => {
    
  }, [reviews]);
  return (
    <>
      {/* hero */}
      <MaxWidthWrapper className="flex sm:flex-row flex-col gap-5 items-center w-full  relative">
        <div className="flex flex-col items-center justify-center w-full py-20  text-center">
          <div className="flex items-center justify-center lg:gap-16 w-full absolute top-[15%] left-1/2 -translate-x-1/2 -z-10">
            <div className="w-52 h-52 rounded-full bg-yellow-500 blur-[10rem] opacity-70 -z-10"></div>
            <div className="hidden lg:w-52 h-52 rounded-full bg-amber-500 blur-[10rem] opacity-70 -z-10"></div>
          </div>
          <h1 className="text-foreground py-6 text-4xl sm:text-6xl md:text-6xl font-semibold md:font-bold !leading-snug tracking-normal text-balance w-full">
            Your Personal <br />
            {""}
            <span className="bg-gradient-to-r from-primary to-amber-500 text-transparent bg-clip-text">
              Mind Health
            </span>{" "}
            Assistant
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl py-2">
            Receive immediate assistance and tailored advice for your mental
            well-being, powered by AI.
          </p>
          <div className="flex flex-row md:flex-row items-center justify-center gap-4 mt-8 w-full">
            <Link href="/dashboard" className={buttonVariants()}>
              Start for free here
              <ArrowRightIcon className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
        <div className="items-center">
          <AnimationContainer>
            <Image
              src={"/images/brain-gym.png"}
              width={500}
              height={500}
              alt="Brain Gym"
            />
          </AnimationContainer>
        </div>
      </MaxWidthWrapper>

      {/* features */}
      <MaxWidthWrapper className="py-10">
        <div className="flex flex-col text-start md:text-center justify-center w-full py-8 max-w-lg mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold font-heading text-foreground mt-6">
            Features that will <span className="text-gradient">amaze</span> you
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            MIND LUXE AI is packed with features that will help you get the
            right medications for your symptoms
          </p>
        </div>
        <AnimationContainer>
          <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-y-8 md:gap-x-8 w-full">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex flex-col items-start">
                <feature.icon className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-medium font-heading mt-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm md:text-base">
                  {feature.info}
                </p>
              </div>
            ))}
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>

      {/* pricing */}
      <MaxWidthWrapper className="py-10">
        <div className="flex flex-col text-start md:text-center justify-center w-full py-8 max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold font-heading text-foreground mt-6">
            Choose a <span className="text-gradient">plan</span> that works for
            you
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Get started with our free plan or upgrade to a premium plan for
            additional features
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-8 gap-6 max-w-3xl px-0 lg:px-8 mx-auto w-full">
          {PLANS.map((plan, index) => (
            <AnimationContainer
              key={plan.name}
              delay={baseDelay + index / 5}
              className="flex flex-col w-full h-full"
            >
              <Card
                className={cn(
                  "w-full h-full flex flex-col rounded-xl border-2 shadow-none",
                  plan.name === "Pro" ? "border-primary" : "border-border"
                )}
              >
                <CardHeader>
                  <CardTitle className="font-heading">{plan.name}</CardTitle>
                  <CardDescription>{plan.info}</CardDescription>
                  <h5 className="text-3xl md:text-4xl font-semibold font-heading pt-2">
                    ${plan.price}
                    <span className="text-sm text-muted-foreground font-normal">
                      {plan.name === "Pro" ? "(one time)" : ""}
                    </span>
                  </h5>
                </CardHeader>
                <CardContent className="w-full">
                  <ul className="flex flex-col items-start gap-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckIcon
                          className={cn(
                            "w-5 h-5",
                            plan.name === "Pro"
                              ? "text-primary"
                              : "text-foreground"
                          )}
                        />
                        <TooltipProvider>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <p
                                className={cn(
                                  "text-sm text-muted-foreground",
                                  feature.tooltip &&
                                    "border-b border-dotted border-border cursor-pointer"
                                )}
                              >
                                {feature.text}
                              </p>
                            </TooltipTrigger>
                            {feature.tooltip && (
                              <TooltipContent>{feature.tooltip}</TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto w-full">
                  <Button
                    asChild
                    variant={plan.name === "Pro" ? "default" : "secondary"}
                  >
                    <Link
                      href={plan.btn.href}
                      className="flex items-center w-full group"
                    >
                      {plan.btn.text}
                      <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimationContainer>
          ))}
        </div>
      </MaxWidthWrapper>
      {/* Reviews Section */}
      <MaxWidthWrapper className="py-16">
        <div className="max-w-8xl mx-auto rounded-2xl w-full  p-9 ">
          <h2 className="text-2xl font-bold mb-6 p-5 text-center">Testimonials</h2>
          {/* Animated Reviews Carousel */}
          <div className="relative rounded-2xl">
            {/* Fade overlays */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-gray-100  to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full  w-16 z-10 bg-gradient-to-l from-gray-100  to-transparent" />
            <div className="overflow-x-hidden w-full mb-3">
              <motion.div
                className="flex flex-row gap-4"
                style={{ width: reviews.length > 0 ? `${reviews.length * 300}px` : "100%" }}
                animate={{
                  x: [0, -(reviews.length * 260)],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: reviews.length * 2.5,
                  ease: "linear",
                }}
              >
                {reviews && reviews.length > 0 ? (
                  [...reviews, ...reviews]?.map((review, idx) => (
                    <motion.div
                      key={idx}
                      className="inline-block min-w-[260px] max-w-xs border rounded-xl p-7 bg-white/90 shadow-lg backdrop-blur-md hover:scale-105 transition-transform duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground truncate max-w-[120px]">{review.name || review.email}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.stars ? "text-yellow-400" : "text-gray-300"}`} fill={i < review.stars ? "#facc15" : "none"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2">{review.description}</p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center">No reviews yet. Be the first to add one!</p>
                )}
              </motion.div>
            </div>
          </div>
          {/* Add Review Button and Modal */}
          <div className="flex justify-center mt-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">Add Review</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md w-full">
                <DialogHeader>
                  <DialogTitle>Add Your Review</DialogTitle>
                </DialogHeader>
                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const name = (form.name as any).value.trim();
                    const description = (form.description as HTMLTextAreaElement).value.trim();
                    if (!name || !description || !formData.stars) {
                      alert("Please fill all fields and select a star rating.");
                      return;
                    }
                    try {
                      const newReview = await createReview({ name, stars: formData.stars, description });
                      setReviews((prev) => [newReview, ...prev]);
                      setFormData({ name: "", stars: 0, description: "" });
                      (form.querySelector("button[type='button']") as HTMLElement)?.click(); // close modal
                    } catch (err: any) {
                      alert(err.message || "Failed to submit review");
                    }
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full border rounded px-3 py-2 text-sm"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      className="w-full border rounded px-3 py-2 text-sm"
                      rows={3}
                      placeholder="Share your experience..."
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Star Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className="focus:outline-none"
                          onClick={() => setFormData((prev) => ({ ...prev, stars: star }))}
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${formData.stars >= star ? "text-yellow-400" : "text-gray-300"}`}
                            fill={formData.stars >= star ? "#facc15" : "none"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit Review"}
                    </Button>
                  </div>
                </form>
                <DialogClose asChild>
                  <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Close</span>
                    ×
                  </button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Reviews State Management */}
      {/*
        Place this at the top of your component (outside the return statement):

        const [reviews, setReviews] = React.useState(() => {
          if (typeof window !== "undefined") {
            const stored = window.localStorage.getItem("reviews");
            return stored ? JSON.parse(stored) : [];
          }
          return [];
        });
      */}

      {/* cta */}
      <MaxWidthWrapper className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-full mx-auto w-full py-8 text-start gap-8">
          <AnimationContainer>
            <div className="flex w-full relative">
              <Image
                src="/files/doctor.png"
                alt="mockup"
                width={1000}
                height={1200}
                quality={100}
                priority
                className="mx-auto lg:mr-auto h-[420px] max-w-full sm:max-w-sm"
              />
            </div>
          </AnimationContainer>
          <div className="flex flex-col items-center justify-center text-center md:items-start md:text-start w-full">
            <h2 className="text-3xl md:text-4xl font-semibold font-heading text-foreground">
              Start your journey to better health
            </h2>
            <p className="text-muted-foreground max-w-lg mt-4">
              <h2 className="text-orange-600 font-medium ">
                Feeling overwhelmed or stressed ?{" "}
              </h2>
              Take control of your mental health with MIND LUXE AI. Get
              personalized support, AI-powered chatbot, and real-time guidance
              to help you on your path to wellness.
            </p>

            <p className="text-muted-foreground max-w-lg mt-4">
              <h2 className="text-orange-600 font-medium ">
                Restore Your Well-Being
              </h2>
              Let MIND LUXE AI provide tailored recommendations and the right
              care, ensuring you're always on track to feeling better.
            </p>
            <AnimationContainer>
              <Link
                href="/dashboard"
                className={buttonVariants({ className: "mt-8" })}
              >
                Renew your health
                <ArrowRightIcon className="w-4 h-4 ml-1.5" />
              </Link>
            </AnimationContainer>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default HomePage;
