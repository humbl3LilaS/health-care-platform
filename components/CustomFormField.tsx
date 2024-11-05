import {Control, ControllerRenderProps, FieldValues} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export const enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    DATE_INPUT = "dateInput",
    RADIO_INPUT = "radioInput",
    CHECKBOX = 'checkbox',
    SKELETON = 'skeleton',
    SELECT = "select"
}


type CustomFormFieldProps<T extends FormFieldType> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    fieldType: T;
    type?: T extends FormFieldType.INPUT ? string : never;
    option?: T extends FormFieldType.RADIO_INPUT ? string[] : T extends FormFieldType.SELECT
                                                              ? Array<Record<string, string>> : never;
}

const RenderInput = <T extends FormFieldType>({field, props}: {
    field: ControllerRenderProps<FieldValues, string>,
    props: CustomFormFieldProps<T>
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
                        type={props.type ?? "text"}
                        className="shad-input border-0"
                    />
                </FormControl>
            </div>
        case FormFieldType.RADIO_INPUT:
            if (!props.option) {
                throw new Error("Missing Radio Option to render")
            }
            return <FormControl>
                <RadioGroup
                    className={"h-11 flex gap-2 xl:justify-between"}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                >
                    {
                        (
                            props.option as string[]
                        ).map((option) =>
                                  <div key={option} className={"radio-group"}>
                                      <RadioGroupItem value={option} id={option}/>
                                      <Label htmlFor={option} className={"cursor-pointer"}>
                                          {option}
                                      </Label>
                                  </div>
                        )
                    }
                </RadioGroup>
            </FormControl>;
        case FormFieldType.DATE_INPUT:
            return <Popover>
                <FormControl>
                    <PopoverTrigger asChild={true}>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start shad-input text-left font-normal",
                                field.value && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4"/>
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={"bg-dark-400 rounded-lg"}
                    />
                </PopoverContent>
            </Popover>
        case FormFieldType.SELECT:
            if (!props.option) {
                throw new Error("Option missing")
            }
            return <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className={"shad-select-trigger"}>
                    <SelectTrigger className={"shad-input"}>
                        <SelectValue placeholder={props.placeholder}/>
                    </SelectTrigger>
                </FormControl>
                <SelectContent className={"shad-select-content"}>
                    {
                        (
                            props.option as Record<string, string>[]
                        ).map((item) =>
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
                </SelectContent>
            </Select>
    }
}

const CustomFormField = <T extends FormFieldType>(props: CustomFormFieldProps<T>) => {
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