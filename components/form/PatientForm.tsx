"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {PatientFormSchema, PatientFormSchemaType} from "@/lib/validation/formSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import CustomFormField, {FormFieldType} from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";

const PatientForm = () => {
    const form = useForm<PatientFormSchemaType>(
        {
            resolver: zodResolver(PatientFormSchema),
            defaultValues: {
                name: "",
                email: "",
                phone: ""
            },
            mode: "onBlur",
        }
    );

    const onSubmit: SubmitHandler<PatientFormSchemaType> = (value) => {
        console.log(value);
        form.reset();
    }
    console.log("form rendering")

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                {/*name start*/}
                <CustomFormField
                    name={"name"}
                    control={form.control}
                    fieldType={FormFieldType.INPUT} label={"Name"}
                    placeholder={"eg. Pale Edelweiss"}
                    iconSrc={"/assets/icons/user.svg"}
                    iconAlt={"user"}
                />
                {/*name end*/}

                {/*Email*/}
                <CustomFormField
                    name={"email"}
                    control={form.control}
                    fieldType={FormFieldType.INPUT} label={"Email"}
                    placeholder={"eg. superedelweiss@gmail.com"}
                    iconSrc={"/assets/icons/email.svg"}
                    iconAlt={"email"}
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
                />


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

export default PatientForm;