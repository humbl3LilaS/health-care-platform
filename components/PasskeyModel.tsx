import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {redirect} from "next/navigation";
import Image from "next/image";
import PasskeyInput from "@/components/PasskeyInput";

type PasskeyModelProps = {
    open: boolean
}

const PasskeyModel = ({open}: PasskeyModelProps) => {


    const onCloseHandler = async () => {
        "use server"
        if (open) {
            redirect("/");
        }
    }
    return (
        <AlertDialog open={open}>
            <AlertDialogContent className={"shad-alert-dialog"}>
                <AlertDialogHeader>
                    <AlertDialogTitle className={"flex justify-between items-start"}>
                        <span>Admin Access Verification</span>
                        <Image
                            src={"/assets/icons/close.svg"}
                            alt={"logo"}
                            width={20}
                            height={20}
                            onClick={onCloseHandler}
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        To access the admin page, please enter the passkey.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <PasskeyInput/>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default PasskeyModel;