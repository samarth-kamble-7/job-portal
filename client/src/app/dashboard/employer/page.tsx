"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Briefcase,
  Users,
  ShieldAlert,
  ShieldCheck,
  Plus,
  UserPlus,
  FileSpreadsheet,
} from "lucide-react";

export default function EmployerDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 mb-1.5">
            <Building2 className="size-3" />
            <span>Employer Management Portal</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {user?.name || "Employer"} Workspace
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage your company requisitions, incoming candidate submissions, and recruiter invitations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-md text-xs gap-1.5"
            onClick={() => alert("Recruiter team invites will be enabled in the upcoming company team milestone.")}
          >
            <UserPlus className="size-3.5" />
            <span>Invite Recruiter</span>
          </Button>

          <Button
            size="sm"
            className="h-8 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md text-xs font-medium gap-1.5"
            onClick={() => alert("Job posting creation will be enabled in the Job Requisitions milestone.")}
          >
            <Plus className="size-3.5" />
            <span>Create Job Requisition</span>
          </Button>
        </div>
      </div>

      {/* Verification Notice Banner */}
      <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-2.5">
          <ShieldAlert className="size-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-zinc-300">
            <span className="font-semibold text-white">Company Status: Pending Verification. </span>
            Platform administrators review submitted corporate credentials to prevent fraudulent postings. Requisition drafts are enabled immediately.
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-zinc-800 font-mono text-[10px] text-zinc-400 border border-zinc-700 whitespace-nowrap self-start sm:self-auto">
          TENANT: {user?.company?.name || user?.company?.id || "REGISTERED"}
        </span>
      </div>

      {/* Metrics Row (Actual real counts) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Published Requisitions</span>
            <Briefcase className="size-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">0</div>
          <p className="text-[11px] text-zinc-500">Active public job listings</p>
        </div>

        <div className="p-5 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Candidate Applicants</span>
            <Users className="size-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">0</div>
          <p className="text-[11px] text-zinc-500">Total resumes received across roles</p>
        </div>

        <div className="p-5 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Team Members</span>
            <Users className="size-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">1</div>
          <p className="text-[11px] text-zinc-500">1 Employer Admin active</p>
        </div>
      </div>

      {/* Job Postings Table / Empty State */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white tracking-tight">
            Job Requisitions
          </h2>
          <span className="text-xs text-zinc-500 font-mono">0 Total</span>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/20 p-12 text-center space-y-3">
          <div className="size-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <FileSpreadsheet className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-zinc-200">No requisitions created yet</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Draft your first position to specify compensation, tech stack requirements, and candidate qualifications.
            </p>
          </div>
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-md text-xs gap-1.5"
              onClick={() => alert("Job posting creation will be enabled in the upcoming Job Requisitions milestone.")}
            >
              <Plus className="size-3.5" />
              <span>Create Draft Requisition</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
