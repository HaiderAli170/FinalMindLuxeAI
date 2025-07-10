// app/auth/sso-callback/page.tsx
"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback();
        // After successful authentication, redirect to auth-callback
        router.push("/auth/google-auth");
      } catch (error) {
        console.error("SSO callback error:", error);
        router.push("/auth/signin?error=sso_failed");
      }
    };

    handleCallback();
  }, [handleRedirectCallback, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Image
          src="/images/brain-hi.png"
          alt="Mind Luxe logo"
          width={60}
          height={60}
          className="mx-auto"
        />
        <div className="space-y-2">
          <LoaderIcon className="h-8 w-8 animate-spin mx-auto" />
          <h2 className="text-xl font-semibold">Completing sign in...</h2>
          <p className="text-muted-foreground">Please wait while we finish setting up your account.</p>
        </div>
      </div>
    </div>
  );
}