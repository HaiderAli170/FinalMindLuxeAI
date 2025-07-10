import { z } from "zod";

export const StepOneSchema = z.object({
    // profession: z.enum(["student", "professional"]),
    age: z.coerce.number().min(1, {
        message: "Age must be greater than 0",
    }).max(150).nonnegative(),
    weight: z.coerce.number().min(1, {
        message: "Weight must be greater than 0",
    }).max(300).nonnegative(),
    height: z.coerce.number()
        .min(1, { message: "Height must be greater than 0" })
        .max(300, { message: "Height must be less than 300 cm (or 118 inches)" })
        .nonnegative()
        .refine((val) => val <= 300, {
            message: "If using centimeters, height must be less than 300 cm",
        })
        .refine((val) => val <= 118, {
            message: "If using inches, height must be less than 118 inches",
        }),
    gender: z.enum(["male", "female", "other"]),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
});

export type StepOneSchemaType = z.infer<typeof StepOneSchema>;