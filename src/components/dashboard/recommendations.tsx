"use client";

import { getRecommndations } from "@/actions";
import { Medication, Symptom, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon, RefreshCw, Heart, Brain, Activity, Shield, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Props {
  symptoms: Symptom[];
  medications: Medication[];
  user: User;
}

const Recommendations = ({ symptoms, medications, user }: Props) => {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationKey: ["get-tips"],
    mutationFn: async () => {
      setIsLoading(true);
      const res = await getRecommndations({ symptoms, medications, user });
      localStorage.setItem("Mind Luxe Ai_health_recommendations", res);
      setRecommendations(res);
      setIsLoading(false);
      return res;
    },
    onError: (error) => {
      setIsLoading(false);
      setError("Error getting health tips");
    },
    onSuccess: () => {
      setError(null);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    const storedTips = localStorage.getItem("MindLuxeAI_health_recommendations");
    if (storedTips) {
      setRecommendations(storedTips);
    } else {
      mutate();
    }
  }, [mutate]);

  const getIconForRecommendation = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("sleep") || lowerText.includes("rest")) {
      return <Moon className="w-5 h-5 text-blue-500" />;
    } else if (lowerText.includes("exercise") || lowerText.includes("activity")) {
      return <Activity className="w-5 h-5 text-green-500" />;
    } else if (lowerText.includes("mental") || lowerText.includes("mind")) {
      return <Brain className="w-5 h-5 text-purple-500" />;
    } else if (lowerText.includes("heart") || lowerText.includes("cardio")) {
      return <Heart className="w-5 h-5 text-red-500" />;
    } else if (lowerText.includes("immune") || lowerText.includes("health")) {
      return <Shield className="w-5 h-5 text-yellow-500" />;
    } else {
      return <Sun className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full p-4 md:p-6 rounded-xl border border-border/80 bg-gradient-to-br from-white to-gray-50/50 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Health Recommendations</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => mutate()}
          disabled={isLoading}
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-full py-8">
          <LoaderIcon className="w-6 h-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium mt-2">
            Loading health recommendations...
          </p>
        </div>
      ) : (
        <div className="flex flex-col w-full space-y-4">
          {recommendations ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => {
                  const text = children?.toString() || "";
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <div className="mt-1">{getIconForRecommendation(text)}</div>
                      <p className="text-gray-700 leading-relaxed">{children}</p>
                    </motion.div>
                  );
                },
              }}
            >
              {recommendations}
            </ReactMarkdown>
          ) : (
            <div className="flex flex-col items-center justify-center w-full py-8">
              <p className="text-sm text-muted-foreground font-medium text-center">
                {error || "No recommendations available"}
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Recommendations;
