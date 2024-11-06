import {getPatient} from "@/lib/action/patientAction";
import {notFound} from "next/navigation";
import Image from "next/image";
import AppointmentForm from "@/components/form/AppointmentForm";

const AppointmentPage = async ({params}: { params: Promise<{ userId: string }> }) => {
    const {userId} = await params;

    const patient = await getPatient(userId);

    if (!patient) notFound();
    return (
        <div className={"h-screen max-h-screen flex"}>
            <section className={"container  remove-scrollbar"}>
                <div className={"max-w-[496px] sub-container pb-10"}>

                    <header>
                        {/*logo*/}
                        <Image src={"/assets/icons/logo-full.svg"} alt={"logo"} width={180} height={40}
                               className={"mb-12 h-10 w-fit"}
                        />
                        <div className={"mb-12 space-y-4"}>
                            <h1 className={"header"}>Create New Appointment 👋</h1>
                            <p className={"text-dark-700"}>Request a new appointment in 10 seconds</p>
                        </div>
                    </header>

                    {/*form*/}
                    <AppointmentForm userId={userId} patientId={patient.$id} primaryPhysician={patient.primaryPhysician} />

                </div>
            </section>
            <Image
                src={"/assets/images/appointment-img.png"}
                alt={"appointment"}
                width={860}
                height={960}
                className={"max-w-[390px] side-img bg-bottom"}
            />
        </div>
    );
};

export default AppointmentPage;