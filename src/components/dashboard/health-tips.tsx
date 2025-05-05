"use client";

import { getHealthTips } from "@/actions";
import { Medication, Symptom, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon, RefreshCw, Sparkles, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  symptoms: Symptom[];
  medications: Medication[];
  user: User;
}

const HealthTips = ({ symptoms, medications, user }: Props) => {
  const [tips, setTips] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationKey: ["get-tips"],
    mutationFn: async () => {
      setIsLoading(true);
      const res = await getHealthTips({ symptoms, medications, user });
      localStorage.setItem("MindWell_health_tips", res);
      setTips(res);
      setIsLoading(false);
      return res;
    },
    onError: (error) => {
      setIsLoading(false);
      console.error(error);
      toast.error("Error getting health tips");
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Health tips generated!");
    },
  });

  const handleRefresh = () => {
    mutate();
  };

  useEffect(() => {
    const storedTips = localStorage.getItem("MindWell_health_tips");
    if (storedTips) {
      setTips(storedTips);
    } else {
      mutate();
    }
  }, [mutate]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium">Your Personalized Tips</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Tips
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <LoaderIcon className="w-6 h-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground font-medium">
              Generating personalized health tips...
            </p>
          </div>
        </div>
      ) : (
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {tips ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="space-y-6"
              components={{
                h1: ({ children }) => (
                  <div className="flex items-center gap-2 mb-4">
                    <ChevronRight className="w-5 h-5 text-primary" />
                    <h1 className="text-xl font-semibold text-primary">
                      {children}
                    </h1>
                  </div>
                ),
                h2: ({ children }) => (
                  <div className="flex items-center gap-2 mb-3">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    <h2 className="text-lg font-medium text-foreground">
                      {children}
                    </h2>
                  </div>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-medium text-foreground mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-none space-y-3 text-muted-foreground">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{children}</span>
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-muted-foreground">{children}</em>
                ),
              }}
            >
              {tips}
            </ReactMarkdown>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Sparkles className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground font-medium">
                No health tips available. Click refresh to generate new tips.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthTips;
