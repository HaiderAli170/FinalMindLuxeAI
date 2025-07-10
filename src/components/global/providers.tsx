"use client";

import React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
    children: React.ReactNode;
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const Providers = ({ children }: Props) => {
    return (
        <QueryClientProvider client={client}>
            <ClerkProvider>
                {children}
            </ClerkProvider>
        </QueryClientProvider>
    );
};

export default Providers
