import {Control, ControllerRenderProps, FieldValues} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Image from "next/image";

export const enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = "phoneInput",
    CHECKBOX = 'checkbox',
    DATE_PICKER = "datePicker",
    SELECT = 'select',
    SKELETON = 'skeleton',
}


type CustomFormFieldProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    fieldType: FormFieldType;
}

const RenderInput = ({field, props}: {
    field: ControllerRenderProps<FieldValues, string>,
    props: CustomFormFieldProps
}) => {
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return <div className="px-2 flex rounded-md border border-dark-500 bg-dark-400">
                {props.iconSrc && (
                    <Image
                        src={props.iconSrc}
                        height={24}
                        width={24}
                        alt={props.iconAlt || "icon"}
                        className="ml-2"
                    />
                )}
                <FormControl>
                    <Input
                        placeholder={props.placeholder}
                        {...field}
                        className="shad-input border-0"
                    />
                </FormControl>
            </div>
        case FormFieldType.PHONE_INPUT:
            return <FormControl>

            </FormControl>
    }
}

const CustomFormField = (props: CustomFormFieldProps) => {
    return (
        <FormField
            control={props.control}
            name={props.name}
            render={({field}) =>
                <FormItem className={"mb-4 last:mb-0"}>
                    {props.label && <FormLabel className={"shad-input-label"}>{props.label}</FormLabel>}

                    <RenderInput field={field} props={props}/>

                    <FormMessage className={"shad-error"}/>
                </FormItem>
            }
        />
    );
};

export default CustomFormField;