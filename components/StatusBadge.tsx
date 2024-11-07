import {Status} from "@/types";
import {cn} from "@/lib/utils";
import {STATUS_ICON} from "@/constants";
import Image from "next/image"

type StatusBadgeProps = {
    status: Status
}

const StatusBadge = ({status}: StatusBadgeProps) => {
    return (
        <div className={cn("status-badge", {
            "bg-green-600": status === "scheduled",
            "bg-blue-600": status === "pending",
            "bg-red-600": status === "cancelled",
        })}>
            <Image
                src={STATUS_ICON[status]}
                alt={status}
                width={12}
                height={12}
            />
            <span className={cn("text-12-semibold capitalize", {
                "text-green-500": status === "scheduled",
                "text-blue-500": status === "pending",
                "text-red-500": status === "cancelled",
            })}>
                {status}
            </span>
        </div>
    );
};
export default StatusBadge;