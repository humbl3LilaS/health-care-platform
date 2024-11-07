/* eslint-disable no-unused-vars */

import {Appointment} from "@/types/appwrite.types";
import {AccessorKeyColumnDefBase, DeepKeys, DeepValue, StringOrTemplateHeader} from "@tanstack/react-table";

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
}

declare interface User extends CreateUserParams {
    $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
    userId: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies: string | undefined;
    currentMedication: string | undefined;
    familyMedicalHistory: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
    userId: string;
    patient: string;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
};

declare type UpdateAppointmentParams = {
    appointmentId: string;
    userId: string;
    appointment: Appointment;
    type: string;
};

type WithRequired<T> = {
    [P in keyof T]-?: T[P];
}


declare type AppointmentCounts = {
    scheduled: number;
    pending: number;
    cancelled: number;
}


declare type DataColumn<T> = ((AccessorKeyColumnDefBase<T, string extends DeepKeys<T>
                                                                  ? DeepValue<T, string>
                                                                  : never> & {
    id?: string;
    header?: StringOrTemplateHeader<T, string extends DeepKeys<T> ? DeepValue<T, string>
                                                                                      : never>
}) | (AccessorKeyColumnDefBase<T, string extends DeepKeys<T> ? DeepValue<T, string>
                                                                                 : never> & {
    header?: string;
    id?: string
}))[]