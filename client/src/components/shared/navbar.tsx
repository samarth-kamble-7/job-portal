"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Briefcase, LogOut, LayoutDashboard, User } from "lucide-react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const getDashboardLink = () => {
    if (!user) return "/dashboard/candidate";
    if (user.role === "EMPLOYER_ADMIN" || user.role === "RECRUITER") {
      return "/dashboard/employer";
    }
    if (user.role === "PLATFORM_ADMIN") {
      return "/dashboard/admin";
    }
    return "/dashboard/candidate";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white tracking-tight">
            <div className="size-7 rounded bg-zinc-100 flex items-center justify-center text-zinc-950">
              <Briefcase className="size-4" />
            </div>
            <span>JobPortal</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              Find Jobs
            </Link>
            <Link href="/register/employer" className="hover:text-white transition-colors">
              For Employers
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link href={getDashboardLink()}>
                <Button variant="outline" size="sm" className="h-8 gap-2 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-md">
                  <LayoutDashboard className="size-3.5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
              <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 pl-2 border-l border-zinc-800">
                <User className="size-3.5 text-zinc-500" />
                <span className="text-zinc-200 font-medium max-w-[120px] truncate">{user.name}</span>
                <span className="rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] font-mono border border-zinc-800 text-zinc-400">
                  {user.role}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="h-8 px-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md"
                title="Sign out"
              >
                <LogOut className="size-3.5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="h-8 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-md text-xs font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="h-8 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md text-xs font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
