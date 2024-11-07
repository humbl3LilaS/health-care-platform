import Image from "next/image";
import PatientForm from "@/components/form/PatientForm";
import Link from "next/link";
import PasskeyModel from "@/components/PasskeyModel";


export default async function Home({searchParams}: { searchParams: Promise<{ isAdmin: string }> }) {
    const isAdmin = (
        await searchParams
    ).isAdmin === "true";
    return (
        <div className={"h-screen max-h-screen flex"}>
            {isAdmin && <PasskeyModel open={isAdmin}/>}
            <section className={"container my-auto remove-scrollbar"}>
                <div className={"max-w-[496px] sub-container"}>

                    <header>
                        {/*logo*/}
                        <Image src={"/assets/icons/logo-full.svg"} alt={"logo"} width={180} height={40}
                               className={"mb-12 h-10 w-fit"}
                        />
                        <div className={"mb-12 space-y-4"}>
                            <h1 className={"header"}>Hi there 👋</h1>
                            <p className={"text-dark-700"}>Schedule your first appointment.</p>
                        </div>
                    </header>

                    {/*form*/}
                    <PatientForm/>


                    <div className={"mt-20 flex justify-between text-14-regular"}>
                        <p className={"justify-items-end text-dark-600 xl:text-left"}>&copy; {new Date().getFullYear()} CarePulse</p>
                        <Link href={"/?isAdmin=true"} className={"text-green-500"}>Admin</Link>
                    </div>
                </div>
            </section>
            <Image
                src={"/assets/images/onboarding-img.png"}
                alt={"logo"}
                width={860}
                height={960}
                className={"max-w-[50%] side-img"}
            />
        </div>
    );
}
