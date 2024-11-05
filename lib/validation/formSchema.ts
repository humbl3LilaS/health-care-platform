import {z} from "zod";

export const PatientFormSchema = z.object(
    {
        name: z.string({required_error: "Name is required"})
               .min(4, {message: 'Name must be at least 4 characters'})
               .max(20, {message: 'Name must be less than 20 characters'}),
        email: z.string({required_error: "Email is required"})
                .email({message: 'Invalid Email'}),
        phone: z.string({required_error: "Phone number is required"})
                .regex(/^09\d{9}$/, {message: 'Invalid Phone number'}),
    }
)

export type PatientFormSchemaType = Zod.infer<typeof PatientFormSchema>;