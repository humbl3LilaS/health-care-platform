import Image from "next/image";
import Link from "next/link";
import {getAppointmentById} from "@/lib/action/appointmentAction";
import {DOCTORS} from "@/constants";
import {notFound} from "next/navigation";
import {formatDate} from "date-fns";

type SuccessPageProps = {
    searchParams: Promise<{ appointmentId: string }>,
    params: Promise<{ userId: string }>

}


const SuccessPage = async ({searchParams, params}: SuccessPageProps) => {
        const {appointmentId} = await searchParams;
        const {userId} = await params;

        const appointment = await getAppointmentById(appointmentId);


        if (!appointment || !userId) return notFound();

        const doctor = DOCTORS.filter(doc => doc.name === appointment.primaryPhysician)[0] ?? []


        return (
            <div className={"h-screen max-h-screen px-[5%] flex"}>
                <div className={"success-img"}>
                    <section>
                        <header>
                            <Link href={"/"}>
                                <Image
                                    src={"/assets/icons/logo-full.svg"}
                                    alt={"Success Image"}
                                    width={180}
                                    height={40}
                                    className={"mx-auto"}
                                />
                            </Link>
                        </header>

                        <div className={"flex flex-col items-center gap-y-4"}>
                            <Image
                                src={"/assets/gifs/success.gif"}
                                alt={"success"}
                                width={280}
                                height={300}
                            />
                            <h2 className={"header mb-6 max-w-[600px] text-center"}>
                                Your <span className={"text-green-500"}>appointment request</span> has been successfully
                                submitted
                            </h2>
                            <p>We will be in touch shortly to confirm</p>
                        </div>
                    </section>

                    <section className={"request-details"}>
                        <p>Request appointment details: </p>
                        <div className={"flex items-center gap-x-4"}>
                            <Image
                                src={doctor.image}
                                alt={doctor.name}
                                width={"24"}
                                height={"24"}
                                className={"size-6"}
                            />
                            <p>Dr.{doctor.name}</p>
                        </div>
                        <div className={"flex items-center gap-x-4"}>
                            <Image
                                src={"/assets/icons/calendar.svg"}
                                alt={"calendar"}
                                width={"24"}
                                height={"24"}
                                className={"size-6"}
                            />
                            <p>{formatDate(appointment.schedule, "MMMM dd, yyyy")}</p>
                        </div>
                    </section>
                    <Link href={`/patient/${userId}/new-appointment`} className={"shad-primary-btn px-4 py-3 rounded-lg"}>
                        New Appointment
                    </Link>
                    <p className={"copyright"}>
                        &copy;{new Date().getFullYear()} CarePulse
                    </p>
                </div>
            </div>
        );
    }
;

export default SuccessPage;