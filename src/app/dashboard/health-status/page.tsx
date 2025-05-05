import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { 
    HeartPulse, 
    Brain, 
    Smile, 
    Activity, 
    Clock, 
    AlertCircle, 
    Moon, 
    Zap, 
    Thermometer, 
    Calendar 
} from "lucide-react";

const HealthStatusPage = async () => {
    const user = await currentUser();

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

    const mentalWellness = await db.mentalWellness.findMany({
        where: {
            userId: user?.id,
        },
    });

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted/20">
            <div className="px-4 py-8">
                <div className="flex items-center gap-3 mb-8">
                    <HeartPulse className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-bold text-primary">
                        Health Status Overview
                    </h1>
                </div>

                {/* Top Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Symptoms Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Activity className="w-6 h-6 text-rose-500" />
                            <h2 className="text-2xl font-semibold text-foreground">
                                Your Symptoms
                            </h2>
                        </div>
                        {symptoms.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {symptoms.map((symptom) => (
                                    <Card key={symptom.id} className="h-full hover:shadow-lg transition-shadow border-rose-100">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center gap-2">
                                                <Thermometer className="w-5 h-5 text-rose-500" />
                                                <CardTitle className="text-xl font-semibold capitalize">
                                                    {symptom.name.toLowerCase().replace("_", " ")}
                                                </CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                <div className="flex justify-between items-center w-full">
                                                    <span className="text-muted-foreground">Frequency:</span>
                                                    <span className="font-medium capitalize">{symptom.frequency.toLowerCase()}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-muted-foreground" />
                                                <div className="flex justify-between items-center w-full">
                                                    <span className="text-muted-foreground">Intensity:</span>
                                                    <span className="font-medium">{symptom.intensity}/10</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="text-sm text-muted-foreground pt-2">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Reported: {symptom.loggedAt?.toLocaleString()}
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="p-6 text-center border-rose-100">
                                <p className="text-muted-foreground">No symptoms reported yet.</p>
                            </Card>
                        )}
                    </section>

                    {/* Mental Health Challenges Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Brain className="w-6 h-6 text-indigo-500" />
                            <h2 className="text-2xl font-semibold text-foreground">
                                Mental Health Challenges
                            </h2>
                        </div>
                        {medications.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {medications.map((medication) => (
                                    <Card key={medication.id} className="h-full hover:shadow-lg transition-shadow border-indigo-100">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5 text-indigo-500" />
                                                <CardTitle className="text-xl font-semibold capitalize">
                                                    {medication.name.toLowerCase()}
                                                </CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                <div className="flex justify-between items-center w-full">
                                                    <span className="text-muted-foreground">Frequency:</span>
                                                    <span className="font-medium capitalize">{medication.frequency.toLowerCase()}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Brain className="w-4 h-4 text-muted-foreground" />
                                                <div className="flex justify-between items-center w-full">
                                                    <span className="text-muted-foreground">Coping Mechanisms:</span>
                                                    <span className="font-medium">{medication.purpose}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <HeartPulse className="w-4 h-4 text-muted-foreground" />
                                                <div className="flex justify-between items-center w-full">
                                                    <span className="text-muted-foreground">Self-care Level:</span>
                                                    <span className="font-medium capitalize">{medication.adherence.toLowerCase()}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        {medication.startDate && (
                                            <CardFooter className="text-sm text-muted-foreground pt-2">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                Started: {medication.startDate?.toLocaleString()}
                                            </CardFooter>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="p-6 text-center border-indigo-100">
                                <p className="text-muted-foreground">No mental health challenges reported yet.</p>
                            </Card>
                        )}
                    </section>
                </div>

                {/* Mental Wellness Section - Centered Below */}
                <section className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-6 justify-center">
                        <Smile className="w-6 h-6 text-emerald-500" />
                        <h2 className="text-2xl font-semibold text-foreground">
                            Mental Wellness
                        </h2>
                    </div>
                    {mentalWellness.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {mentalWellness.map((wellness) => (
                                <Card key={wellness.id} className="h-full hover:shadow-lg transition-shadow border-emerald-100">
                                    <CardContent className="pt-6 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Smile className="w-4 h-4 text-muted-foreground" />
                                            <div className="flex justify-between items-center w-full">
                                                <span className="text-muted-foreground">Mood:</span>
                                                <span className="font-medium capitalize">{wellness.mood.toLowerCase()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Moon className="w-4 h-4 text-muted-foreground" />
                                            <div className="flex justify-between items-center w-full">
                                                <span className="text-muted-foreground">Sleep Quality:</span>
                                                <span className="font-medium capitalize">{wellness.sleep.toLowerCase()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-muted-foreground" />
                                            <div className="flex justify-between items-center w-full">
                                                <span className="text-muted-foreground">Stress Level:</span>
                                                <span className="font-medium capitalize">{wellness.stress.toLowerCase()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <HeartPulse className="w-4 h-4 text-muted-foreground" />
                                            <div className="flex justify-between items-center w-full">
                                                <span className="text-muted-foreground">Happiness:</span>
                                                <span className="font-medium">{wellness.happiness}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    {wellness.anxiety && (
                                        <CardFooter className="text-sm text-muted-foreground pt-2">
                                            <AlertCircle className="w-4 h-4 mr-2" />
                                            {wellness.anxiety}
                                        </CardFooter>
                                    )}
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="p-6 text-center border-emerald-100">
                            <p className="text-muted-foreground">No mental wellness data reported yet.</p>
                        </Card>
                    )}
                </section>
            </div>
        </div>
    );
};

export default HealthStatusPage;
