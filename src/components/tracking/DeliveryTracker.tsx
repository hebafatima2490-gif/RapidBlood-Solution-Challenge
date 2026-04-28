"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Truck, MapPin, Package, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { id: 1, label: "Request Accepted", icon: CheckCircle2, status: "complete" },
  { id: 2, label: "Unit Prepared", icon: Package, status: "complete" },
  { id: 3, label: "Dispatched", icon: Truck, status: "active" },
  { id: 4, label: "In Transit", icon: MapPin, status: "pending" },
  { id: 5, label: "Verified Delivery", icon: ShieldCheck, status: "pending" },
];

export function DeliveryTracker() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-headline text-white">Live Tracking: REQ-101</h3>
          <p className="text-sm text-muted-foreground">O- Negative | Batch: #88392</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-accent">
            <Clock className="w-5 h-5" />
            <span className="text-xl font-bold font-headline">08:24</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Estimated Arrival</p>
        </div>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted-foreground/20 ml-[-1px]" />
        
        <div className="space-y-8">
          {stages.map((stage) => {
            const isComplete = stage.status === "complete";
            const isActive = stage.status === "active";
            
            return (
              <div key={stage.id} className="relative flex items-center gap-6 group">
                <div className={cn(
                  "z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                  isComplete ? "bg-primary border-primary text-white" : 
                  isActive ? "bg-accent border-accent text-white scale-110 shadow-lg shadow-accent/20" : 
                  "bg-secondary border-muted-foreground/30 text-muted-foreground"
                )}>
                  <stage.icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1">
                  <p className={cn(
                    "font-medium transition-colors",
                    isComplete || isActive ? "text-white" : "text-muted-foreground"
                  )}>
                    {stage.label}
                  </p>
                  {isActive && (
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1.5 w-32 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-3/4 animate-pulse" />
                      </div>
                      <span className="text-[10px] text-accent font-bold uppercase">Moving</span>
                    </div>
                  )}
                </div>

                {isComplete && (
                  <span className="text-[10px] text-muted-foreground italic">10:42 AM</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}