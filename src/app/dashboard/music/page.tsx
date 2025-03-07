import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const MusicPage = async () => {
  const user = await currentUser();

  const dbUser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!dbUser) {
    return null;
  }

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

  const { age, bloodGroup, height, weight, gender, medicalIssues } = dbUser;

  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full p-2 md:p-4">
        <h1 className="text-2xl font-semibold">CALM MUSIC </h1>
        TODO :

        <p>creating sections (music player related to only focus on mental health ! )</p>
      </div>
    </div>
  );
};

export default MusicPage;
