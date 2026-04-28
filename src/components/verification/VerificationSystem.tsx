"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, ShieldCheck, AlertTriangle, Scan, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function VerificationSystem() {
  const [isScanning, setIsScanning] = useState(false);
  const [verified, setVerified] = useState<null | boolean>(null);
  const { toast } = useToast();

  const simulateScan = () => {
    setIsScanning(true);
    setVerified(null);
    
    // Simulate the time it takes to process the digital signature and cross-match
    setTimeout(() => {
      setIsScanning(false);
      setVerified(true);
      toast({
        title: "SAFETY VERIFIED",
        description: "Unit O- (Batch #88392) is safe for transfusion.",
      });
    }, 2500);
  };

  const resetScanner = () => {
    setVerified(null);
    setIsScanning(false);
  };

  return (
    <Card className="p-6 bg-card border-border overflow-hidden relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-primary w-6 h-6" />
          <h3 className="text-lg font-headline text-white uppercase tracking-tight">Safety Verification</h3>
        </div>
        {verified && (
          <Badge className="bg-green-500 text-white border-none animate-in zoom-in-50">
            VALIDATED
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden group">
            {isScanning ? (
              <div className="flex flex-col items-center gap-4 z-10">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <div className="text-center">
                  <p className="text-sm font-bold text-white uppercase tracking-widest animate-pulse">Scanning Bio-Tag...</p>
                  <p className="text-[10px] text-muted-foreground uppercase mt-1">Cross-referencing Batch #88392</p>
                </div>
                <div className="absolute inset-0 scanner-line" />
              </div>
            ) : verified === true ? (
              <div className="flex flex-col items-center gap-4 text-center z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <ShieldCheck className="w-12 h-12 text-green-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-headline text-green-500 font-bold">VERIFIED SAFE</h4>
                  <p className="text-xs text-muted-foreground mt-2 px-6">
                    Digital signature matched. Blood type O- confirmed. <br/> 
                    <span className="text-white/80 font-bold uppercase mt-2 block">Safe for Transfusion</span>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="w-32 h-32 bg-white/5 p-4 rounded-2xl border border-white/10 group-hover:border-primary/50 transition-all duration-300 flex items-center justify-center cursor-pointer">
                  <QrCode className="w-full h-full text-white/20 group-hover:text-primary/60 transition-colors" />
                </div>
                <div className="text-center mt-6">
                  <p className="text-xs text-muted-foreground px-4 leading-relaxed font-medium">
                    Position the unit's QR code within the scanner's field of view to initiate multi-point safety validation.
                  </p>
                </div>
              </>
            )}
            
            {/* Background UI Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/10" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/10" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/10" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/10" />
          </div>
          
          <Button 
            onClick={verified ? resetScanner : simulateScan} 
            disabled={isScanning}
            className={cn(
              "w-full h-14 font-bold text-lg uppercase tracking-wider rounded-xl transition-all active:scale-95 shadow-lg",
              verified 
                ? "bg-secondary hover:bg-secondary/80 text-white border-border" 
                : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
            )}
          >
            {isScanning ? (
              <span className="flex items-center gap-2">AUTHENTICATING...</span>
            ) : verified ? (
              "PREPARE NEXT UNIT"
            ) : (
              <span className="flex items-center gap-2">
                <Scan className="w-5 h-5" />
                VERIFY UNIT SAFETY
              </span>
            )}
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Validation Protocol</h4>
            <div className="grid gap-2">
              <ValidationItem label="Blood Group Identity" status={verified ? "pass" : "pending"} detail="Matched: O Negative" />
              <ValidationItem label="Rhesus Factor Integrity" status={verified ? "pass" : "pending"} detail="Matched: Rh-" />
              <ValidationItem label="Cold Chain Compliance" status={verified ? "pass" : "pending"} detail="Stable at 4.2°C" />
              <ValidationItem label="Batch Expiry Status" status={verified ? "pass" : "pending"} detail="Exp: 14 Days" />
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 space-y-3">
            <div className="flex items-center gap-2 text-accent">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Procedural Warning</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed italic">
              Verification is a mandatory step. Transfusion without validated cross-match clearance is a violation of Sector 7 Medical Protocol. Do not bypass this hardware check.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ValidationItem({ label, status, detail }: { label: string, status: "pass" | "fail" | "pending", detail?: string }) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-xl border transition-all duration-500",
      status === "pass" ? "bg-green-500/5 border-green-500/20" : "bg-secondary/20 border-border"
    )}>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-white/70 font-medium">{label}</span>
        {status === "pass" && detail && (
          <span className="text-[9px] text-green-500 font-bold uppercase">{detail}</span>
        )}
      </div>
      <div className={cn(
        "flex items-center justify-center w-6 h-6 rounded-full transition-all duration-500",
        status === "pass" ? "bg-green-500 text-white" : 
        status === "fail" ? "bg-accent text-white" : "bg-background border border-border"
      )}>
        {status === "pass" ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : status === "fail" ? (
          <XCircle className="w-4 h-4" />
        ) : (
          <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
        )}
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest", className)}>
      {children}
    </span>
  );
}