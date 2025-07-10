"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, X, ImageIcon, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BillingSubmission {
  id: string;
  packageType: string;
  amount: number;
  receiptUrl: string;
  status: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const PACKAGE_DETAILS = {
  basic: {
    name: "Basic Package",
    price: 2999,
    features: [
      "Basic health tracking",
      "Medication reminders",
      "Basic mental wellness tracking",
    ],
  },
  premium: {
    name: "Premium Package",
    price: 5999,
    features: [
      "All Basic features",
      "Advanced analytics",
      "Priority support",
      "Custom health insights",
    ],
  },
  enterprise: {
    name: "Enterprise Package",
    price: 14999,
    features: [
      "All Premium features",
      "Dedicated support",
      "Custom integrations",
      "Team management",
    ],
  },
};

export default function AdminBillingPage() {
  const [submissions, setSubmissions] = useState<BillingSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/billing");
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      } else {
        throw new Error("Failed to fetch submissions");
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to load billing submissions");
    }
  };

  const handleStatusUpdate = async (billingId: string, status: "approved" | "rejected") => {
    setIsUpdating(billingId);
    try {
      // First update the billing status
      const billingResponse = await fetch("/api/admin/billing", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ billingId, status }),
      });

      if (!billingResponse.ok) {
        throw new Error("Failed to update billing status");
      }

      const billingData = await billingResponse.json();

      // Then send email notification
      try {
        await fetch("/api/email/notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: billingData.userId,
            type: `billing_${status}`,
            data: {
              packageType: billingData.packageType,
              amount: billingData.amount,
            },
          }),
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the whole operation if email fails
      }

      toast.success(`Payment ${status} successfully`);
      fetchSubmissions();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Billing Submissions</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Submissions</CardTitle>
            <CardDescription>Review and approve payment submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissions.length === 0 ? (
                <p className="text-center text-muted-foreground">No pending submissions</p>
              ) : (
                submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-2">
                      <div>
                        <p className="font-semibold">
                          {submission.user.firstName} {submission.user.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{submission.user.email}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium">
                          {PACKAGE_DETAILS[submission.packageType as keyof typeof PACKAGE_DETAILS].name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Rs. {submission.amount.toLocaleString()}
                        </p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                          {PACKAGE_DETAILS[submission.packageType as keyof typeof PACKAGE_DETAILS].features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="w-3 h-3 mr-1 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Submitted: {new Date(submission.createdAt).toLocaleDateString()}
                      </p>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => setSelectedReceipt(submission.receiptUrl)}
                      >
                        <ImageIcon className="w-4 h-4" />
                        View Receipt
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      {submission.status === "pending" ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleStatusUpdate(submission.id, "approved")}
                            disabled={isUpdating === submission.id}
                          >
                            {isUpdating === submission.id ? (
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4 mr-1" />
                            )}
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleStatusUpdate(submission.id, "rejected")}
                            disabled={isUpdating === submission.id}
                          >
                            {isUpdating === submission.id ? (
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <X className="w-4 h-4 mr-1" />
                            )}
                            Reject
                          </Button>
                        </>
                      ) : (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          submission.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedReceipt} onOpenChange={() => setSelectedReceipt(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedReceipt && (
              <img
                src={selectedReceipt}
                alt="Payment Receipt"
                className="w-full rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 