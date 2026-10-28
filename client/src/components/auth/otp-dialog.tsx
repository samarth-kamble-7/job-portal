"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { ShieldCheck, Loader2, RefreshCw } from "lucide-react";

interface OtpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onVerified: () => void;
}

export function OtpDialog({
  isOpen,
  onOpenChange,
  email,
  onVerified,
}: OtpDialogProps) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const { verifyOtp, sendOtp, markEmailVerified } = useAuth();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit verification code");
      return;
    }

    setIsVerifying(true);
    try {
      await verifyOtp(email, otp);
      markEmailVerified();
      toast.success("Email verified successfully");
      onOpenChange(false);
      onVerified();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Verification failed";
      toast.error(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      await sendOtp(email);
      setCountdown(60);
      setOtp("");
      toast.success("New verification code dispatched to your email");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to resend code";
      toast.error(message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-950 border border-zinc-800 text-zinc-100 p-6 rounded-lg">
        <DialogHeader className="text-left space-y-2">
          <div className="size-10 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-1">
            <ShieldCheck className="size-5" />
          </div>
          <DialogTitle className="text-lg font-semibold tracking-tight text-white">
            Verify Email Address
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Enter the 6-digit verification code sent to{" "}
            <span className="font-medium text-zinc-200">{email}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(val) => setOtp(val)}
            disabled={isVerifying}
          >
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={0} className="size-11 text-lg font-mono border-zinc-800 bg-zinc-900/60 rounded-md" />
              <InputOTPSlot index={1} className="size-11 text-lg font-mono border-zinc-800 bg-zinc-900/60 rounded-md" />
              <InputOTPSlot index={2} className="size-11 text-lg font-mono border-zinc-800 bg-zinc-900/60 rounded-md" />
              <InputOTPSlot index={3} className="size-11 text-lg font-mono border-zinc-800 bg-zinc-900/60 rounded-md" />
              <InputOTPSlot index={4} className="size-11 text-lg font-mono border-zinc-800 bg-zinc-900/60 rounded-md" />
              <InputOTPSlot index={5} className="size-11 text-lg font-mono border-zinc-800 bg-zinc-900/60 rounded-md" />
            </InputOTPGroup>
          </InputOTP>

          <Button
            type="button"
            className="w-full h-10 bg-white text-zinc-950 hover:bg-zinc-200 font-medium rounded-md transition-colors"
            disabled={otp.length !== 6 || isVerifying}
            onClick={handleVerify}
          >
            {isVerifying ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>

          <div className="flex items-center justify-between w-full text-xs text-zinc-400 pt-2 border-t border-zinc-900">
            <span>Did not receive code?</span>
            <button
              type="button"
              disabled={countdown > 0 || isResending}
              onClick={handleResend}
              className="text-zinc-200 hover:text-white disabled:text-zinc-600 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {isResending ? (
                <>
                  <RefreshCw className="size-3 animate-spin" />
                  Sending...
                </>
              ) : countdown > 0 ? (
                `Resend in ${countdown}s`
              ) : (
                "Resend Code"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
