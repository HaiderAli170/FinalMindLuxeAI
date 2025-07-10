"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, StepTwoSchema, StepTwoSchemaType } from "@/lib";
import { RadioGroup } from "@headlessui/react";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";

interface Props {
  nextStep: () => void;
}

const StepTwo = ({ nextStep }: Props) => {
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");
  const [selectedHeadacheType, setSelectedHeadacheType] = useState<string>("");

  const form = useForm<StepTwoSchemaType>({
    resolver: zodResolver(StepTwoSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["step-two"],
    mutationFn: async ({ name, intensity, frequency }: StepTwoSchemaType) => {
      const payload: StepTwoSchemaType = {
        name,
        intensity,
        frequency,
      };

      const { data } = await axios.post("/api/onboarding/step-two", payload);
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

  const onSubmit = (data: StepTwoSchemaType) => {
    mutate(data);
  };

  const handleSymptomChange = (value: string) => {
    setSelectedSymptom(value);
    setSelectedHeadacheType(""); // Reset headache type when symptom changes
    form.setValue("name", value);
  };

  const headacheTypes = [
    "TENSION_HEADACHE",
    "MIGRAINE",
    "CLUSTER_HEADACHE",
    "SINUS_HEADACHE",
    "HORMONAL_HEADACHE",
    "CAFFEINE_WITHDRAWAL",
    "DEHYDRATION_HEADACHE",
    "EYE_STRAIN_HEADACHE",
    "STRESS_HEADACHE",
    "OTHER_HEADACHE"
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6 w-full h-full relative"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-16-regular">What symptom are you experiencing?</FormLabel>
                <RadioGroup
                  value={field.value}
                  onChange={handleSymptomChange}
                  className="grid grid-cols-2 md:grid-cols-5 gap-2"
                >
                  {[
                    "HEADACHE",
                    "NAUSEA",
                    "VOMITING",
                    "DIARRHEA",
                    "FATIGUE",
                    "INSOMNIA",
                    "CONSTIPATION",
                    "MUSCLE_PAIN",
                    "JOINT_PAIN",
                    "OTHER",
                  ].map((symptom) => (
                    <RadioGroup.Option
                      key={symptom}
                      value={symptom}
                      id={symptom}
                      className={({ active, checked }) =>
                        cn(
                          "border-2  rounded-lg w-full py-1 text-center   border-border outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95 h-full border-b-4 hover:bg-black/5 cursor-pointer active:border-amber-500 active:border-b-2 flex flex-col items-center justify-between p-3 focus:outline-none ring-0 focus:ring-0  md:font-semibold font-medium",
                          (active || checked) && "border-primary"
                        )
                      }
                    >
                      <RadioGroup.Label
                        as="span"
                        htmlFor={symptom}
                        className="text-sm !capitalize"
                      >
                        {symptom.replace("_", " ").toLowerCase()}
                      </RadioGroup.Label>
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Headache Type Selection - Only show when HEADACHE is selected */}
          {selectedSymptom === "HEADACHE" && (
            <div className="space-y-4">
              <FormLabel className="text-16-regular">What type of headache are you experiencing?</FormLabel>
              <RadioGroup
                value={selectedHeadacheType}
                onChange={setSelectedHeadacheType}
                className="grid grid-cols-2 md:grid-cols-3 gap-2"
              >
                {headacheTypes.map((headacheType) => (
                  <RadioGroup.Option
                    key={headacheType}
                    value={headacheType}
                    id={headacheType}
                    className={({ active, checked }) =>
                      cn(
                        "border-2 rounded-lg w-full py-2 text-center border-border outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95 h-full border-b-4 hover:bg-black/5 cursor-pointer active:border-amber-500 active:border-b-2 flex flex-col items-center justify-between p-3 focus:outline-none ring-0 focus:ring-0 md:font-semibold font-medium",
                        (active || checked) && "border-primary"
                      )
                    }
                  >
                    <RadioGroup.Label
                      as="span"
                      htmlFor={headacheType}
                      className="text-sm !capitalize"
                    >
                      {headacheType.replace(/_/g, " ").toLowerCase()}
                    </RadioGroup.Label>
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
          )}

          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-16-regular">How often do you experience it?</FormLabel>
                <RadioGroup
                  value={field.value}
                  onChange={field.onChange}
                  className="grid grid-cols-2 md:grid-cols-4 gap-2"
                >
                  {["DAILY", "WEEKLY", "MONTHLY", "RARELY"].map((freq) => (
                    <RadioGroup.Option
                      key={freq}
                      value={freq}
                      id={freq}
                      className={({ active, checked }) =>
                        cn(
                          " border-2  rounded-lg w-full py-1 text-center   border-border outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95 h-full border-b-4 hover:bg-black/5 cursor-pointer active:border-amber-500 active:border-b-2 flex flex-col items-center justify-between p-3 focus:outline-none ring-0 focus:ring-0  md:font-semibold font-medium",
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
          <FormField
            control={form.control}
            name="intensity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-16-regular">How intense is it?</FormLabel>
                <RadioGroup
                  value={field.value?.toString()}
                  onChange={(value) => field.onChange(Number(value))}
                  className="grid grid-cols-2 md:grid-cols-5 gap-2"
                >
                  {[
                    { value: "1", label: "Very Mild" },
                    { value: "2", label: "Mild" },
                    { value: "3", label: "Moderate" },
                    { value: "4", label: "Strong" },
                    { value: "5", label: "Very Strong" },
                    { value: "6", label: "Intense" },
                    { value: "7", label: "Very Intense" },
                    { value: "8", label: "Severe" },
                    { value: "9", label: "Very Severe" },
                    { value: "10", label: "Extreme" }
                  ].map((option) => (
                    <RadioGroup.Option
                      key={option.value}
                      id={`intensity-${option.value}`}
                      value={option.value}
                      className={({ active, checked }) =>
                        cn(
                          "border-2 rounded-lg w-full py-2 text-center border-border outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95 h-full border-b-4 hover:bg-black/5 cursor-pointer active:border-amber-500 active:border-b-2 flex flex-col items-center justify-between p-3 focus:outline-none ring-0 focus:ring-0 md:font-semibold font-medium",
                          (active || checked) && "border-primary"
                        )
                      }
                    >
                      <RadioGroup.Label
                        htmlFor={`intensity-${option.value}`}
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
          <div className="flex items-center justify-end w-full mt-10 gap-6">
            <p className="text-16-regular">
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

export default StepTwo;
