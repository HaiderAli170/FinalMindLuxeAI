// @ts-nocheck


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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, StepOneSchema, StepOneSchemaType } from "@/lib";
import { RadioGroup } from "@headlessui/react";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";
import Image from "next/image";

const symptomImageMap = {
  male: "/images/male.svg",
  female: "/images/female.svg",
  other: "/images/others.png",
};

interface Props {
  nextStep: () => void;
}

const StepOne = ({ nextStep }: Props) => {
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm');
  const form = useForm<StepOneSchemaType>({
    resolver: zodResolver(StepOneSchema),
  });

  // Function to convert inches to centimeters
  const inchesToCm = (inches: number) => {
    return Math.round(inches * 2.54);
  };

  // Function to convert centimeters to inches
  const cmToInches = (cm: number) => {
    return Math.round(cm / 2.54 * 10) / 10;
  };

  // Handle height unit change
  const handleHeightUnitChange = (newUnit: 'cm' | 'in') => {
    const currentHeight = form.getValues('height');
    if (currentHeight) {
      if (newUnit === 'cm' && heightUnit === 'in') {
        form.setValue('height', inchesToCm(Number(currentHeight)).toString());
      } else if (newUnit === 'in' && heightUnit === 'cm') {
        form.setValue('height', cmToInches(Number(currentHeight)).toString());
      }
    }
    setHeightUnit(newUnit);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["step-one"],
    mutationFn: async ({
      // profession,
      age,
      bloodGroup,
      gender,
      height,
      weight,
    }: StepOneSchemaType) => {
      const payload: StepOneSchemaType = {
        // profession , 
        age,
        bloodGroup,
        gender,
        height,
        weight,
      };

      const { data } = await axios.post("/api/onboarding/step-one", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Data saved!");
      nextStep();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => mutate(e))}
          className="flex flex-col gap-y-6 h-full w-full relative"
        >
          {/* <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel> What are You </FormLabel>
                <RadioGroup
                  value={field.value}
                  onChange={field.onChange}
                  className="grid grid-cols-1 md:grid-cols-2  font-bold text-[16px]  gap-2"
                >
                  {["student", "professional"].map((symptom) => (
                    <RadioGroup.Option
                      key={symptom}
                      value={symptom}
                      id={symptom}
                      className={({ active, checked }) =>
                        cn(
                          "border-2 border-border rounded-lg w-full py-2 text-center  focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95 h-full  border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 min-w-[200px] ",
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
          /> */}

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Specify your gender</FormLabel>
                <RadioGroup
                  value={field.value}
                  onChange={field.onChange}
                  className="grid grid-cols-1 md:grid-cols-3  font-bold text-[16px]  gap-2"
                >
                  {["male", "female", "other"].map((symptom) => (
                    <RadioGroup.Option
                      key={symptom}
                      value={symptom}
                      id={symptom}
                      className={({ active, checked }) =>
                        cn(
                          "border-2 border-border rounded-lg w-full py-2 text-center  focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95 h-full  border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[200px] min-w-[200px] ",
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
                      <Image
                        src={symptomImageMap[symptom]} // Map image based on symptom
                        alt={`${symptom} image`}
                        height={140}
                        width={130}
                        className="rounded-lg  border p-2 object-cover aspect-square "
                      />
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-16-regular">Weight (kg)</FormLabel>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="62"
                    type="number"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-16-regular">Height</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={heightUnit === 'cm' ? "170" : "67"}
                      type="number"
                      className="flex-1"
                      // Remove any validation or conversion logic here, just let user type any number
                    />
                    <Select
                      value={heightUnit}
                      onValueChange={(value: 'cm' | 'in') => setHeightUnit(value)}
                    >
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="in">in</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {heightUnit === 'cm' ? 'Centimeters' : 'Inches'}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-16-regular">What is your age?</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    placeholder="25"
                    disabled={isPending}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-16-regular">Your blood group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (bloodGroup) => (
                          <SelectItem key={bloodGroup} value={bloodGroup}>
                            {bloodGroup}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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

export default StepOne;
