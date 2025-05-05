"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Icons } from "@/components";

const SignUpPage = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1] || "",
      });
      console.log("success");
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setIsVerified(true);
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      handleSignUpError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    console.log(code);
    e.preventDefault();
    if (!isLoaded || !code) {
      toast.error("Please enter the verification code");
      return;
    }
    setIsVerifying(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      console.log(completeSignUp);
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/auth/auth-callback");
      } else if (completeSignUp.status === "missing_requirements") {
        // Assuming missing fields are in completeSignUp.requiredFields
        const missingFields = completeSignUp.requiredFields;
        if (missingFields.length > 0) {
          toast.error(
            `The following fields are missing: ${missingFields.join(", ")}`
          );
        } else {
          toast.error("Please fill in all the required fields.");
        }
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

  const handleSignUpError = (error: any) => {
    const errorCode = error.errors[0]?.code;
    const errorMessages: { [key: string]: string } = {
      form_identifier_exists:
        "This email is already registered. Please sign in.",
      form_password_pwned:
        "The password is too common. Please choose a stronger password.",
      form_param_format_invalid:
        "Invalid email address. Please enter a valid email address.",
      form_password_length_too_short:
        "Password is too short. Please choose a longer password.",
    };
    toast.error(
      errorMessages[errorCode] || "An error occurred. Please try again"
    );
  };

  const renderForm = () => (
    <div>
      <div className="space-y-2">
        <p className=" text-18-bold  my-4">
          Create an account to start your journey to inner peace
        </p>
        <h1 className="text-32-bold flex gap-2 mb-2">
          Hi there{" "}
          <Image
            src="/images/brain-hi.png"
            height={100}
            width={100}
            alt="Mind Luxe logo"
            className="mb-1x h-10 w-fit"
          />
        </h1>
        <p className="text-16-regular text-dark-600 mb-6">
          Sign up to get started with MIND LUXE AI..
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 my-3 md:my-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            disabled={isLoading}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
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
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
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
              className="absolute flex items-start top-3.5 right-1 hover:bg-transparent"
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </div>
  );

  //   return isVerified ? (
  //     <div className="flex flex-col    items-center justify-center h-screen gap-y-6">
  //       <div className="flex flex-col border-slate-700 rounded-xl  border-2 text-center gap-1">
  //         <Link href="/">
  //           <Icons.logo className="w-12 h-12 mx-auto" />
  //         </Link>
  //         <h1 className="text-2xl font-bold font-heading mt-2">
  //           Please check your email
  //         </h1>
  //         <p className="text-muted-foreground">
  //           We&apos;ve sent a verification code to {email}
  //         </p>
  //       </div>

  //       <form onSubmit={handleVerify} className="w-full max-w-xs">
  //         <div className="space-y-2 flex flex-col items-center justify-center">
  //           <Label htmlFor="name">Verfication Code</Label>
  //           <InputOTP
  //             maxLength={6}
  //             value={code}
  //             disabled={isVerifying}
  //             onChange={(e) => setCode(e)}
  //             className="pt-2"
  //           >
  //             <InputOTPGroup>
  //               <InputOTPSlot index={0} />
  //               <InputOTPSlot index={1} />
  //               <InputOTPSlot index={2} />
  //               <InputOTPSlot index={3} />
  //               <InputOTPSlot index={4} />
  //               <InputOTPSlot index={5} />
  //             </InputOTPGroup>
  //           </InputOTP>
  //         </div>
  //         <div className="mt-6">
  //           <Button
  //             size="default"
  //             type="submit"
  //             disabled={isVerifying}
  //             className="w-full"
  //           >
  //             {isVerifying ? (
  //               <LoaderIcon className="w-4 h-4 animate-spin" />
  //             ) : (
  //               "Verify Code"
  //             )}
  //           </Button>
  //         </div>
  //       </form>
  //     </div>
  //   ) : (
  //     <div className="flex flex-col items-center justify-center h-screen gap-y-6">
  //       <div className="flex flex-col  justify-center text-center gap-1">
  //         <div className="text-[1rem] font-bold md:text-[2.9rem] ">
  //           Unlock Inner Peace Step by Step !{" "}
  //         </div>
  //         <Link href="/">
  //           <Icons.logo className="w-12 h-12 mx-auto" />
  //         </Link>
  //         <h1 className="text-2xl font-bold font-heading mt-2">Sign Up</h1>
  //         <p className="text-muted-foreground">
  //           Create an account to start using MindWell
  //         </p>
  //       </div>

  //       <form onSubmit={handleSubmit} className="w-full max-w-xs">
  //         <div className="space-y-1">
  //           <Label htmlFor="name">Full Name</Label>
  //           <Input
  //             id="name"
  //             type="text"
  //             placeholder="Enter your name"
  //             value={name}
  //             disabled={isLoading}
  //             onChange={(e) => setName(e.target.value)}
  //           />
  //         </div>
  //         <div className="mt-4 space-y-1">
  //           <Label htmlFor="email">Email address</Label>
  //           <Input
  //             id="email"
  //             type="email"
  //             placeholder="Enter your email address"
  //             value={email}
  //             disabled={isLoading}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //         </div>
  //         <div className="mt-4 space-y-1">
  //           <Label htmlFor="password">Password</Label>
  //           <div className="relative w-full">
  //             <Input
  //               id="password"
  //               type={showPassword ? "text" : "password"}
  //               placeholder="Enter your password"
  //               value={password}
  //               disabled={isLoading}
  //               onChange={(e) => setPassword(e.target.value)}
  //             />
  //             <Button
  //               type="button"
  //               size="icon"
  //               variant="ghost"
  //               disabled={isLoading}
  //               className="absolute top-1 right-1 hover:translate-y-0"
  //               onClick={() => setShowPassword(!showPassword)}
  //             >
  //               {showPassword ? (
  //                 <EyeOffIcon className="w-4 h-4" />
  //               ) : (
  //                 <EyeIcon className="w-4 h-4" />
  //               )}
  //             </Button>
  //           </div>
  //         </div>
  //         <div className="mt-6">
  //           <Button
  //             type="submit"
  //             size="default"
  //             disabled={isLoading}
  //             className="w-full"
  //           >
  //             {isLoading ? (
  //               <LoaderIcon className="w-4 h-4 animate-spin" />
  //             ) : (
  //               "Continue"
  //             )}
  //           </Button>
  //         </div>
  //       </form>

  //       <div className="flex mt-2">
  //         <p className="text-sm text-muted-foreground text-center w-full">
  //           Been here before?{" "}
  //           <Link href="/auth/signin" className="text-foreground font-medium">
  //             Sign In
  //           </Link>
  //         </p>
  //       </div>
  //     </div>
  //   );
  // };

  const renderVerification = () => (
    <form
      onSubmit={handleVerify}
      className=" border-slate-700 rounded-xl  border-2  p-10 space-y-4"
    >
      <div className="flex flex-col justify-center items-center  text-center gap-1">
        <Image
          src="/images/brain-hi.png"
          alt="Dashboard"
          width={45}
          height={45}
          quality={100}
          priority
        />
        <h1 className="text-2xl font-bold font-heading mt-2">
          Please check your email
        </h1>
        <p className="text-muted-foreground">
          We&apos;ve sent a verification code to {email}
        </p>
      </div>

      <div>
        <Label className="text-16-semibold mb-4" htmlFor="code">
          Verification Code
        </Label>
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(value) => setCode(value)}
          disabled={isVerifying}
          className="justify-center"
        >
          <InputOTPGroup className="shad-otp my-3 gap-1 md:gap-2.5 ">
            <InputOTPSlot className=" shad-otp-slot" index={0} />
            <InputOTPSlot className="shad-otp-slot" index={1} />
            <InputOTPSlot className="shad-otp-slot" index={2} />
            <InputOTPSlot className="shad-otp-slot" index={3} />
            <InputOTPSlot className="shad-otp-slot" index={4} />
            <InputOTPSlot className="shad-otp-slot" index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button type="submit" className="w-full font-bold" disabled={isVerifying}>
        {isVerifying ? (
          <LoaderIcon className="h-4 w-4 animate-spin" />
        ) : (
          "Verify Code"
        )}
      </Button>
    </form>
  );

  return (
    <div className="flex  h-screen max-h-screen">
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
          <div className="space-y-6">
            {isVerified ? renderVerification() : renderForm()}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Link
                href="/auth/signin"
                className="font-medium text-primary hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="mt-20 flex justify-between text-14-regular">
            <p className="text-dark-600 xl:text-left">© 2024 MIND LUXE AI.</p>
          </div>
        </div>
      </section>

      <Image
        src="/images/loginImage.png"
        height={900}
        width={900}
        alt="Brain gym illustration"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default SignUpPage;
