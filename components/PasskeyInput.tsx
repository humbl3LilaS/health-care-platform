"use client"
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {useEffect, useState} from "react";
import {AlertDialogAction, AlertDialogFooter} from "@/components/ui/alert-dialog";
import {useRouter} from "next/navigation";
import {decryptKey, encryptKey} from "@/lib/utils";

const PasskeyInput = () => {
    const [passkey, setPasskey] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();


    const encryptedKey = localStorage.getItem("access");
    useEffect(() => {
        if (encryptedKey && decryptKey(encryptedKey) === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            router.push("/admin");
        }
    }, [encryptedKey, router]);


    // Todo: create admin table in appwrite and use email and password as authentication
    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey);
            localStorage.setItem("access", encryptedKey);
            router.push("/admin");
        } else {
            setError("Invalid Passkey. Please Try again")
        }
    }

    return (
        <>
            <div>
                <InputOTP maxLength={6} value={passkey} onChange={setPasskey}>
                    <InputOTPGroup className={"shad-otp"}>
                        <InputOTPSlot index={0} className={"shad-otp-slot"}/>
                        <InputOTPSlot index={1} className={"shad-otp-slot"}/>
                        <InputOTPSlot index={2} className={"shad-otp-slot"}/>
                        <InputOTPSlot index={3} className={"shad-otp-slot"}/>
                        <InputOTPSlot index={4} className={"shad-otp-slot"}/>
                        <InputOTPSlot index={5} className={"shad-otp-slot"}/>
                    </InputOTPGroup>
                </InputOTP>
                {error && <p className={"mt-4 shad-error text-14-regular text-center"}>{error}</p>}
            </div>
            <AlertDialogFooter>
                <AlertDialogAction
                    className={"shad-primary-btn w-full"}
                    onClick={validatePasskey}
                >
                    Enter Admin Passkey
                </AlertDialogAction>
            </AlertDialogFooter>
        </>
    )
        ;
};

export default PasskeyInput;