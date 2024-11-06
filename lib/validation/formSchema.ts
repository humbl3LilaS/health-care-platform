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
        identificationNumber: z.string({required_error: "Please provider your identification number"}),
        identificationDocument: z.custom<File[]>()
                                 .refine(
                                     arg => arg.length > 0,
                                     {message: "Please upload document for further identification"}
                                 ),
        treatmentConsent: z.boolean()
                           .refine(arg => arg, {message: "We can treat you if you don't consent treatment"}),
        privacyConsent: z.boolean().optional(),
        disclosureConsent: z.boolean().optional(),

    }
)

export type RegisterFormSchemaType = Zod.infer<typeof RegisterFormSchema>;

export const RegisterFormDefaultValues: WithRequired<RegisterFormSchemaType> = {
    name: "",
    email: "",
    phone: "",
    dateOfBirth: new Date(),
    gender: "",
    address: "",
    occupation: "",
    emergencyContactNumber: "",
    emergencyContactName: "",
    primaryPhysician: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "",
    identificationNumber: "",
    identificationDocument: [],
    treatmentConsent: false,
    privacyConsent: false,
    disclosureConsent: false,
}

export const AppointmentFormSchema = z.object(
    {
        primaryPhysician: z.string({required_error: "Doctor is required"}),
        reason: z.string({required_error: "Need to provide the reason"}),
        note: z.string().optional(),
        schedule: z.date({required_error: "Please provide the date of appointment date"}),
    }
)

export type AppointmentFormSchemaType = Zod.infer<typeof AppointmentFormSchema>;

export const AppointmentFormDefaultValues: WithRequired<AppointmentFormSchemaType> = {
    primaryPhysician: "",
    reason: "",
    note: "",
    schedule: new Date(),
}