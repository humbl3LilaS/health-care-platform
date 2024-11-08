"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {
    AppointmentFormDefaultValues,
    AppointmentFormSchema,
    AppointmentFormSchemaType
} from "@/lib/validation/formSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import CustomFormField, {FormFieldType} from "@/components/CustomFormField";
import {DOCTORS} from "@/constants";
import {SelectItem} from "@/components/ui/select";
import Image from "next/image";
import SubmitButton from "@/components/SubmitButton";
import {useToast} from "@/hooks/use-toast";
import {createAppointment} from "@/lib/action/appointmentAction";
import {useRouter} from "next/navigation";

type AppointmentFormProps = {
    userId: string;
    patientId: string;
    primaryPhysician?: string
}


const AppointmentForm = ({userId, primaryPhysician, patientId}: AppointmentFormProps) => {

    const form = useForm<AppointmentFormSchemaType>(
        {
            resolver: zodResolver(AppointmentFormSchema),
            mode: "onBlur",
            defaultValues: {
                ...AppointmentFormDefaultValues,
                primaryPhysician: primaryPhysician ?? AppointmentFormDefaultValues.primaryPhysician
            }
        }
    )

    const {toast} = useToast();

    const router = useRouter();

    const onSubmit: SubmitHandler<AppointmentFormSchemaType> = async (value) => {
        const appointment = await createAppointment({userId, patientId, payload: {...value}});
        if (appointment) {
            toast({title: "Appointment Created"});
            router.push(`/patient/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
        } else {
            toast({title: "Appointment Creation Failed", variant: "destructive"});
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
                />

                <div className={"flex flex-col gap-6 xl:flex-row"}>
                    {/*Reason for treatment*/}
                    <CustomFormField
                        name={"reason"}
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        label={"Reason For Appointment"}
                        placeholder={"Enter reason for appointment"}
                    />

                    {/*comment*/}
                    <CustomFormField
                        name={"note"}
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        label={"Comment/ Extra Information"}
                        placeholder={"Extra notes...."}
                    />
                </div>


                <SubmitButton
                    isSubmitting={form.formState.isSubmitting}
                    disabled={form.formState.isSubmitting}
                    className={"mt-4 mb-10"}
                >
                    Submit
                </SubmitButton>
            </form>
        </Form>
    );
};

export default AppointmentForm;