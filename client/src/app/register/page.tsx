"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OtpDialog } from "@/components/auth/otp-dialog";
import { apiClient } from "@/lib/api";
import { AuthResponse } from "@/types/auth";
import { toast } from "sonner";
import { Loader2, Lock, Mail, User, Phone, ArrowRight, ShieldCheck } from "lucide-react";

export default function RegisterCandidatePage() {
  const router = useRouter();
  const { saveAuthSession } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP Dialog state
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiClient<AuthResponse>("/auth/register/candidate", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
        }),
      });

      if (!response.data) {
        throw new Error("Invalid response from server");
      }

      saveAuthSession(response.data);
      setRegisteredEmail(response.data.user.email);
      setIsOtpOpen(true);
      toast.success("Account created successfully");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpVerified = () => {
    router.push("/dashboard/candidate");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[440px] bg-zinc-900/40 border border-zinc-800 rounded-lg p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
        <div className="space-y-1.5 mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-800 text-[11px] font-mono text-zinc-300 mb-1">
            <User className="size-3" />
            <span>Job Seeker</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Create Candidate Account
          </h1>
          <p className="text-xs text-zinc-400">
            Apply directly to verified employers with a unified candidate profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <Label htmlFor="name" className="text-xs font-medium text-zinc-300">
              Full Name *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 size-4 text-zinc-500" />
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <Label htmlFor="email" className="text-xs font-medium text-zinc-300">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 size-4 text-zinc-500" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <Label htmlFor="phone" className="text-xs font-medium text-zinc-300">
              Phone Number <span className="text-zinc-500 text-[11px]">(optional)</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 size-4 text-zinc-500" />
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555-0100"
                className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <Label htmlFor="password" className="text-xs font-medium text-zinc-300">
              Password * <span className="text-zinc-500 text-[11px]">(minimum 8 characters)</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 size-4 text-zinc-500" />
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
              />
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 leading-normal pt-1">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-zinc-300 underline underline-offset-2">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-zinc-300 underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 bg-white text-zinc-950 hover:bg-zinc-200 font-medium rounded-md transition-colors mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Creating account...
              </>
            ) : (
              "Create Candidate Account"
            )}
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-col gap-2.5 text-center text-xs text-zinc-400">
          <div>
            Already registered?{" "}
            <Link
              href="/login"
              className="text-zinc-200 hover:text-white font-medium underline underline-offset-4"
            >
              Sign In
            </Link>
          </div>
          <div className="pt-2">
            <Link
              href="/register/employer"
              className="inline-flex items-center justify-center gap-1.5 text-zinc-400 hover:text-zinc-200 font-medium text-xs transition-colors"
            >
              <span>Looking to hire? Register as an Employer</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      <OtpDialog
        isOpen={isOtpOpen}
        onOpenChange={setIsOtpOpen}
        email={registeredEmail}
        onVerified={handleOtpVerified}
      />
    </div>
  );
}
