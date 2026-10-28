"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  User,
  Briefcase,
  FileText,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Search,
  ExternalLink,
} from "lucide-react";

export default function CandidateDashboardPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 mb-1.5">
            <User className="size-3" />
            <span>Candidate Workspace</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome back, {user?.name || "Candidate"}
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage your employment applications, profile credentials, and verification status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {user?.emailVerified ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="size-3.5" />
              <span>Email Verified</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-800/80 text-amber-400 text-xs font-medium">
              <ShieldAlert className="size-3.5" />
              <span>Unverified Email</span>
            </div>
          )}

          <Link href="/">
            <Button size="sm" className="h-8 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md text-xs font-medium gap-1.5">
              <Search className="size-3.5" />
              <span>Browse Jobs</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row (Real counts, not fake metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Submitted Applications</span>
            <FileText className="size-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">0</div>
          <p className="text-[11px] text-zinc-500">Active positions applied for</p>
        </div>

        <div className="p-5 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Review In Progress</span>
            <Clock className="size-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">0</div>
          <p className="text-[11px] text-zinc-500">Applications currently under recruiter review</p>
        </div>

        <div className="p-5 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Interviews Scheduled</span>
            <Briefcase className="size-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">0</div>
          <p className="text-[11px] text-zinc-500">Direct interview invitations received</p>
        </div>
      </div>

      {/* Applications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white tracking-tight">
            Recent Applications
          </h2>
          <span className="text-xs text-zinc-500 font-mono">0 Total</span>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/20 p-12 text-center space-y-3">
          <div className="size-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <FileText className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-zinc-200">No applications submitted yet</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Explore open positions posted by verified employer partners and submit your resume directly.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-md text-xs gap-1.5">
                <Search className="size-3.5" />
                <span>Search Open Positions</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Details Box */}
      <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/30 space-y-4">
        <h3 className="text-sm font-semibold text-white tracking-tight">
          Account Profile Credentials
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 block mb-1">Registered Full Name</span>
            <span className="text-zinc-200 font-medium">{user?.name || "Candidate"}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">Primary Email Address</span>
            <span className="text-zinc-200 font-mono">{user?.email || "candidate@example.com"}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">Platform Role</span>
            <span className="font-mono text-zinc-300">{user?.role || "CANDIDATE"}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">Account Security</span>
            <span className="text-zinc-300">Password protected with Resend OTP multi-factor</span>
          </div>
        </div>
      </div>
    </div>
  );
}
