"use client";
 
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const SignInPage = () => {
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
        redirectUrl: "/auth/auth-callback",
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        
        // Check if user is admin
        try {
          const response = await fetch('/api/check-admin');
          const data = await response.json();
          if (data.isAdmin) {
            router.push("/dashboard/admin");
          } else {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          router.push("/dashboard");
        }
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      switch (error.errors[0]?.code) {
        case "form_identifier_not_found":
          toast.error("This email is not registered. Please sign up first.");
          break;
        case "form_password_incorrect":
          toast.error("Incorrect password. Please try again.");
          break;
        case "too_many_attempts":
          toast.error("Too many attempts. Please try again later.");
          break;
        default:
          toast.error("An error occurred. Please try again");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex   h-screen max-h-screen">
      <Link
        href="/"
        className={buttonVariants({
          size: "sm",
         
          className: "fixed top-4 left-4 cursor-pointer z-50",
        })}
      >
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
        Home
      </Link>
      <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="sub-container   max-w-[496px]">
          <div className="space-y-6   w-full">
            <div className="flex flex-col items-center w-full justify-center  gap-y-6">
              <div className="space-y-2 w-full">
                <h1 className="text-32-bold flex gap-2 mb-2">
                  Welcome Back !{" "}
                  <Image
                    src="/images/brain-gym.png"
                    height={150}
                    width={150}
                    alt="MindWell logo"
                    className="mb-1x h-10 w-fit"
                  />
                </h1>
                <p className="text-16-regular text-dark-600 mb-6">
                  Sign up to get started with MIND LUXE AI.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full  ">
                <div className="mt-4 space-y-1">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    disabled={isLoading}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative w-full">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      disabled={isLoading}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      disabled={isLoading}
                      className="absolute   flex items-start   top-3.5 right-1 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    type="submit"
                    size="default"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <LoaderIcon className="w-4 h-4 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>

              <div className="flex mt-2">
                <p className="text-sm text-muted-foreground text-center w-full">
                  Dont&apos;t have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-foreground font-medium"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20 flex justify-between text-14-regular">
            <p className="text-dark-600 xl:text-left">© 2025 MIND LUXE AI</p>
          </div>
        </div>
      </section>

      <Image
        src="/images/loginImage.png"
        height={1000}
        width={1000}
        alt="Women Image ! "
        className="side-img max-w-[60%] rounded-xl"
      />
    </div>
  );
};

export default SignInPage;
