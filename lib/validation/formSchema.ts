import {z} from "zod";

export const PatientFormSchema = z.object(
    {
        name: z.string({required_error: "Name is required"}).min(4, {message: 'Name must be at least 4 characters'}),
    }
)

export type PatientFormSchemaType = Zod.infer<typeof PatientFormSchema>;