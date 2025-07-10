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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Add validation states
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Validation functions
  const validateName = (value: string) => {
    if (!value.trim()) {
      return "Name is required";
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return "Name can only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/(?=.*[a-z])/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(value)) {
      return "Password must contain at least one number";
    }
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value)) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  // Password strength checker
  const getPasswordStrength = (value: string) => {
    const checks = {
      length: value.length >= 8,
      lowercase: /(?=.*[a-z])/.test(value),
      uppercase: /(?=.*[A-Z])/.test(value),
      number: /(?=.*\d)/.test(value),
      special: /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value),
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    
    if (passedChecks <= 2) return "weak";
    if (passedChecks <= 4) return "medium";
    return "strong";
  };

  const getPasswordRequirements = (value: string) => {
    return [
      { label: "At least 8 characters", met: value.length >= 8 },
      { label: "One lowercase letter", met: /(?=.*[a-z])/.test(value) },
      { label: "One uppercase letter", met: /(?=.*[A-Z])/.test(value) },
      { label: "One number", met: /(?=.*\d)/.test(value) },
      { label: "One special character", met: /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value) },
    ];
  };

  // Handle input changes with validation
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setErrors(prev => ({
      ...prev,
      name: validateName(value)
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({
      ...prev,
      email: validateEmail(value)
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors(prev => ({
      ...prev,
      password: validatePassword(value)
    }));
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      Object.values(errors).every(error => error === "")
    );
  };

  // Google Sign Up Handler
  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;
    
    setIsGoogleLoading(true);

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/sso_auth",
        redirectUrlComplete: "/auth/google-auth",
      });
    } catch (error: any) {
      console.error("Google sign up error:", error);
      toast.error("Failed to sign up with Google. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

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
        <p className=" text-18-regular  my-4">
          Create an account to start your journey to inner peace
        </p>
        <h1 className="text-4xl font-normal flex gap-2 mb-2">
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

      {/* Google Sign Up Button */}
      {/* <div className="mb-6">
        <Button
          type="button"
          variant="outline"
          className="w-full bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
          onClick={handleGoogleSignUp}
          disabled={isGoogleLoading || isLoading}
        >
          {isGoogleLoading ? (
            <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          Continue with Google
        </Button>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
      </div> */}

      <form onSubmit={handleSubmit} className="space-y-4 my-3 md:my-6">
        <div>
          <Label htmlFor="name" className="text-16-regular">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            disabled={isLoading}
            onChange={handleNameChange}
            className={errors.name ? "border-red-500" : " text-16-regular"}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-16-regular">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            disabled={isLoading}
            onChange={handleEmailChange}
            className={errors.email ? "border-red-500" : " text-16-regular"}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="text-16-regular">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              disabled={isLoading}
              onChange={handlePasswordChange}
              className={errors.password ? "border-red-500" : " text-16-regular"}
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
          
          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Password strength:</span>
                <span className={`text-sm font-medium ${
                  getPasswordStrength(password) === 'weak' ? 'text-red-500' :
                  getPasswordStrength(password) === 'medium' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {getPasswordStrength(password).charAt(0).toUpperCase() + getPasswordStrength(password).slice(1)}
                </span>
              </div>
              
              {/* Password Requirements */}
              <div className="space-y-1">
                {getPasswordRequirements(password).map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      requirement.met ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <span className={`text-xs ${
                      requirement.met ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {requirement.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || !isFormValid()}
        >
          {isLoading ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </div>
  );

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
        <h1 className="text-2xl font-semibold font-heading mt-2">
          Please check your email
        </h1>
        <p className="text-muted-foreground">
          We&apos;ve sent a verification code to {email}
        </p>
      </div>

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