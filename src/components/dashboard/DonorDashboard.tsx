"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Activity, MapPin, Calendar, Star, ChevronRight, Droplets, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function DonorDashboard() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <Card className="p-8 bg-primary/10 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-32 -translate-y-32" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
             <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center text-white shadow-2xl">
                   <Droplets className="w-12 h-12" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent border-4 border-background flex items-center justify-center text-[10px] font-bold text-white">
                   O-
                </div>
             </div>
             <div className="text-center md:text-left space-y-2">
                <h3 className="text-3xl font-headline font-bold text-white">WELCOME, ALEX R.</h3>
                <p className="text-muted-foreground">Universal Donor Status • 14 Successful Donations</p>
                <div className="flex gap-2 justify-center md:justify-start pt-2">
                   <Badge className="bg-primary/20 text-primary border-primary/30">ELITE DONOR</Badge>
                   <Badge className="bg-green-500/20 text-green-500 border-green-500/30">READY FOR ACTIVATION</Badge>
                </div>
             </div>
             <div className="md:ml-auto grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="bg-background/50 border border-border p-4 rounded-xl text-center">
                   <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Lives Saved</p>
                   <p className="text-2xl font-headline font-bold text-primary">42</p>
                </div>
                <div className="bg-background/50 border border-border p-4 rounded-xl text-center">
                   <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Last Donated</p>
                   <p className="text-2xl font-headline font-bold text-white">28d</p>
                </div>
             </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Emergency Notifications</h2>
            <Card className="p-6 bg-accent/10 border-accent/20 relative group hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white emergency-pulse">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div className="space-y-2 flex-1">
                   <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Urgent: O- Negative Needed</h4>
                      <span className="text-[9px] font-bold text-accent animate-pulse">LIVE</span>
                   </div>
                   <p className="text-xs text-muted-foreground leading-relaxed">
                     St. Mary's Trauma Center is requesting O- Negative units. You are the closest matching donor (1.2 km).
                   </p>
                   <div className="flex gap-2 pt-2">
                      <button className="flex-1 py-2 bg-accent text-white rounded font-bold text-[10px] uppercase hover:bg-accent/90 transition-colors">Accept Request</button>
                      <button className="flex-1 py-2 bg-secondary text-muted-foreground rounded font-bold text-[10px] uppercase hover:bg-secondary/80 transition-colors">Unable</button>
                   </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Donation History</h2>
            <div className="space-y-3">
               <HistoryItem date="Jan 14, 2024" type="Whole Blood" location="City Central Bank" status="COMPLETED" />
               <HistoryItem date="Nov 12, 2023" type="Plasma" location="East Medical Center" status="COMPLETED" />
               <HistoryItem date="Sep 08, 2023" type="Whole Blood" location="Mobile Unit #4" status="COMPLETED" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Rewards & Impact</h2>
        <Card className="p-6 bg-secondary/20 border-border">
          <div className="flex items-center gap-3 mb-6">
            <Star className="text-yellow-500 w-5 h-5" />
            <h3 className="text-sm font-headline font-bold text-white uppercase tracking-widest">LOYALTY PROGRAM</h3>
          </div>
          <div className="space-y-4">
             <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase">
                   <span>Points to Next Reward</span>
                   <span className="text-white">850/1000</span>
                </div>
                <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                   <div className="h-full bg-yellow-500" style={{ width: '85%' }} />
                </div>
             </div>
             <div className="p-3 rounded-lg bg-background/50 border border-border text-[10px] text-muted-foreground italic">
                Redeem for: Free health check-up, medical insurance credits, or community badges.
             </div>
          </div>
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-sm font-headline font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            UPCOMING APPOINTMENTS
          </h3>
          <div className="space-y-4">
             <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                   <p className="text-xs font-bold text-white">Mar 12, 2024</p>
                   <p className="text-[10px] text-muted-foreground">General Hospital • 10:30 AM</p>
                </div>
             </div>
             <button className="w-full py-3 border border-dashed border-border rounded-xl text-[10px] font-bold text-muted-foreground uppercase hover:border-primary/50 hover:text-primary transition-all">
               Schedule New Donation
             </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function HistoryItem({ date, type, location, status }: any) {
  return (
    <div className="p-4 rounded-xl bg-secondary/10 border border-border flex items-center justify-between group hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
          <Droplets className="w-4 h-4 text-primary" />
        </div>
        <div>
           <p className="text-xs font-bold text-white">{date}</p>
           <p className="text-[10px] text-muted-foreground">{type} • {location}</p>
        </div>
      </div>
      <Badge variant="outline" className="text-[9px] border-primary/30 text-primary uppercase font-bold">{status}</Badge>
    </div>
  );
}
