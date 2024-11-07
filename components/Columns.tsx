"use client"
import {
    createColumnHelper,
} from "@tanstack/react-table"
import {Appointment} from "@/types/appwrite.types";
import {formatDate} from "date-fns";
import {DataColumn} from "@/types";
import StatusBadge from "@/components/StatusBadge";
import {DOCTORS} from "@/constants";
import Image from "next/image";
import AppointmentModel from "@/components/AppointmentModel";

const columnHelper = createColumnHelper<Appointment>();


export const columns: DataColumn<Appointment> = [
    columnHelper.accessor("patient", {
        header: "Patient",
        cell: props => <div>{props.getValue().name}</div>
    }),
    columnHelper.accessor("schedule", {
        header: "Appointment",
        cell: props => <p className={"min-w-[100px] text-14-regular"}>{formatDate(props.getValue(), "MMMM dd yyyy")}</p>
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: props => <div className={"max-w-[115px]"}><StatusBadge status={props.getValue()}/></div>
    }),
    columnHelper.accessor("primaryPhysician", {
        header: "Doctor",
        cell: props => {
            const doctor = DOCTORS.find(doc => doc.name === props.getValue());
            if (!doctor) {
                return <p className={"text-14-regular"}>{props.getValue()}</p>
            } else {
                return <div className={"flex items-center gap-x-3"}>
                    <Image src={doctor.image} alt={doctor.name} width={32} height={32}/>
                    <p className={"whitespace-nowrap"}>{doctor.name}</p>
                </div>
            }
        }
    }),
    columnHelper.accessor("$id", {
        header: "Action",
        cell: ({row}) => {

            const appointment: Partial<Appointment> = {
                $id: row.original.$id,
                primaryPhysician: row.original.primaryPhysician,
                schedule: row.original.schedule,
                reason: row.original.reason,
                note: row.original.note ?? "",
                cancellationReason: row.original.cancellationReason ?? "",
            }
            return <div className={"flex items-center gap-2"}>
                <AppointmentModel appointment={appointment} type={"schedule"}/>
                <AppointmentModel appointment={appointment} type={"cancel"}/>
            </div>
        }
    })
]

