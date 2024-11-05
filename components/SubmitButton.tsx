import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Image from "next/image";

type SubmitButtonProps = {
    className?: string;
    children: React.ReactNode;
    disabled: boolean;
    isSubmitting: boolean;
}

const SubmitButton = ({className, children, disabled, isSubmitting}: SubmitButtonProps) => {
    return (
        <Button type={"submit"} disabled={disabled} className={cn("shad-primary-btn w-full", className)}>
            {
                isSubmitting ? (
                    <span className={"flex items-center gap-x-4"}>
                        <Image src={"/assets/icons/loader.svg"} alt={"loader"} width={24} height={24}/>
                        <span>Submitting ....</span>
                    </span>
                ) : children
            }
        </Button>
    );
};
export default SubmitButton;