// app/auth/auth-callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useUser, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function AuthCallback() {
  const { user, isLoaded } = useUser();
  const { signUp } = useSignUp();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    const processUser = async () => {
      if (!isLoaded) return;
      
      if (!user) {
        router.push("/onboarding");
        console.log("hi")
        return;
      }

      try {
        // Store/update user information including profile image
        const userData = {
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.imageUrl, // This will include Google profile image
          hasImage: user.hasImage,
          createdAt: user.createdAt,
          lastSignInAt: user.lastSignInAt,
        };

        // Call your API to store user data
        const response = await fetch('/api/user/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error('Failed to sync user data');
        }

        const syncResult = await response.json();
        
        // If user was just created (new Google sign up), send verification code
        // if (syncResult.isNewUser) {
        //   await sendVerificationCode();
        //   setShowVerification(true);
        //   setIsProcessing(false);
        //   return;
        // }

        // For existing users, proceed to dashboard
        await redirectToDashboard();

      } catch (error) {
        console.error('Error processing user:', error);
        toast.error("Something went wrong. Please try again.");
        router.push("/auth/signin");
      } finally {
        setIsProcessing(false);
      }
    };

    processUser();
  }, [user, isLoaded, router]);

  const sendVerificationCode = async () => {
    if (!signUp) return;
    
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.success("Verification code sent to your email!");
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast.error("Failed to send verification code. Please try again.");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp || !code) {
      toast.error("Please enter the verification code");
      return;
    }
    
    setIsVerifying(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      
      if (completeSignUp.status === "complete") {
        toast.success("Email verified successfully!");
        await redirectToDashboard();
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error:", JSON.stringify(error, null, 2));
      toast.error("An error occurred. Please try again");
    } finally {
      setIsVerifying(false);
    }
  };

  const redirectToDashboard = async () => {
    try {
      // Check if user is admin
      const adminResponse = await fetch('/api/check-admin');
      const adminData = await adminResponse.json();
      
      if (adminData.isAdmin) {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      router.push("/dashboard");
    }
  };

  if (!isLoaded || isProcessing) {
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
            <h2 className="text-xl font-semibold">Setting up your account...</h2>
            <p className="text-muted-foreground">Welcome to MIND LUXE AI! We're preparing your dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  if (showVerification) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="max-w-md w-full space-y-6 p-6">
          <div className="text-center space-y-4">
            <Image
              src="/images/brain-hi.png"
              alt="Mind Luxe logo"
              width={60}
              height={60}
              className="mx-auto"
            />
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Verify your email</h2>
              <p className="text-muted-foreground">
                We've sent a verification code to {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Label className="text-16-regular mb-4" htmlFor="code">
                Verification Code
              </Label>
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => setCode(value)}
                disabled={isVerifying}
                className="justify-center"
              >
                <InputOTPGroup className="shad-otp my-3 gap-1 md:gap-2.5">
                  <InputOTPSlot className="shad-otp-slot" index={0} />
                  <InputOTPSlot className="shad-otp-slot" index={1} />
                  <InputOTPSlot className="shad-otp-slot" index={2} />
                  <InputOTPSlot className="shad-otp-slot" index={3} />
                  <InputOTPSlot className="shad-otp-slot" index={4} />
                  <InputOTPSlot className="shad-otp-slot" index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <Button 
              type="submit" 
              className="w-full font-bold" 
              disabled={isVerifying}
            >
              {isVerifying ? (
                <LoaderIcon className="h-4 w-4 animate-spin" />
              ) : (
                "Verify Code"
              )}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return null;
}