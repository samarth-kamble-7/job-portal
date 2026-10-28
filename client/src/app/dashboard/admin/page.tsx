"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
} from "lucide-react";

export default function PlatformAdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 mb-1.5">
            <ShieldCheck className="size-3 text-emerald-400" />
            <span>Platform Governance</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Administrative Control Panel
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Monitor tenant compliance, review employer KYC credentials, and manage system operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
            <Activity className="size-3 text-emerald-400" />
            <span>PostgreSQL Pool: Healthy</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Pending Employer Verifications</span>
            <Clock className="size-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">1</div>
          <p className="text-[11px] text-zinc-500">Awaiting document and domain review</p>
        </div>

        <div className="p-5 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Verified Employer Tenants</span>
            <Building2 className="size-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">0</div>
          <p className="text-[11px] text-zinc-500">Organizations authorized to publish</p>
        </div>

        <div className="p-5 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Registered Platform Users</span>
            <Users className="size-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">2</div>
          <p className="text-[11px] text-zinc-500">Candidates, Recruiters, and Admins</p>
        </div>
      </div>

      {/* Pending Verifications Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white tracking-tight">
            Employer Verification Queue
          </h2>
          <span className="text-xs text-zinc-500 font-mono">1 Item Pending</span>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden">
          <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/70 grid grid-cols-12 text-xs font-medium text-zinc-400">
            <div className="col-span-4">Company Entity</div>
            <div className="col-span-3">Industry / Size</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          <div className="divide-y divide-zinc-800/60">
            <div className="p-4 grid grid-cols-12 items-center text-xs">
              <div className="col-span-4 space-y-0.5">
                <div className="font-semibold text-white">Acme Technologies Inc.</div>
                <div className="text-zinc-500 font-mono text-[11px]">acme.tech</div>
              </div>
              <div className="col-span-3 text-zinc-300">
                <div>Software & Technology</div>
                <div className="text-zinc-500 text-[11px]">11-50 employees</div>
              </div>
              <div className="col-span-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/60 text-amber-400 border border-amber-800/60">
                  PENDING
                </span>
              </div>
              <div className="col-span-3 flex items-center justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md gap-1"
                  onClick={() => alert("Verification review APIs will be implemented in the Platform Admin KYC milestone.")}
                >
                  <CheckCircle2 className="size-3 text-emerald-400" />
                  <span>Verify</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs border-zinc-700 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-md gap-1"
                  onClick={() => alert("Rejection flow will be implemented in the Platform Admin KYC milestone.")}
                >
                  <XCircle className="size-3" />
                  <span>Reject</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
