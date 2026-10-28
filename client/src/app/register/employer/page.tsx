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
import {
  Loader2,
  Building2,
  Globe,
  MapPin,
  Lock,
  Mail,
  User,
  Phone,
  ShieldAlert,
} from "lucide-react";

const INDUSTRIES = [
  "Software & Technology",
  "Financial Services & FinTech",
  "Healthcare & Life Sciences",
  "E-Commerce & Retail",
  "Manufacturing & Robotics",
  "Education & EdTech",
  "Media & Entertainment",
  "Professional Services",
  "Other",
];

const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

export default function RegisterEmployerPage() {
  const router = useRouter();
  const { saveAuthSession } = useAuth();

  // Step state
  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields - Step 1: Admin
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Form Fields - Step 2: Company
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [companySize, setCompanySize] = useState(COMPANY_SIZES[1]);
  const [location, setLocation] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP Dialog state
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill in all administrator credentials");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim()) {
      toast.error("Company legal name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiClient<AuthResponse>("/auth/register/employer", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
          companyName: companyName.trim(),
          companyWebsite: companyWebsite.trim() || undefined,
          industry,
          companySize,
          location: location.trim() || undefined,
        }),
      });

      if (!response.data) {
        throw new Error("Invalid response from server");
      }

      saveAuthSession(response.data);
      setRegisteredEmail(response.data.user.email);
      setIsOtpOpen(true);
      toast.success("Company account registered successfully");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpVerified = () => {
    router.push("/dashboard/employer");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-xl bg-zinc-900/40 border border-zinc-800 rounded-lg p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="space-y-1.5 mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-800 text-[11px] font-mono text-zinc-300 mb-1">
            <Building2 className="size-3" />
            <span>Employer Onboarding</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Register Employer Account
          </h1>
          <p className="text-xs text-zinc-400">
            Set up your organization tenant to publish job listings and manage applicant pipelines.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div
            className={`h-1 rounded-sm transition-colors ${
              step === 1 ? "bg-white" : "bg-zinc-700"
            }`}
          />
          <div
            className={`h-1 rounded-sm transition-colors ${
              step === 2 ? "bg-white" : "bg-zinc-800"
            }`}
          />
        </div>

        {/* Step 1: Admin Credentials */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider pb-1 border-b border-zinc-800">
              1. Administrator Credentials
            </div>

            <div className="space-y-1.5 text-left">
              <Label htmlFor="admin-name" className="text-xs font-medium text-zinc-300">
                Contact Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                <Input
                  id="admin-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <Label htmlFor="admin-email" className="text-xs font-medium text-zinc-300">
                Work Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="s.connor@cyberdyne.ai"
                  className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <Label htmlFor="admin-phone" className="text-xs font-medium text-zinc-300">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                  <Input
                    id="admin-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555-0100"
                    className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <Label htmlFor="admin-password" className="text-xs font-medium text-zinc-300">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                  <Input
                    id="admin-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-white text-zinc-950 hover:bg-zinc-200 font-medium rounded-md transition-colors mt-2"
            >
              Continue to Company Profile
            </Button>
          </form>
        )}

        {/* Step 2: Company Profile */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                2. Company Details
              </span>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-zinc-400 hover:text-zinc-200 underline"
              >
                Back to step 1
              </button>
            </div>

            <div className="space-y-1.5 text-left">
              <Label htmlFor="company-name" className="text-xs font-medium text-zinc-300">
                Company Legal Name *
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                <Input
                  id="company-name"
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Cyberdyne Systems"
                  className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <Label htmlFor="company-website" className="text-xs font-medium text-zinc-300">
                  Website URL
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                  <Input
                    id="company-website"
                    type="url"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder="https://example.com"
                    className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <Label htmlFor="company-location" className="text-xs font-medium text-zinc-300">
                  Headquarters Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                  <Input
                    id="company-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="San Francisco, CA"
                    className="pl-9 h-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-md focus:border-zinc-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <Label htmlFor="industry" className="text-xs font-medium text-zinc-300">
                  Industry Sector
                </Label>
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full h-10 px-3 bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm rounded-md focus:border-zinc-500 focus:outline-none"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <Label htmlFor="company-size" className="text-xs font-medium text-zinc-300">
                  Company Size
                </Label>
                <select
                  id="company-size"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full h-10 px-3 bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm rounded-md focus:border-zinc-500 focus:outline-none"
                >
                  {COMPANY_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Verification Disclaimer */}
            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-md flex items-start gap-2.5 text-xs text-zinc-400">
              <ShieldAlert className="size-4 text-zinc-300 shrink-0 mt-0.5" />
              <span>
                New companies are registered with <strong className="text-zinc-200">Pending Verification</strong> status. You can draft job postings immediately, but publishing requires verification by platform staff.
              </span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 bg-white text-zinc-950 hover:bg-zinc-200 font-medium rounded-md transition-colors mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Submitting company profile...
                </>
              ) : (
                "Complete Employer Registration"
              )}
            </Button>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-zinc-800/80 text-center text-xs text-zinc-400">
          Already registered?{" "}
          <Link
            href="/login"
            className="text-zinc-200 hover:text-white font-medium underline underline-offset-4"
          >
            Sign In to Employer Dashboard
          </Link>
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
