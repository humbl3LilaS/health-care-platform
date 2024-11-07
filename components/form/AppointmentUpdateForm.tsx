"use client"
import {
    AppointmentFormSchemaType,
    AppointmentUpdateFormSchema,
    AppointmentUpdateFormSchemaType
} from "@/lib/validation/formSchema";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast";
import CustomFormField, {FormFieldType} from "@/components/CustomFormField";
import {DOCTORS} from "@/constants";
import {SelectItem} from "@/components/ui/select";
import Image from "next/image";
import SubmitButton from "@/components/SubmitButton";
import {Form} from "@/components/ui/form";
import {updateAppointment} from "@/lib/action/appointmentAction";
import {useRouter} from "next/navigation";

type AppointmentUpdateFormProps = {
    defaultValue: Required<AppointmentUpdateFormSchemaType>
    action: "schedule" | "cancel"
    appointmentId: string;
}

const AppointmentUpdateForm = ({defaultValue, appointmentId, action}: AppointmentUpdateFormProps) => {
    const form = useForm<AppointmentUpdateFormSchemaType>(
        {
            resolver: zodResolver(AppointmentUpdateFormSchema),
            mode: "onBlur",
            defaultValues: {
                ...defaultValue,
                schedule: new Date(defaultValue.schedule),
                cancellationReason: defaultValue.cancellationReason ?? "",
                note: defaultValue.note ?? "",
            },
        }
    )
    const {toast} = useToast();
    const router = useRouter();

    const onSubmit: SubmitHandler<AppointmentFormSchemaType> = async (value) => {
        const updatedAppointment = await updateAppointment(
            {
                action,
                payload: {...value},
                appointmentId
            }
        )
        if (updatedAppointment) {
            toast({title: "Appointment Updated"});
            router.refresh();
        } else {
            toast({title: "Failed Updating Appointment", variant: "destructive"});
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <CustomFormField
                    control={form.control}
                    name={"primaryPhysician"}
                    fieldType={FormFieldType.SELECT}
                    label={"Doctor"}
                    optionRender={
                        DOCTORS.map((item) =>
                                        <SelectItem value={item?.name} key={item?.name}>
                                            <p className={"flex cursor-pointer items-center gap-2"}>
                                                <Image src={item?.image}
                                                       alt={item?.name}
                                                       width={32}
                                                       height={32}
                                                       className={"rounded-full border border-dark-400"}
                                                />
                                                <span>{item?.name}</span>
                                            </p>
                                        </SelectItem>)
                    }
                />

                {/*Appointment Date*/}
                <CustomFormField
                    name={"schedule"}
                    control={form.control}
                    fieldType={FormFieldType.DATE_INPUT}
                    label={"Expected Appointment Date"}
                    dateFormat={"MMMM dd, yyyy -  h:mm aa"}
                    showTimeSelect={true}
                />

                <div className={"flex flex-col gap-6 xl:flex-row"}>
                    {/*Reason for treatment*/}
                    <CustomFormField
                        name={"reason"}
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        label={"Reason For Appointment"}
                        placeholder={"Enter reason for appointment"}
                        disabled={true}
                    />

                    {/*comment*/}
                    <CustomFormField
                        name={"note"}
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        disabled={true}
                        label={"Extra Information"}
                        placeholder={"Extra notes...."}
                    />
                </div>

                {action === "cancel" && <CustomFormField
                    name={"cancellationReason"}
                    control={form.control}
                    fieldType={FormFieldType.TEXTAREA}
                    label={"Reason For cancellation"}
                    placeholder={"Extra notes...."}
                />}

                <SubmitButton
                    isSubmitting={form.formState.isSubmitting}
                    disabled={form.formState.isSubmitting}
                    className={"mt-4 mb-10"}
                >
                    {action === "schedule" ? <span>Schedule Appointment</span> : <span>Cancel Appointment</span>}
                </SubmitButton>
            </form>
        </Form>
    );
};
export default AppointmentUpdateForm;