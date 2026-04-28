"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Truck, MapPin, Package, ShieldCheck, PartyPopper, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { id: 1, label: "Request Accepted", icon: CheckCircle2 },
  { id: 2, label: "Unit Prepared", icon: Package },
  { id: 3, label: "Dispatched", icon: Truck },
  { id: 4, label: "In Transit", icon: MapPin },
  { id: 5, label: "Delivered", icon: ShieldCheck },
];

export function DeliveryTracker() {
  const [currentStageId, setCurrentStageId] = useState(3);
  const [isDelivered, setIsDelivered] = useState(false);

  // Automatically progress to "In Transit" for demonstration, but stop there.
  useEffect(() => {
    if (currentStageId < 4) {
      const timer = setTimeout(() => {
        setCurrentStageId(prev => prev + 1);
      }, 6000); 
      return () => clearTimeout(timer);
    }
  }, [currentStageId]);

  const handleConfirmArrival = () => {
    setCurrentStageId(5);
    setIsDelivered(true);
  };

  return (
    <Card className={cn(
      "p-6 border-border transition-all duration-500 overflow-hidden relative",
      isDelivered ? "bg-green-500/5 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]" : "bg-card"
    )}>
      {isDelivered && (
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse" />
      )}
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-headline text-white flex items-center gap-2">
            Live Tracking: REQ-101
            {isDelivered && <PartyPopper className="w-4 h-4 text-green-500 animate-bounce" />}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">O- Negative | Batch: #88392</p>
        </div>
        <div className="text-right">
          <div className={cn(
            "flex items-center gap-2 transition-colors",
            isDelivered ? "text-green-500" : "text-accent"
          )}>
            <Clock className="w-5 h-5" />
            <span className="text-xl font-bold font-headline tabular-nums">
              {isDelivered ? "ARRIVED" : "08:24"}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            {isDelivered ? "Arrival Logged" : "Estimated Arrival"}
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted-foreground/10 ml-[-1px]" />
        
        <div className="space-y-8">
          {stages.map((stage) => {
            const isComplete = stage.id < currentStageId || (stage.id === 5 && isDelivered);
            const isActive = stage.id === currentStageId && !isDelivered;
            
            return (
              <div key={stage.id} className="relative flex items-center gap-6 group">
                <div className={cn(
                  "z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                  isComplete ? "bg-primary border-primary text-white" : 
                  isActive ? "bg-accent border-accent text-white scale-110 shadow-lg shadow-accent/20" : 
                  "bg-secondary border-muted-foreground/30 text-muted-foreground"
                )}>
                  {isComplete ? <CheckCircle2 className="w-4 h-4" /> : <stage.icon className="w-4 h-4" />}
                </div>
                
                <div className="flex-1">
                  <p className={cn(
                    "font-bold text-sm transition-colors",
                    isComplete || isActive ? "text-white" : "text-muted-foreground"
                  )}>
                    {stage.label}
                  </p>
                  {isActive && stage.id === 4 && (
                    <div className="mt-2 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-32 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-accent w-3/4 animate-pulse" />
                        </div>
                        <span className="text-[9px] text-accent font-bold uppercase">Transit Active</span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        onClick={handleConfirmArrival}
                        className="w-fit bg-primary hover:bg-primary/90 text-white font-bold uppercase text-[10px] h-8 rounded-lg px-4"
                      >
                        Confirm Arrival
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  )}
                  {isActive && stage.id < 4 && (
                     <p className="text-[10px] text-muted-foreground uppercase mt-1">Processing...</p>
                  )}
                  {stage.id === 5 && isDelivered && (
                    <p className="text-[10px] text-green-500 font-bold uppercase mt-1 animate-in fade-in slide-in-from-left-2">
                      Handover Complete
                    </p>
                  )}
                </div>

                {isComplete && stage.id !== 5 && (
                  <span className="text-[9px] text-muted-foreground/60 uppercase font-bold">Done</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {isDelivered && (
        <div className="mt-8 pt-6 border-t border-green-500/10 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
            <div className="space-y-1">
              <p className="text-xs text-green-500 font-bold uppercase tracking-wide">Ready for Safety Scan</p>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Unit #88392 has been physically received. You must now use the <span className="text-white font-bold">Verification System</span> to scan the QR code and confirm medical integrity before use.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
