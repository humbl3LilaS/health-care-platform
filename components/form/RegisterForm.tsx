"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterFormDefaultValues, RegisterFormSchema, RegisterFormSchemaType} from "@/lib/validation/formSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {Form,} from "@/components/ui/form";
import CustomFormField, {FormFieldType} from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {DOCTORS, GENDER} from "@/constants";

type RegisterFormProps = {
    user: User
}

const RegisterForm = ({user}: RegisterFormProps) => {

    const form = useForm<RegisterFormSchemaType>(
        {
            resolver: zodResolver(RegisterFormSchema),
            defaultValues: {...RegisterFormDefaultValues},
            mode: "onBlur",
        }
    );

    const {toast} = useToast();
    const router = useRouter();

    const onSubmit: SubmitHandler<RegisterFormSchemaType> = async (value) => {
        console.log(value);
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <div className={"space-y-6"}>
                    <div className={"mb-8 space-y-1"}>
                        <h2 className={"sub-header"}>
                            Personal Information
                        </h2>
                    </div>
                </div>

                {/*name start*/}
                <CustomFormField
                    name={"name"}
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    label={"Full Name"}
                    placeholder={"eg. Pale Edelweiss"}
                    iconSrc={"/assets/icons/user.svg"}
                    iconAlt={"user"}
                    type={"text"}
                />
                {/*name end*/}

                <div className={'flex flex-col gap-6 xl:flex-row'}>
                    {/*Email*/}
                    <CustomFormField
                        name={"email"}
                        control={form.control}
                        fieldType={FormFieldType.INPUT} label={"Email"}
                        placeholder={"eg. superedelweiss@gmail.com"}
                        iconSrc={"/assets/icons/email.svg"}
                        iconAlt={"email"}
                        type={"email"}
                    />

                    {/*Phone*/}
                    <CustomFormField
                        name={"phone"}
                        control={form.control}
                        placeholder={"(09) 123-456-789"}
                        fieldType={FormFieldType.INPUT}
                        label={"Phone Number"}
                        iconSrc={"/assets/icons/phone.svg"}
                        iconAlt={"phone"}
                        type={"tel"}
                    />
                </div>

                <div className={'flex flex-col gap-6 xl:flex-row'}>

                    {/*Date input*/}
                    <CustomFormField
                        name={"dateOfBirth"}
                        control={form.control}
                        fieldType={FormFieldType.DATE_INPUT}
                        label={"Birthday"}
                    />

                    {/*Gender Option*/}
                    <CustomFormField
                        name={"gender"}
                        control={form.control}
                        label={"Gender"}
                        fieldType={FormFieldType.RADIO_INPUT}
                        option={GENDER}
                    />
                </div>

                <div className={'flex flex-col gap-6 xl:flex-row'}>

                    {/*Address*/}
                    <CustomFormField
                        name={"address"}
                        control={form.control}
                        fieldType={FormFieldType.INPUT} label={"Address"}
                        placeholder={"eg. 123th Super"}
                        type={"text"}
                    />

                    {/*Occupation*/}
                    <CustomFormField
                        name={"occupation"}
                        control={form.control}
                        placeholder={"Software developer"}
                        fieldType={FormFieldType.INPUT}
                        label={"Occupation"}
                    />
                </div>

                <div className={'flex flex-col gap-6 xl:flex-row'}>

                    {/*EmergencyContactName*/}
                    <CustomFormField
                        name={"emergencyContactName"}
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        label={"Emergency Contact Name"}
                        placeholder={"eg. SuperEdelweiss"}
                    />

                    {/*EmergencyContactNumber*/}
                    <CustomFormField
                        name={"emergencyContactNumber"}
                        control={form.control}
                        placeholder={"Software developer"}
                        fieldType={FormFieldType.INPUT}
                        label={"Emergency Contact Number"}
                        type={"tel"}
                    />
                </div>


                <div className={"mt-3 space-y-8"}>
                    <div className={"mb-8 space-y-1"}>
                        <h2 className={"sub-header"}>
                            Medical Information
                        </h2>
                    </div>
                </div>

                <CustomFormField
                    control={form.control}
                    name={"primaryPhysician"}
                    fieldType={FormFieldType.SELECT}
                    label={"Primary physician"}
                    option={DOCTORS}
                />

                <div className={'flex flex-col gap-6 xl:flex-row'}>

                    {/*Insurance Provider*/}
                    <CustomFormField
                        name={"insuranceProvider"}
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        label={"Insurance Provider"}
                        placeholder={"eg. Super Safe"}
                    />

                    {/*Insurance Policy Number*/}
                    <CustomFormField
                        name={"insurancePolicyNumber"}
                        control={form.control}
                        placeholder={"Software developer"}
                        fieldType={FormFieldType.INPUT}
                        label={"Insurance Policy Number"}
                        type={"tel"}
                    />
                </div>


                <SubmitButton
                    isSubmitting={form.formState.isSubmitting}
                    disabled={form.formState.isSubmitting}
                    className={"mt-4"}
                >
                    Submit
                </SubmitButton>
            </form>
        </Form>
    );
};

export default RegisterForm;