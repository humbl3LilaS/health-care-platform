import {z} from "zod";
import {GENDER} from "@/constants";

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


export const RegisterFormSchema = z.object(
    {
        name: z.string({required_error: "Name is required"})
               .min(4, {message: 'Name must be at least 4 characters'})
               .max(20, {message: 'Name must be less than 20 characters'}),
        email: z.string({required_error: "Email is required"})
                .email({message: 'Invalid Email'}),
        phone: z.string({required_error: "Phone number is required"})
                .regex(/^09\d{9}$/, {message: 'Invalid Phone number'}),
        dateOfBirth: z.date(),
        gender: z.string().refine(input => GENDER.includes(input), {message: 'Gender is required'}),
        address: z.string().max(150, {message: 'Too long'}).optional(),
        occupation: z.string().max(150, {message: 'Too long'}).optional(),
        emergencyContactName: z.string()
                               .min(4, {message: 'Name must be at least 4 characters'})
                               .max(20, {message: 'Name must be less than 20 characters'}),
        emergencyContactNumber: z.string({required_error: "Phone number is required"})
                                 .regex(/^09\d{9}$/, {message: 'Invalid Phone number'}),
    }
)

export type RegisterFormSchemaType = Zod.infer<typeof RegisterFormSchema>;

export const RegisterFormDefaultValues: RegisterFormSchemaType = {
    name: "",
    email: "",
    phone: "",
    dateOfBirth: new Date(),
    gender: "",
    address: "",
    occupation: "",
    emergencyContactNumber: "",
    emergencyContactName: ""
}