import { Header } from "@/components";
import React from "react";

interface Props {
    children: React.ReactNode
}

const OnboardingLayout = async ({ children }: Props) => {


    return (
        <main className="relative w-full bg-background h-full">
            <Header />
            <div className="h-full w-full">
                {children}
            </div>
        </main>
    );
};

export default OnboardingLayout
