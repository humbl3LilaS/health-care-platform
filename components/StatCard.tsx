import {cn} from "@/lib/utils";
import Image from "next/image";

type StatCardProps = {
    type: "appointments" | "pending" | "cancelled";
    count: number;
    label: string;
    icon: string;
}

const StatCard = ({type, label, icon, count = 0}: StatCardProps) => {
    return (
        <div className={cn(
            "stat-card",
            {
                "bg-appointments": type === "appointments",
                "bg-pending": type === "pending",
                "bg-cancelled": type === "cancelled",
            }
        )}>
            <div className={"flex items-center gap-x-4"}>
                <Image src={icon} alt={label} width={32} height={32} className={"aspect-square w-8"}/>
                <h2 className={"text-32-bold text-white"}>{count}</h2>
            </div>
            <p className={"text-14-regular"}>
                {label}
            </p>
        </div>
    );
};

export default StatCard;