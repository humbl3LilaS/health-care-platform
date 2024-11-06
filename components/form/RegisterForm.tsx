"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {
    RegisterFormDefaultValues,
    RegisterFormSchema,
    RegisterFormSchemaType
} from "@/lib/validation/formSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormLabel,} from "@/components/ui/form";
import CustomFormField, {FormFieldType} from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {DOCTORS, GENDER, IDENTIFICATION_TYPES} from "@/constants";
import {SelectItem} from "@/components/ui/select";
import Image from "next/image";
import FileUploader from "@/components/FileUploader";
import {User} from "@/types";
import {extractValidValue} from "@/lib/utils";
import {registerPatient} from "@/lib/action/patientAction";

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
        const patientInfo = extractValidValue(value) as RegisterFormSchemaType;
        const formData = new FormData();
        if (patientInfo.identificationDocument && patientInfo.identificationDocument.length > 0) {
            const blobFile = new Blob(
                [patientInfo.identificationDocument[0]], {type: patientInfo.identificationDocument[0].type});
            formData.append("blobFile", blobFile)
            formData.append("fileName", patientInfo.identificationDocument[0].name)
        }
        const userId = user.$id;
        console.log("userId in client", userId)
        if (!userId) {
            return toast({title: "no user id"})
        }
        const patient = await registerPatient({userId, payload: {...patientInfo}, formData});
        if (patient) {
            toast({title: "Patient Creation Success"})
                router.push(`/patient/${user.$id}/new-appointment`)
        } else {
            toast({title: "Patient Creation Failed", variant: "destructive"})
        }
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

                {/*Primary Physician*/}
                <CustomFormField
                    control={form.control}
                    name={"primaryPhysician"}
                    fieldType={FormFieldType.SELECT}
                    label={"Primary physician"}
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
                        placeholder={"ABC12345"}
                        fieldType={FormFieldType.INPUT}
                        label={"Insurance Policy Number"}
                    />
                </div>

                <div className={'flex flex-col gap-6 xl:flex-row'}>

                    {/*Allergies*/}
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        name={"allergies"}
                        control={form.control}
                        label={"Allergies (if any)"}
                        placeholder={"Peanuts, Pollen, Penicillin"}
                    />

                    {/*Insurance Policy Number*/}
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        name={"currentMedication"}
                        control={form.control}
                        label={"Current Medication (if any)"}
                        placeholder={"ABC12345"}
                    />

                </div>

                <div className={'flex flex-col gap-6 xl:flex-row'}>

                    {/*Family Medical History*/}
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        name={"familyMedicalHistory"}
                        control={form.control}
                        label={"Family Medical History"}
                        placeholder={"grandmother had lung cancer"}
                    />

                    {/*Past Medical History*/}
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        name={"pastMedicalHistory"}
                        control={form.control}
                        label={"Past Medical History"}
                        placeholder={"Appendectomy, Tonsillectomy"}
                    />

                </div>

                <div className={"mt-3 space-y-6"}>
                    <div className={"mb-8 space-y-1"}>
                        <h2 className={"sub-header"}>
                            Identification and Verification
                        </h2>
                    </div>
                </div>

                {/*Identification Type*/}
                <CustomFormField
                    control={form.control}
                    name={"identificationType"}
                    fieldType={FormFieldType.SELECT}
                    label={"Type of Identification"}
                    placeholder={"Select an identification type"}
                    optionRender={
                        IDENTIFICATION_TYPES.map((item) =>
                                                     <SelectItem value={item} key={item}>
                                                         {item}
                                                     </SelectItem>)
                    }
                />

                {/*Identification number*/}
                <CustomFormField
                    control={form.control}
                    name={"identificationNumber"}
                    fieldType={FormFieldType.INPUT}
                    label={"Identification Number"}
                    placeholder={"123456789"}
                />

                {/*File upload*/}
                <FormField control={form.control}
                           name={"identificationDocument"}
                           render={({field}) =>
                               <FormItem className={"mb-4"}>
                                   <FormLabel>Scanned copy of identification document</FormLabel>
                                   <FormControl>
                                       <FileUploader files={field.value} onChange={field.onChange}/>
                                   </FormControl>
                               </FormItem>}
                />


                <div className={"mt-3 space-y-6"}>
                    <div className={"mb-8 space-y-1"}>
                        <h2 className={"sub-header"}>
                            Consent and Privacy
                        </h2>
                    </div>
                </div>

                <CustomFormField
                    control={form.control}
                    name={"treatmentConsent"}
                    fieldType={FormFieldType.CHECKBOX}
                    label={"I consent to receive treatment for my health condition"}
                />

                <CustomFormField
                    control={form.control}
                    name={"disclosureConsent"}
                    fieldType={FormFieldType.CHECKBOX}
                    label={"I consent to the use and disclosure of heath information for treatment purpose"}
                />

                <CustomFormField
                    control={form.control}
                    name={"privacyConsent"}
                    fieldType={FormFieldType.CHECKBOX}
                    label={"I acknowledge that I have reviewed and agree  to the privacy policy"}
                />


                <SubmitButton
                    isSubmitting={form.formState.isSubmitting}
                    disabled={form.formState.isSubmitting}
                    className={"mt-4 mb-10"}
                >
                    Submit
                </SubmitButton>
            </form>
        </Form>
    )
        ;
};

export default RegisterForm;