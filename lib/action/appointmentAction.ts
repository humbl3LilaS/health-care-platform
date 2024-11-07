"use server"

import {AppointmentFormSchemaType} from "@/lib/validation/formSchema";
import {APPOINTMENT_COLLECTION, databases, DB_ID} from "@/lib/appwrite.config";
import {ID} from "node-appwrite";

export const createAppointment = async ({userId, patientId, payload}: {
    userId: string,
    patientId: string,
    payload: AppointmentFormSchemaType
}) => {
    try {
        const appointmentData = {
            userId,
            patient: patientId,
            ...payload,
        }
        const appointment = await databases.createDocument(
            DB_ID!,
            APPOINTMENT_COLLECTION!,
            ID.unique(),
            {...appointmentData}
        )
        if (!appointment) {
            return undefined;
        }
        return appointment;
    } catch (error) {
        console.log(error)
    }
}
export const getAppointmentById = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DB_ID!,
            APPOINTMENT_COLLECTION!,
            appointmentId
        );

        if (!appointment) {
            return undefined;
        }
        return appointment;
    } catch (error) {
        console.log("Error fetching appointment by Id", error)
    }
}