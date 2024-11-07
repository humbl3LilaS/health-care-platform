"use server"

import {AppointmentFormSchemaType} from "@/lib/validation/formSchema";
import {APPOINTMENT_COLLECTION, databases, DB_ID} from "@/lib/appwrite.config";
import {ID, Query} from "node-appwrite";
import {Appointment} from "@/types/appwrite.types";

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


export const getAppointments = async (): Promise<Appointment[] | undefined> => {
    try {
        const appointments = await databases.listDocuments(
            DB_ID!,
            APPOINTMENT_COLLECTION!,
            [Query.orderDesc("$createdAt")]
        )
        if (!appointments) {
            return undefined;
        }
        return appointments.documents as Appointment[];
    } catch (error) {
        console.log("Error fetching appointments", error)
    }
}

export const updateAppointment = async ({payload, appointmentId, action}: {
    payload: Partial<Appointment>,
    appointmentId: string,
    action: "schedule" | "cancel"
}) => {
    try {
        const appointment = await databases.updateDocument(
            DB_ID!,
            APPOINTMENT_COLLECTION!,
            appointmentId,
            {
                ...payload,
                status: action === "schedule" ? "scheduled" : "cancelled",
                cancellationReason: action === "cancel" ? payload.cancellationReason : null
            }
        )
        if (!appointment) {
            return undefined
        }
        return appointment
    } catch (error) {
        console.log("Error updating appointment", error);
    }
}