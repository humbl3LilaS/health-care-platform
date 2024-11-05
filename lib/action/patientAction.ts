"use server";
import {AppwriteException, ID, Query} from "node-appwrite";
import {users} from "@/lib/appwrite.config";

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