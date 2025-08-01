"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, StepFourSchema, StepFourSchemaType } from "@/lib";
import { RadioGroup } from "@headlessui/react";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  nextStep: () => void;
}

const emojiMap = {
  HAPPY: "/emoji/HAPPY.png",
  SAD: "/emoji/SAD.png",
  ANGRY: "/emoji/ANGRY.png",
  ANXIOUS: "/emoji/ANXIOUS.png",
  STRESSED: "/emoji/TIRED.png",
  NEUTRAL: "/emoji/NEUTRAL.png",
};

const StepFour = ({ nextStep }: Props) => {
  const form = useForm<StepFourSchemaType>({
    resolver: zodResolver(StepFourSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["step-four"],
    mutationFn: async ({
      anxiety,
      happiness,
      mood,
      sleep,
      stress,
    }: StepFourSchemaType) => {
      const payload: StepFourSchemaType = {
        anxiety,
        happiness,
        mood,
        sleep,
        stress,
      };

      const { data } = await axios.post("/api/onboarding/step-four", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Data saved!");
      nextStep();
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: StepFourSchemaType) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6 w-full h-full relative"
        >
          <FormField
            control={form.control}
            name="happiness"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="happiness" className="text-16-regular">
                  How happy are you today?
                </FormLabel>
                <RadioGroup
                  value={field.value?.toString()}
                  onChange={(value) => field.onChange(Number(value))}
                  className="grid grid-cols-2 text-xs font-semibold md:grid-cols-4   gap-2"
                >
                  {[
                    { value: "1", label: "Unhappy" },
                    { value: "2", label: "Slightly Down" },
                    { value: "3", label: "Neutral" },
                    { value: "4", label: "Content" },
                    { value: "5", label: "Pleased" },
                    { value: "6", label: "Happy" },
                    { value: "7", label: "Joyful" },
                    { value: "8", label: "Ecstatic" }
                  ].map((option) => (
                    <RadioGroup.Option
                      key={option.value}
                      id={`happiness-${option.value}`}
                      value={option.value}
                      className={({ active, checked }) =>
                        cn(
                          "border-2 rounded-lg w-full py-2 text-center border-border outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95 h-full border-b-4 hover:bg-black/5 cursor-pointer active:border-amber-500 active:border-b-2 flex flex-col items-center justify-between p-3 focus:outline-none ring-0 focus:ring-0 md:font-semibold font-medium",
                          (active || checked) && "border-primary"
                        )
                      }
                    >
                      <RadioGroup.Label
                        htmlFor={`happiness-${option.value}`}
                        className="cursor-pointer text-sm"
                      >
                        {option.label}
                      </RadioGroup.Label>
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="mood" className="text-16-regular">How do you feel today?</FormLabel>
                <RadioGroup
                  value={field.value}
                  onChange={field.onChange}
                  className="grid grid-cols-2 text-16-regular md:grid-cols-6 gap-2"
                >
                  {[
                    "HAPPY",
                    "SAD",
                    "ANGRY",
                    "ANXIOUS",
                    "STRESSED",
                    "NEUTRAL",
                  ].map((freq) => (
                    <RadioGroup.Option
                      key={freq}
                      value={freq}
                      id={freq}
                      className={({ active, checked }) =>
                        cn(
                          "border-2  rounded-lg w-full  text-center    border-border outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95 h-full border-b-4 hover:bg-black/5 cursor-pointer active:border-amber-500 active:border-b-2 flex flex-col items-center justify-between p-3 focus:outline-none ring-0 focus:ring-0  md:font-semibold font-medium",
                          (active || checked) && "border-primary"
                        )
                      }
                    >
                      <Image
                        src={emojiMap[freq as keyof typeof emojiMap]}
                        alt={`${freq} image`}
                        height={140}
                        width={130}
                        className="rounded-lg border p-2 object-cover aspect-square"
                      />
                      <RadioGroup.Label
                        as="span"
                        htmlFor={freq}
                        className="text-sm  mt-1  !capitalize"
                      >
                        {freq.replace("_", " ")}
                      </RadioGroup.Label>
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stress"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="stress" className="text-16-regular">
                  How stressed are you today?
                </FormLabel>
                <RadioGroup
                  value={field.value}
                  onChange={field.onChange}
                  className="grid grid-cols-2 text-16-regular md:grid-cols-5 gap-2"
                >
                  {[
                    "NOT_STRESSED",
                    "SLIGHTLY",
                    "MODERATELY",
                    "HIGHLY",
                    "EXTREMELY",
                  ].map((freq) => (
                    <RadioGroup.Option
                      key={freq}
                      value={freq}
                      id={freq}
                      className={({ active, checked }) =>
                        cn(
                          "border-2  rounded-lg w-full  text-center   border-border outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95 h-full border-b-4 hover:bg-black/5 cursor-pointer active:border-amber-500 active:border-b-2 flex flex-col items-center justify-between p-3 focus:outline-none ring-0 focus:ring-0  md:font-semibold font-medium",
                          (active || checked) && "border-primary"
                        )
                      }
                    >
                      <RadioGroup.Label
                        as="span"
                        htmlFor={freq}
                        className="text-sm !capitalize"
                      >
                        {freq.replace("_", " ").toLowerCase()}
                      </RadioGroup.Label>
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sleep"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="sleep" className="text-16-regular">
                  How would you rate your sleep quality?
                </FormLabel>
                <RadioGroup
                  value={field.value}
                  onChange={field.onChange}
                  className="grid grid-cols-2 text-16-regular md:grid-cols-3 gap-2"
                >
                  {["GOOD", "BAD", "AVERAGE"].map((freq) => (
                    <RadioGroup.Option
                      key={freq}
                      value={freq}
                      id={freq}
                      className={({ active, checked }) =>
                        cn(
                          "border-2  rounded-lg w-full  text-center   border-border outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95 h-full border-b-4 hover:bg-black/5 cursor-pointer active:border-amber-500 active:border-b-2 flex flex-col items-center justify-between p-3 focus:outline-none ring-0 focus:ring-0  md:font-semibold font-medium",
                          (active || checked) && "border-primary"
                        )
                      }
                    >
                      <RadioGroup.Label
                        as="span"
                        htmlFor={freq}
                        className="text-sm !capitalize"
                      >
                        {freq.toLowerCase()}
                      </RadioGroup.Label>
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end w-full mt-10 gap-6">
            <p className="text-16-regular ">
              You can update these settings in dashboard
            </p>
            <Button type="submit" disabled={isPending} className="w-24 gap-x-2">
              Next
              {isPending ? (
                <LoaderIcon className="animate-spin h-4 w-4" />
              ) : (
                <ArrowRightIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepFour;
