import { MaxWidthWrapper, AnimationContainer } from "@/components";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon, Shield, Lock, Eye, Users, FileText, Mail } from "lucide-react";

const PrivacyPage = () => {
  return (
    <>
      <MaxWidthWrapper className="flex flex-col gap-8 py-20">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Privacy{" "}
            <span className="bg-gradient-to-r from-primary to-amber-500 text-transparent bg-clip-text">
              Policy
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg mb-8">
            Your privacy and data security are our top priorities. Learn how we protect your information and maintain your trust.
          </p>
        </div>

        {/* Privacy Commitment Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center py-12">
          <AnimationContainer>
            <Image
              src="/images/privacy.jpeg"
              width={600}
              height={500}
              alt="Privacy & Security"
              className="rounded-lg"
            />
          </AnimationContainer>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold">Our Privacy Commitment</h2>
            <p className="text-muted-foreground">
              At Mind Luxe AI, we understand that your mental health journey is deeply personal. 
              We are committed to protecting your privacy and ensuring that your sensitive information 
              remains secure and confidential.
            </p>
            <p className="text-muted-foreground">
              Our privacy practices are designed to give you control over your data while providing 
              the personalized mental health support you need. We follow industry best practices and 
              comply with all applicable privacy regulations.
            </p>
          </div>
        </div>

        {/* Privacy Principles Section */}
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border-2 border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Data Protection</h3>
            <p className="text-muted-foreground">
              Your personal and health information is encrypted and protected with enterprise-grade security measures
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border-2 border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Confidentiality</h3>
            <p className="text-muted-foreground">
              Your conversations and mental health data are kept strictly confidential and never shared without consent
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border-2 border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-muted-foreground">
              We are transparent about how we collect, use, and protect your data with clear privacy controls
            </p>
          </div>
        </div>

        {/* Data Collection Section */}
        <div className="bg-primary/5 rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">What Data We Collect</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Personal Information
              </h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Name and contact information</li>
                <li>• Account credentials</li>
                <li>• Profile preferences</li>
                <li>• Usage patterns and interactions</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Health Information
              </h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Mental health assessments</li>
                <li>• Therapy session data</li>
                <li>• Progress tracking information</li>
                <li>• Wellness goals and outcomes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Your Rights Section */}
       

        {/* Security Measures Section */}
      

        {/* Contact Section */}
        <div className="bg-primary/5 rounded-2xl p-8 text-center mt-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Questions About Your Privacy?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our privacy team is here to help. Contact us if you have any questions about your data or privacy rights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <p className="flex item-center justify-center p-2">
                <Mail className="w-5 h-5 mr-2" />
                MindLuxiAi@gmail.com
              </p>
            <Button asChild>
              <Link href="/dashboard">
                Continue to App
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default PrivacyPage;
