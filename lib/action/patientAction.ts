"use server";
import {AppwriteException, ID, Query} from "node-appwrite";
import {
    BUCKET_ID,
    databases,
    DB_ID,
    ENDPOINT,
    PATIENT_COLLECTION,
    PROJECT_ID,
    storage,
    users
} from "@/lib/appwrite.config";
import {RegisterFormSchemaType} from "@/lib/validation/formSchema";
import {InputFile} from "node-appwrite/file";
import {CreateUserParams} from "@/types";

export const createUser = async (user: CreateUserParams) => {
    try {
        const phoneNumber = "+95" + user.phone.substring(1);
        const newUser = await users.create(ID.unique(), user.email, phoneNumber, undefined, user.name);
        return newUser;
    } catch (error) {
        if (error instanceof AppwriteException && error.code === 409) {
            const documents = await users.list(
                [Query.equal("email", [user.email])]
            )

            return documents?.users[0];
        }
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const registerPatient = async ({userId, payload, formData}: {
    userId: string;
    payload: RegisterFormSchemaType,
    formData: FormData
}) => {
    try {
        const inputFile = InputFile.fromBuffer(
            formData.get("blob") as Blob, formData.get("fileName") as string
        )

        const file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);

        if (!userId) {
            return false;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {identificationDocument, ...rest} = payload;
        const patient = await databases.createDocument(
            DB_ID!,
            PATIENT_COLLECTION!,
            ID.unique(),
            {
                userId,
                ...rest,
                identificationDocumentId: file.$id,
                identificationDocumentUrl: `${ENDPOINT!}/storage/buckets/${BUCKET_ID!}/files/${file.$id}/view?project=${PROJECT_ID!}`,
            }
        );
        return patient;
    } catch (error) {
        console.log(error);
    }

}