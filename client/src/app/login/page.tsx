"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please provide both email and password");
      return;
    }

    setIsSubmitting(true);
    try {
      const auth = await login(email.trim(), password);
      toast.success("Authentication successful");

      if (auth.user.role === "EMPLOYER_ADMIN" || auth.user.role === "RECRUITER") {
        router.push("/dashboard/employer");
      } else if (auth.user.role === "PLATFORM_ADMIN") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/candidate");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid credentials";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[420px] bg-zinc-900/40 border border-zinc-800 rounded-lg p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
        <div className="space-y-1.5 mb-6 text-left">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Sign In
          </h1>
          <p className="text-xs text-zinc-400">
            Enter your credentials to access your portal account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <Label htmlFor="email" className="text-xs font-medium text-zinc-300">
              Email Address
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
                placeholder="name@company.com"
                className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-medium text-zinc-300">
                Password
              </Label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 size-4 text-zinc-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="pl-9 pr-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 bg-white text-zinc-950 hover:bg-zinc-200 font-medium rounded-md transition-colors mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-col gap-2.5 text-center text-xs text-zinc-400">
          <div>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-zinc-200 hover:text-white font-medium underline underline-offset-4"
            >
              Sign up as Candidate
            </Link>
          </div>
          <div className="pt-2">
            <Link
              href="/register/employer"
              className="inline-flex items-center justify-center gap-1.5 text-zinc-400 hover:text-zinc-200 font-medium text-xs transition-colors"
            >
              <span>Hiring talent? Register as Company</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
