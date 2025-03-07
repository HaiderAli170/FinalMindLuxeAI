import React from "react";
import { DashboardNavbar, Sidebar } from "@/components";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const dbUser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    include: {
      symptoms: true,
      medications: true,
      mentalwellness: true,
    },
  });

  if (!dbUser) {
    redirect("/onboarding?step=1");
  }

  const isPro = dbUser?.stripeCustomerId ? true : false;

  return (
    <AdminPanelLayout>
      <main className="mx-auto  w-full min-h-screen relative">
        <DashboardNavbar isPro={isPro} />

        <div className="flex  dark:bg-black100 px-3  bg-white pt-[50px] lg:pt-0   w-full">
          <div className="w-full  max-w-[1110px] 2xl:max-w-[1311px]  mx-auto pt-2  md:pt-6 h-full min-h-screen flex flex-col ">
            {children}
          </div>
        </div>
      </main>
    </AdminPanelLayout>
  );
};

export default DashboardLayout;
