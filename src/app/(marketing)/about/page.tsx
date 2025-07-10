import { MaxWidthWrapper, AnimationContainer } from "@/components";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <MaxWidthWrapper className="flex flex-col gap-8 py-20">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-amber-500 text-transparent bg-clip-text">
              Mind Luxe AI
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg mb-8">
            Empowering mental wellness through innovative AI technology and compassionate care
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center py-12">
          <AnimationContainer>
            <Image
              src="/images/aboutus.png"
              width={500}
              height={500}
              alt="Our Mission"
              className="rounded-lg"
            />
          </AnimationContainer>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              At Mind Luxe AI, we're committed to making mental health support accessible to everyone. 
              Our AI-powered platform combines cutting-edge technology with empathetic care to provide 
              personalized mental wellness solutions.
            </p>
            <p className="text-muted-foreground">
              We believe that everyone deserves access to quality mental health support, and we're here 
              to make that a reality through innovative technology and compassionate care.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border-2 border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              Leveraging cutting-edge AI technology to provide the best mental health support
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border-2 border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Empathy</h3>
            <p className="text-muted-foreground">
              Providing compassionate and understanding support for every user
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border-2 border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-muted-foreground">
              Making mental health support available to everyone, anywhere
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary/5 rounded-2xl p-8 text-center mt-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Start Your Mental Wellness Journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the benefits of AI-powered mental health support
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard">
              Get Started
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default AboutPage; 