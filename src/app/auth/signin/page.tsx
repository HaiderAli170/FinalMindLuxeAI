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
import { cn } from "@/lib/utils";

const SignInPage = () => {
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  
  // Add validation states
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Validation functions
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
    return "";
  };

  // Handle input changes with validation
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
      email.trim() !== "" &&
      password.trim() !== "" &&
      Object.values(errors).every(error => error === "")
    );
  };

  // Google Sign In Handler
  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;
    
    setIsGoogleLoading(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/sso_auth",
        redirectUrlComplete: "/auth/google-auth",
      });
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Validate all fields before submission
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) {
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
                <h1 className="text-2xl font-bold flex gap-2 mb-2">
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
                  Sign in to get started with MIND LUXE AI.
                </p>
              </div>

              {/* Google Sign In Button */}
              {/* <div className="w-full mb-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
                  onClick={handleGoogleSignIn}
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

              <form onSubmit={handleSubmit} className="w-full  ">
                <div className="mt-4 space-y-1">
                  <Label htmlFor="email" className="text-16-regular">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    className={cn("text-16-regular", errors.email && "border-red-500")}
                    disabled={isLoading}
                    onChange={handleEmailChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="mt-4 space-y-1">
                  <Label htmlFor="password" className="text-16-regular">Password</Label>
                  <div className="relative w-full">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      className={cn("text-16-regular", errors.password && "border-red-500")}
                      disabled={isLoading}
                      onChange={handlePasswordChange}
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
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                <div className="mt-6">
                  <Button
                    type="submit"
                    size="default"
                    disabled={isLoading || !isFormValid()}
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
                  Don&apos;t have an account?{" "}
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