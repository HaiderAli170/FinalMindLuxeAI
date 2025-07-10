import { HealthTips } from "@/components";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { Lightbulb, HeartPulse } from "lucide-react";

const HealthTipsPage = async () => {
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

    const medications = await db.medication.findMany({
        where: {
            userId: user?.id,
        },
    });

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted/20">
            <div className=" mx-auto px-4 py-8 max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-full bg-primary/10">
                        <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
<<<<<<< HEAD
                    <h1 className="text-2xl font-semibold text-primary">
=======
                    <h1 className="text-3xl font-bold text-primary">
>>>>>>> 852510b1f934348e3d82706f00af2b31dd2f6e7f
                        Health Tips
                    </h1>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-sm border border-primary/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-full bg-emerald-100">
                            <HeartPulse className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-foreground">
                            Personalized Health Tips
                        </h2>
                    </div>
                    <div className="space-y-6">
                        <HealthTips
                            symptoms={symptoms}
                            medications={medications}
                            user={dbUser!}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthTipsPage;
