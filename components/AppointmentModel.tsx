"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import AppointmentUpdateForm from "@/components/form/AppointmentUpdateForm";
import {Appointment} from "@/types/appwrite.types";
import {AppointmentUpdateFormSchemaType} from "@/lib/validation/formSchema";

type AppointmentModel = {
    appointment: Partial<Appointment>;
    type: "schedule" | "cancel"
}

const AppointmentModel = ({appointment, type}: AppointmentModel) => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild={true}>
                <Button
                    variant={"ghost"}
                    className={cn("capitalize", type === "schedule" && "text-green-500")}
                >
                    {type}
                </Button>
            </DialogTrigger>
            <DialogContent className={"shad-dialog sm:max-w-md"}>
                <DialogHeader className={"mb-4 space-y-3"}>
                    <DialogTitle className={"capitalize"}>{type} Appointment</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Please fill in the following details to {type} appointment
                </DialogDescription>
                <AppointmentUpdateForm
                    defaultValue={appointment as Required<AppointmentUpdateFormSchemaType>}
                    action={type}
                    appointmentId={appointment.$id!}
                />
            </DialogContent>
        </Dialog>
    );
};
export default AppointmentModel;