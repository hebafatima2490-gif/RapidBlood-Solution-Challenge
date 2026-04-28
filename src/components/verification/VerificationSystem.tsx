"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, ShieldCheck, AlertTriangle, Scan, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerificationSystem() {
  const [isScanning, setIsScanning] = useState(false);
  const [verified, setVerified] = useState<null | boolean>(null);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setVerified(true);
    }, 2000);
  };

  return (
    <Card className="p-6 bg-card border-border overflow-hidden relative">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="text-primary w-6 h-6" />
        <h3 className="text-lg font-headline text-white uppercase tracking-tight">Transfusion Safety Check</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-secondary/50 border border-border flex flex-col items-center justify-center min-h-[200px] relative">
            {isScanning ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-accent animate-spin" />
                <p className="text-sm font-medium animate-pulse">Scanning Batch #88392...</p>
                <div className="absolute inset-0 scanner-line" />
              </div>
            ) : verified === true ? (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="text-xl font-headline text-green-500">VERIFIED SAFE</h4>
                <p className="text-xs text-muted-foreground px-4">Match confirmed with Patient ID: TX-2921. Cross-matching complete.</p>
              </div>
            ) : (
              <>
                <div className="w-24 h-24 bg-white p-2 rounded-lg opacity-20 hover:opacity-100 transition-opacity cursor-pointer">
                  <QrCode className="w-full h-full text-black" />
                </div>
                <p className="mt-4 text-xs text-muted-foreground text-center">Scan the unique code on the blood unit pouch before transfusion.</p>
              </>
            )}
          </div>
          
          <Button 
            onClick={simulateScan} 
            disabled={isScanning || verified === true}
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold"
          >
            {verified === true ? "RESET SYSTEM" : <><Scan className="mr-2 w-4 h-4" /> INITIATE SCAN</>}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-muted-foreground uppercase">Validation Parameters</h4>
            <div className="space-y-2">
              <ValidationItem label="Blood Type Match" status={verified ? "pass" : "pending"} />
              <ValidationItem label="Rhesus Factor" status={verified ? "pass" : "pending"} />
              <ValidationItem label="Storage Temperature" status={verified ? "pass" : "pending"} />
              <ValidationItem label="Expiry Date" status={verified ? "pass" : "pending"} />
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
            <p className="text-[10px] text-yellow-500/80 leading-relaxed italic">
              Critical Warning: Proceed only after visual confirmation of the verification badge and patient wristband.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ValidationItem({ label, status }: { label: string, status: "pass" | "fail" | "pending" }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-secondary/30">
      <span className="text-xs text-white/80">{label}</span>
      <div className={cn(
        "w-2 h-2 rounded-full",
        status === "pass" ? "bg-green-500" : 
        status === "fail" ? "bg-accent" : "bg-muted-foreground/30"
      )} />
    </div>
  );
}