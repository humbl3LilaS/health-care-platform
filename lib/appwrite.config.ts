import * as sdk from "node-appwrite"

export const {
    APPWRITE_PROJECT_ID: PROJECT_ID,
    APPWRITE_API_KEY: API_KEY,
    APPWRITE_DB_ID: DB_ID,
    APPWRITE_COLLECTION_ID_PATIENT: PATIENT_COLLECTION,
    APPWRITE_COLLECTION_ID_DOCTOR: DOCTOR_COLLECTION,
    APPWRITE_COLLECTION_ID_APPOINTMENT: APPOINTMENT_COLLECTION,
    NEXT_PUBLIC_APPWRITE_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;


export const client = new sdk.Client().setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);