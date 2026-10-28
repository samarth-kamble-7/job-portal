import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/shared/navbar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobPortal - Multi-Vendor Hiring Platform",
  description: "Enterprise hiring platform connecting verified employers directly with candidates.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500">
            <div className="container mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>&copy; {new Date().getFullYear()} JobPortal Platform Inc. All rights reserved.</span>
              <div className="flex items-center gap-4 text-zinc-400">
                <a href="/terms" className="hover:text-zinc-200 transition-colors">
                  Terms of Service
                </a>
                <a href="/privacy" className="hover:text-zinc-200 transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </footer>
          <Toaster richColors position="top-right" theme="dark" />
        </AuthProvider>
      </body>
    </html>
  );
}
