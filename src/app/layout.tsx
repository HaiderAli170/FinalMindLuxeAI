import { Providers } from "@/components";
import { Toaster } from "@/components/ui/sonner";
import { poppins } from "@/constants";
import { cn } from "@/lib";
import "@/styles/globals.css";
import { generateMetadata } from "@/utils";
import { ThemeProvider } from "@/context/them-provider";

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white dark:bg-black100 text-foreground antialiased font-normal",
          poppins.variable,
          "font-poppins"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Providers>
            <Toaster richColors theme="light" position="top-center" />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
