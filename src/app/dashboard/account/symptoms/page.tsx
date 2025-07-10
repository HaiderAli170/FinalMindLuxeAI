import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const Symptoms = async () => {

    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user?.id,
        },
    });

    const symptoms = await db.symptom.findMany({
        where: {
            userId: user?.id,
        },
    });

    return (
        <div className="flex flex-col items-start justify-start w-full max-w-3xl py-8 mx-auto">
            <div className="flex flex-col items-start gap-2">
                <h2 className="text-xl font-semibold">
                    Track your symptoms
                </h2>
                <p className="text-sm text-muted-foreground">
                    Check in on your symptoms
                </p>
            </div>
            <div className="flex flex-col items-start w-full py-8 gap-y-8">
                <div className="space-y-2">
                    <span className="font-medium text-foreground">
                        Name of symptoms
                    </span>
                    <div className="flex items-center  gap-8">
                        {symptoms?.map((symptom) => (
                            <p key={symptom.id} className="text-sm py-2 px-4 border border-slate-200  rounded-sm md:rounded-md capitalize">
                                {symptom.name.toLowerCase()}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="font-medium text-foreground">
                        How often do you experience these symptoms?
                    </span>
                    <div className="flex items-center gap-8">
                        {symptoms?.map((symptom) => (
                            <p key={symptom.id} className="text-sm py-2 px-4 border border-slate-200 font-semibold  rounded-sm md:rounded-md capitalize">
                                {symptom.frequency.toLowerCase()}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="font-medium text-foreground">
                        How intense are these symptoms? (1-10)
                    </span>
                    <div className="flex items-center gap-8">
                        {symptoms?.map((symptom) => (
                            <p key={symptom.id} className="text-sm   py-2 px-4 border border-slate-200  font-semibold rounded-sm md:rounded-md capitalize">
                               {symptom.name} : {symptom.intensity}/10 
                            </p>
                        ))}
                    </div>
                </div>
                <div>
                    <Link href="/dashboard/account/settings" className={buttonVariants({ size: "sm", variant: "secondaryOutline"})}>
                        Update symptom
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Symptoms
