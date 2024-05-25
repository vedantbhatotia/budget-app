import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import RootProvider from "@/components/providers/RootProviders";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Budgeting Application with T3 stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" style={{
        colorScheme:"dark"
      }}>
      <body className={inter.className}>
        <Toaster richColors position="bottom-right"></Toaster>
        <RootProvider>
        {children}
        </RootProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
