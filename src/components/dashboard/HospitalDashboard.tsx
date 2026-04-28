"use client";

import { EmergencyButton } from "@/components/emergency/EmergencyButton";
import { LiveMap } from "@/components/map/LiveMap";
import { DeliveryTracker } from "@/components/tracking/DeliveryTracker";
import { VerificationSystem } from "@/components/verification/VerificationSystem";
import { Card } from "@/components/ui/card";
import { ShieldAlert, Droplets, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function HospitalDashboard() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <EmergencyButton />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Unit Verification</h2>
            <VerificationSystem />
            <Card className="p-4 bg-secondary/10 border-border">
              <h3 className="text-xs font-bold text-muted-foreground mb-3 uppercase">Recent Orders</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs p-2 bg-background/50 rounded border border-border">
                  <span className="font-bold">ORD-9921</span>
                  <span className="text-muted-foreground">O- (2 units)</span>
                  <span className="text-green-500 font-bold">DELIVERED</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2 bg-background/50 rounded border border-border">
                  <span className="font-bold">ORD-9920</span>
                  <span className="text-muted-foreground">A+ (4 units)</span>
                  <span className="text-green-500 font-bold">DELIVERED</span>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Tracking & Deployment</h2>
            <DeliveryTracker />
            <LiveMap />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Active Protocols</h2>
        <Card className="p-6 bg-accent/5 border-accent/20">
          <h3 className="text-sm font-headline text-accent mb-4 flex items-center gap-2 font-bold tracking-widest">
            <ShieldAlert className="w-4 h-4" />
            TRAUMA ALERT ACTIVE
          </h3>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Level 1 Trauma Protocol activated. O- Negative stock reserved for incoming casualty. All non-emergency transfers suspended.
          </p>
          <div className="flex gap-2">
             <div className="flex-1 bg-accent/10 border border-accent/30 p-2 rounded text-center">
                <p className="text-[9px] font-bold text-accent uppercase">On Site</p>
                <p className="text-lg font-headline font-bold text-white">04</p>
             </div>
             <div className="flex-1 bg-primary/10 border border-primary/30 p-2 rounded text-center">
                <p className="text-[9px] font-bold text-primary uppercase">In Route</p>
                <p className="text-lg font-headline font-bold text-white">02</p>
             </div>
          </div>
        </Card>

        <div className="p-4 rounded-xl border border-border bg-card/40">
           <h4 className="text-[10px] font-bold text-muted-foreground uppercase mb-4">Nearby Banks</h4>
           <div className="space-y-4">
              <BankMiniInfo name="City Central Bank" distance="1.2 km" units={14} color="bg-green-500" />
              <BankMiniInfo name="St. Jude Medical" distance="2.8 km" units={0} color="bg-accent" />
              <BankMiniInfo name="Metro Health" distance="4.1 km" units={8} color="bg-yellow-500" />
           </div>
        </div>
      </div>
    </div>
  );
}

function BankMiniInfo({ name, distance, units, color }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="w-3 h-3 text-muted-foreground" />
        <div className="flex flex-col">
          <span className="text-[11px] text-white font-medium">{name}</span>
          <span className="text-[9px] text-muted-foreground uppercase tracking-widest">{distance}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-white">{units} units</span>
        <div className={cn("w-1.5 h-1.5 rounded-full", color)} />
      </div>
    </div>
  );
}
