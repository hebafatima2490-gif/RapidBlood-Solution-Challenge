"use client";

import Link from "next/link";
import { Droplets, ShieldAlert, Heart, Building2, Hospital } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-background mission-control-bg flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-4">
          <ShieldAlert className="w-3 h-3" />
          Mission Critical Prototype
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-center mb-6">
             <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-2xl shadow-accent/20">
                <Droplets className="text-white w-10 h-10" />
             </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-white tracking-tighter">
            RAPIDBLOOD <span className="text-accent italic">DISPATCH</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Real-time emergency coordination platform ensuring <span className="text-white font-medium">zero-mismatch</span> blood delivery during critical situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <RoleCard 
            title="Hospital" 
            desc="Raise requests, track delivery, manage blood bank access." 
            icon={Hospital}
            href="/dashboard"
          />
          <RoleCard 
            title="Blood Bank" 
            desc="Inventory management, dispatch control, stock analytics." 
            icon={Building2}
            href="/dashboard"
            highlight
          />
          <RoleCard 
            title="Donor" 
            desc="Emergency alerts, location sharing, donation tracking." 
            icon={Heart}
            href="/dashboard"
          />
        </div>

        <div className="pt-12 border-t border-border mt-12 flex flex-col items-center gap-4">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Experience the platform</p>
          <Link href="/dashboard">
            <Button size="lg" className="px-12 h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg rounded-full transition-transform active:scale-95 shadow-xl shadow-accent/20">
              LAUNCH COMMAND CENTER
            </Button>
          </Link>
        </div>
      </div>

      <footer className="mt-20 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
        Secure Handover Protocol • v2.0.4-Beta
      </footer>
    </div>
  );
}

function RoleCard({ title, desc, icon: Icon, href, highlight }: any) {
  return (
    <Link href={href} className="group">
      <div className={cn(
        "p-8 rounded-3xl border transition-all duration-300 text-left h-full flex flex-col gap-4 relative overflow-hidden",
        highlight ? "bg-accent/5 border-accent/20" : "bg-card/50 border-border hover:border-primary/50"
      )}>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
          highlight ? "bg-accent text-white" : "bg-secondary text-muted-foreground group-hover:bg-primary group-hover:text-white"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-headline font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
        </div>
        <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
          Enter Dashboard →
        </div>
      </div>
    </Link>
  );
}