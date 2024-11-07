import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/StatCard";

const AdminDashboardPage = () => {
    return (
        <div className={"max-w-7xl mx-auto flex flex-col space-y-14 "}>
            <header className={"admin-header"}>
                <Link href={"/"} className={"cursor-pointer"}>
                    <Image src={"/assets/icons/logo-full.svg"} alt={"logo"} width={180} height={40}
                           className={"h-10 w-fit"}
                    />
                </Link>
                <p className={"text-16-semibold"}>Admin Dashboard</p>
            </header>
            <div className={"admin-main"}>
                <section className={"w-full space-y-4"}>
                    <h1 className={"header"}> Welcome 👋 </h1>
                    <p className={"text-dark-700"}>
                        Start the day with managing new appointments
                    </p>
                </section>
                <section className={"admin-stat"}>
                    <StatCard
                        type={"appointments"}
                        count={10}
                        label={"Scheduled appointments"}
                        icon={"/assets/icons/appointments.svg"}
                    />

                    <StatCard
                        type={"pending"}
                        count={10}
                        label={"Pending appointments"}
                        icon={"/assets/icons/pending.svg"}
                    />

                    <StatCard
                        type={"cancelled"}
                        count={10}
                        label={"Cancelled appointments"}
                        icon={"/assets/icons/cancelled.svg"}
                    />
                </section>
            </div>
        </div>
    );
};

export default AdminDashboardPage;