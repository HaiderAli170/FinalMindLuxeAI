
// @ts-nocheck


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
import { Input } from "@/components/ui/input";
import { cn, StepThreeSchema, StepThreeSchemaType } from "@/lib";
import { RadioGroup } from "@headlessui/react";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface Props {
  nextStep: () => void;
}

const StepThree = ({ nextStep }: Props) => {
  const form = useForm<StepThreeSchemaType>({
    resolver: zodResolver(StepThreeSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["step-three"],
    mutationFn: async ({
      name,
      adherence,
      dosage,
      frequency,
      purpose,
    }: StepThreeSchemaType) => {
      const payload: StepThreeSchemaType = {
        name,
        adherence,
        dosage,
        frequency,
        purpose,
      };

      const { data } = await axios.post("/api/onboarding/step-three", payload);
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

  const onSubmit = (data: StepThreeSchemaType) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6 w-full h-full relative"
        >
          <div className="text-xs text-amber-400 font-semibold tracking-wide uppercase  ">
            These information helps us to Give you better Results{" "}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="text-16-regular">
                  What mental health challenges are you facing?
                  </FormLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    className="text-16-regular"
                    disabled={isPending}
                       placeholder="Anxiety, Stress, Depression, etc."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dosage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="dosage" className="text-16-regular"> How often do you experience these symptoms ?</FormLabel>
                  <Input
                    {...field}
                    id="dosage"
                    type="text"
                    className="text-16-regular"
                    disabled={isPending}
                     placeholder="Ex: daily, weekly"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="text-xs text-orange-400 font-semibold tracking-wide uppercase  ">
            if you are not taking anything ! ? Please type Nothing
          </div>

          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="purpose" className="text-16-regular">
                What coping mechanisms do you use?
                </FormLabel>
                <Textarea
                  {...field}
                  id="purpose"
                  disabled={isPending}

                  placeholder="Meditation, Exercise, Therapy, etc."
                  className="w-full max-h-20 text-16-regular "
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="frequency" className="text-16-regular">
                How often do you take time for self care Activities(ex: Exercise,Relaxation)
                </FormLabel>
                <RadioGroup
                  value={field.value}
                  onChange={field.onChange}
                  className="grid grid-cols-2 text-16-regular md:grid-cols-4 gap-2"
                >
                  {["DAILY", "WEEKLY", "MONTHLY", "RARELY"].map((freq) => (
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
          <FormField
            control={form.control}
            name="adherence"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="adherence" className="text-16-regular">
                How often you get Anger Issues ?
                </FormLabel>
                <RadioGroup
                  value={field.value}
                  onChange={field.onChange}
                  className="grid grid-cols-2 text-16-regular md:grid-cols-5 gap-2"
                >
                  {["ALWAYS", "OFTEN", "SOMETIMES", "NEVER", "RARELY"].map(
                    (adhere) => (
                      <RadioGroup.Option
                        key={adhere}
                        value={adhere}
                        id={adhere}
                        className={({ active, checked }) =>
                          cn(
                            "border-2  rounded-lg w-full  text-center   border-border outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95 h-full border-b-4 hover:bg-black/5 cursor-pointer active:border-amber-500 active:border-b-2 flex flex-col items-center justify-between p-3 focus:outline-none ring-0 focus:ring-0  md:font-semibold font-medium",
                            (active || checked) && "border-primary"
                          )
                        }
                      >
                        <RadioGroup.Label
                          as="span"
                          htmlFor={adhere}
                          className="text-sm !capitalize"
                          p
                        >
                          {adhere.toLowerCase()}
                        </RadioGroup.Label>
                      </RadioGroup.Option>
                    )
                  )}
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center flex-col    md:flex-row justify-end w-full mt-10 gap-6">
            <p className="text-16-regular">
              You can update these settings in dashboard
            </p>
            <Button
              type="submit"
              disabled={isPending}
              className="md:w-24 w-full bg-primary text-white bg:text-amber-600  hover:text-slate-600 gap-x-2"
            >
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

export default StepThree;
