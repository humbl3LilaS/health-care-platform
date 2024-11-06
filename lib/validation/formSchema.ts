import {z} from "zod";
import {GENDER} from "@/constants";
import {WithRequired} from "@/types";

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
        primaryPhysician: z.string({required_error: "Please select your primary physician"}),
        insuranceProvider: z.string({required_error: "Please select your Insurance Provider"}),
        insurancePolicyNumber: z.string({required_error: "Please select your Insurance Provider"}),
        allergies: z.string().optional(),
        currentMedication: z.string().optional(),
        familyMedicalHistory: z.string().optional(),
        pastMedicalHistory: z.string().optional(),
        identificationType: z.string({required_error: "Please select your Identification Type"}),
        identificationNumber: z.string({required_error: "Please provider your identification nubmer"}),
        identificationDocument: z.custom<File[]>()
                                 .refine(
                                     arg => arg.length > 0,
                                     {message: "Please upload document for further indetification"}
                                 ),
    }
)

export type RegisterFormSchemaType = Zod.infer<typeof RegisterFormSchema>;

export const RegisterFormDefaultValues: WithRequired<RegisterFormSchemaType> = {
    name: "Super Edelweiss",
    email: "sabishinekobebe@gmail.com",
    phone: "09773543961",
    dateOfBirth: new Date(),
    gender: "",
    address: "12th Super",
    occupation: "Software Engineer",
    emergencyContactNumber: "0978765432",
    emergencyContactName: "Super Duper",
    primaryPhysician: "",
    insuranceProvider: "Super Safe",
    insurancePolicyNumber: "ADB123324",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "",
    identificationNumber: "12345678",
    identificationDocument: [],
}