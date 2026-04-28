"use client";

import { InventoryManager } from "@/components/inventory/InventoryManager";
import { PredictiveAlerts } from "@/components/dashboard/PredictiveAlerts";
import { Card } from "@/components/ui/card";
import { Activity, Clock, Truck, ShieldCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function BankDashboard() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <InventoryManager />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Request Queue</h2>
            <Card className="p-0 border-border overflow-hidden bg-background/50">
               <div className="p-4 border-b border-border bg-secondary/20 flex justify-between items-center">
                  <h3 className="text-sm font-headline font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    Incoming Requests
                  </h3>
                  <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded font-bold">03 NEW</span>
               </div>
               <div className="divide-y divide-border">
                 <RequestListItem 
                   id="REQ-101" 
                   hospital="St. Mary's Trauma" 
                   type="O-" 
                   units={2} 
                   status="URGENT" 
                   time="2m ago" 
                 />
                 <RequestListItem 
                   id="REQ-105" 
                   hospital="General Hospital" 
                   type="A+" 
                   units={4} 
                   status="PENDING" 
                   time="14m ago" 
                 />
                 <RequestListItem 
                   id="REQ-108" 
                   hospital="East Medical Center" 
                   type="B-" 
                   units={1} 
                   status="PENDING" 
                   time="1h ago" 
                 />
               </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Active Dispatches</h2>
            <div className="space-y-4">
               <ActiveDispatchCard 
                 id="DISP-402" 
                 target="Children's Hospital" 
                 driver="John M. (TX-12)" 
                 eta="4m" 
                 progress={85} 
               />
               <ActiveDispatchCard 
                 id="DISP-405" 
                 target="St. Jude Medical" 
                 driver="Sarah K. (TX-08)" 
                 eta="12m" 
                 progress={40} 
               />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">System Intelligence</h2>
        <PredictiveAlerts />
        
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-sm font-headline text-primary mb-4 flex items-center gap-2 font-bold tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4" />
            Safety Protocols
          </h3>
          <div className="space-y-3">
             <SafetyItem label="Temperature Control" status="Optimal" />
             <SafetyItem label="Sterilization Batch" status="Verified" />
             <SafetyItem label="Cross-match Nodes" status="Active" />
          </div>
        </Card>

        <div className="p-4 rounded-xl border border-border bg-card/40">
           <h4 className="text-[10px] font-bold text-muted-foreground uppercase mb-4">Stock Analytics (Weekly)</h4>
           <div className="h-24 flex items-end gap-1.5">
             {[30, 45, 20, 70, 85, 40, 60].map((h, i) => (
               <div key={i} className="flex-1 bg-primary/20 rounded-t relative group">
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t" style={{ height: `${h}%` }} />
                  <div className="bg-primary/40 w-full rounded-t" style={{ height: `${h}%` }} />
               </div>
             ))}
           </div>
           <div className="flex justify-between mt-2 text-[8px] text-muted-foreground uppercase font-bold">
             <span>Mon</span>
             <span>Sun</span>
           </div>
        </div>
      </div>
    </div>
  );
}

function RequestListItem({ id, hospital, type, units, status, time }: any) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-secondary/10 transition-colors cursor-pointer group">
      <div className="flex gap-4 items-center">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center font-bold font-headline border",
          status === 'URGENT' ? "bg-accent/10 border-accent/20 text-accent" : "bg-primary/10 border-primary/20 text-primary"
        )}>
          {type}
        </div>
        <div>
          <p className="text-xs font-bold text-white">{id} • {hospital}</p>
          <p className="text-[10px] text-muted-foreground">{units} Units Required • {time}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
         <span className={cn(
           "text-[9px] font-bold px-1.5 py-0.5 rounded",
           status === 'URGENT' ? "bg-accent text-white animate-pulse" : "bg-secondary text-muted-foreground"
         )}>{status}</span>
         <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
      </div>
    </div>
  );
}

function ActiveDispatchCard({ id, target, driver, eta, progress }: any) {
  return (
    <Card className="p-4 bg-secondary/10 border-border">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{id}</p>
          <p className="text-sm font-bold text-white">{target}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-headline font-bold text-white flex items-center gap-1">
            <Clock className="w-4 h-4 text-primary" />
            {eta}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
          <Truck className="w-3 h-3 text-primary" />
        </div>
        <span className="text-[10px] text-white/80 font-medium">{driver}</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-[9px] font-bold text-muted-foreground uppercase">
          <span>In Transit</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </Card>
  );
}

function SafetyItem({ label, status }: any) {
  return (
    <div className="flex justify-between items-center text-[11px]">
      <span className="text-white/70">{label}</span>
      <span className="text-primary font-bold">{status}</span>
    </div>
  );
}
