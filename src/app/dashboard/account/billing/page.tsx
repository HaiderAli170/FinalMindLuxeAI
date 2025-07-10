"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    price: 2999,
    features: [
      "Basic health tracking",
      "Medication reminders",
      "Basic mental wellness tracking",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 5999,
    features: [
      "All Basic features",
      "Advanced analytics",
      "Priority support",
      "Custom health insights",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 14999,
    features: [
      "All Premium features",
      "Dedicated support",
      "Custom integrations",
      "Team management",
    ],
  },
];

export default function BillingPage() {
  const { user } = useUser();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [billingHistory, setBillingHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBillingHistory();
  }, []);

  const fetchBillingHistory = async () => {
    try {
      const response = await fetch("/api/billing");
      if (!response.ok) throw new Error("Failed to fetch billing history");
      const data = await response.json();
      setBillingHistory(data);
    } catch (error) {
      console.error("Error fetching billing history:", error);
      toast.error("Failed to load billing history");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage || !receipt) {
      toast.error("Please select a package and upload a receipt");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("packageType", selectedPackage);
      formData.append("receipt", receipt);

      const response = await fetch("/api/billing", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit billing");

      const data = await response.json();
      setBillingHistory([data, ...billingHistory]);
      toast.success("Billing submitted successfully");
      setSelectedPackage(null);
      setReceipt(null);

      // Send email notification
      await fetch("/api/email/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          type: "billing_submitted",
          data: {
            packageType: selectedPackage,
          },
        }),
      });
    } catch (error) {
      console.error("Error submitting billing:", error);
      toast.error("Failed to submit billing");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPremium = user?.publicMetadata?.isPremium || false;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Billing</h1>
        {isPremium && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            Premium User
          </div>
        )}
      </div>

      {/* Billing History Section */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : billingHistory.length === 0 ? (
            <p className="text-center text-gray-500">No billing history found</p>
          ) : (
            <div className="space-y-4">
              {billingHistory.map((billing) => (
                <div
                  key={billing.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium capitalize">{billing.packageType} Package</h4>
                    <p className="text-sm text-gray-500">
                      Rs. {billing.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(billing.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      billing.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : billing.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {billing.status.charAt(0).toUpperCase() + billing.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Package Selection Section */}
      <Card>
        <CardHeader>
          <CardTitle>Select a Package</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${
                    selectedPackage === pkg.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <p className="text-2xl font-bold mb-4">
                    Rs. {pkg.price.toLocaleString()}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="package"
                      checked={selectedPackage === pkg.id}
                      onChange={() => setSelectedPackage(pkg.id)}
                      className="h-4 w-4 text-primary"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Receipt
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setReceipt(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-white
                    hover:file:bg-primary/90"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !selectedPackage || !receipt}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Payment"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
