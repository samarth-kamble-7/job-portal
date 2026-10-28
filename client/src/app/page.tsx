import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  Layers,
  Search,
  Users,
  FileCheck,
} from "lucide-react";

export const metadata = {
  title: "JobPortal - Multi-Tenant Enterprise Recruitment Platform",
  description: "Enterprise hiring infrastructure with multi-tenant company isolation, domain verification, and role-based access control.",
};

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative border-b border-zinc-800/80 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Role-Based Multi-Vendor Hiring Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Enterprise Recruitment Infrastructure for Verified Organizations
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Direct talent acquisition pipeline with strict tenant isolation, cryptographic OTP authentication, and mandatory employer verification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-11 px-6 bg-white text-zinc-950 hover:bg-zinc-200 font-medium rounded-md text-sm gap-2 transition-colors">
                <span>Join as Candidate</span>
                <ArrowRight className="size-4" />
              </Button>
            </Link>

            <Link href="/register/employer" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-11 px-6 border-zinc-800 bg-zinc-900/50 text-zinc-200 hover:text-white hover:bg-zinc-800 font-medium rounded-md text-sm gap-2 transition-colors"
              >
                <Building2 className="size-4 text-zinc-400" />
                <span>Register Your Company</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture & Verification Pillars */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80 bg-zinc-950">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
              Platform Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Built for Security, Compliance, and Multi-Vendor Isolation
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Every employer operates within an isolated tenant partition with cryptographic credential verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-zinc-900/30 border border-zinc-800 space-y-3">
              <div className="size-9 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                Mandatory Employer Verification
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All employer accounts are quarantined in a pending review queue until corporate identity, domain records, and authority credentials pass inspection by platform administrators.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/30 border border-zinc-800 space-y-3">
              <div className="size-9 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <Layers className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                4-Role Strict Access Control
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                System access is partitioned into Candidate, Employer Admin, Recruiter, and Platform Admin roles. JWT tokens encode tenant scopes to prevent cross-tenant data leakage.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900/30 border border-zinc-800 space-y-3">
              <div className="size-9 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <Lock className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                Secure Session Management
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Better Auth database session persistence combined with cryptographic 6-digit OTP verification delivered via the Resend transactional email API.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Pathways Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-900/20">
        <div className="container mx-auto max-w-6xl space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Choose Your Platform Path
            </h2>
            <p className="text-xs text-zinc-400">
              Select your user profile type to access dedicated workspaces and workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Candidate Box */}
            <div className="p-6 sm:p-8 rounded-lg bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                  <Users className="size-3.5" />
                  <span>For Job Seekers</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Candidate Profile
                </h3>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-zinc-300 shrink-0" />
                    <span>One unified profile for applications across verified employers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-zinc-300 shrink-0" />
                    <span>Real-time status tracking on application reviews and interviews</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-zinc-300 shrink-0" />
                    <span>Email OTP verification to protect account access</span>
                  </li>
                </ul>
              </div>

              <Link href="/register">
                <Button className="w-full h-10 bg-white text-zinc-950 hover:bg-zinc-200 font-medium rounded-md text-xs gap-1.5">
                  <span>Create Candidate Account</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </div>

            {/* Employer Box */}
            <div className="p-6 sm:p-8 rounded-lg bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                  <Building2 className="size-3.5" />
                  <span>For Hiring Organizations</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Employer Tenant
                </h3>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-zinc-300 shrink-0" />
                    <span>Post job openings with compensation and skill specifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-zinc-300 shrink-0" />
                    <span>Invite hiring managers and recruiters to manage candidate pipelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-zinc-300 shrink-0" />
                    <span>Enterprise verification badge displayed on published requisitions</span>
                  </li>
                </ul>
              </div>

              <Link href="/register/employer">
                <Button variant="outline" className="w-full h-10 border-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-800 font-medium rounded-md text-xs gap-1.5">
                  <span>Register Company Entity</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* System Specifications Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/80 bg-zinc-950">
        <div className="container mx-auto max-w-5xl">
          <div className="p-6 rounded-lg bg-zinc-900/30 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
            <div className="space-y-1 text-center sm:text-left">
              <div className="font-semibold text-white">Production-Ready Architecture</div>
              <p className="text-zinc-400">
                Backend powered by Spring Boot 4 and Java 26, backed by serverless Neon PostgreSQL.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-300">
                Next.js 16
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-300">
                Spring Boot 4
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-300">
                Neon DB
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
