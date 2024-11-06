import Image from "next/image";
import RegisterForm from "@/components/form/RegisterForm";
import {getUser} from "@/lib/action/patientAction";
import {notFound} from "next/navigation";

const UserRegisterPage = async ({params}: { params: Promise<{ userId: string }> }) => {
    const {userId} = await params;
    const user = await getUser(userId);

    if(!user) notFound();

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
                            <h1 className={"header"}>Welcome 👋</h1>
                            <p className={"text-dark-700"}>Let us know more about yourself</p>
                        </div>
                    </header>

                    {/*form*/}
                    <RegisterForm user={user}/>

                </div>
            </section>
            <Image
                src={"/assets/images/register-img.png"}
                alt={"logo"}
                width={860}
                height={960}
                className={"max-w-[390px] side-img"}
            />
        </div>
    );
};

export default UserRegisterPage;