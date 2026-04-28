
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info, Droplets, User, Radio, Navigation, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function LiveMap() {
  return (
    <Card className="relative w-full h-[550px] overflow-hidden bg-background border-border group shadow-2xl rounded-3xl">
      {/* Header with Search (Google Maps Style) */}
      <div className="absolute top-6 left-6 right-6 z-30 flex gap-4 pointer-events-none">
        <div className="relative flex-1 max-w-md pointer-events-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search hospitals, blood banks, or sectors..." 
            className="pl-10 h-12 bg-black/60 backdrop-blur-xl border-white/10 text-white shadow-2xl focus:bg-black/80 transition-all"
          />
        </div>
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Simulated High-Res Map Background (Dark Mode Location Interface) */}
      <div className="absolute inset-0 grayscale brightness-75 pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main Arteries */}
          <path d="M0,20 Q50,25 100,20" stroke="white" strokeWidth="0.8" fill="none" />
          <path d="M20,0 Q25,50 20,100" stroke="white" strokeWidth="0.8" fill="none" />
          <path d="M0,80 Q50,75 100,80" stroke="white" strokeWidth="0.8" fill="none" />
          <path d="M80,0 Q75,50 80,100" stroke="white" strokeWidth="0.8" fill="none" />
          
          {/* Secondary Grid */}
          {[10, 30, 40, 60, 70, 90].map(i => (
            <React.Fragment key={i}>
              <line x1="0" y1={i} x2="100" y2={i} stroke="white" strokeWidth="0.1" strokeDasharray="1,1" />
              <line x1={i} y1="0" x2={i} y2="100" stroke="white" strokeWidth="0.1" strokeDasharray="1,1" />
            </React.Fragment>
          ))}
          
          {/* Sector Boundaries */}
          <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.1" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.1" fill="none" />
          <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="0.1" fill="none" />
        </svg>
      </div>

      {/* Pulsing Scan Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="w-[500px] h-[500px] bg-primary/5 rounded-full animate-ping duration-[3000ms]" />
      </div>

      {/* Map Markers */}
      <div className="absolute top-[25%] left-[35%] group/marker cursor-pointer z-10">
        <div className="relative">
          <div className="absolute -inset-4 bg-green-500/20 rounded-full animate-pulse" />
          <MapPin className="text-green-500 w-10 h-10 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
          <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 w-56 opacity-0 group-hover/marker:opacity-100 transition-all scale-95 group-hover/marker:scale-100 shadow-2xl z-20 pointer-events-none">
            <p className="text-xs font-bold text-white mb-2 uppercase tracking-wider">City Central Blood Bank</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground">O- Inventory:</span>
                <span className="text-green-500 font-bold">12 units</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground">Staff Status:</span>
                <span className="text-blue-400 font-bold uppercase">Ready</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 text-[9px] text-muted-foreground flex items-center gap-2">
              <Navigation className="w-3 h-3 text-primary" />
              1.2 km away • 4 min drive
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[35%] left-[25%] group/marker2 cursor-pointer z-10">
        <div className="relative">
          <div className="absolute -inset-4 bg-accent/20 rounded-full animate-pulse" />
          <MapPin className="text-accent w-12 h-12 drop-shadow-[0_0_20px_rgba(242,13,13,0.6)]" />
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 w-56 opacity-0 group-hover/marker2:opacity-100 transition-all scale-95 group-hover/marker2:scale-100 shadow-2xl z-20 pointer-events-none">
            <p className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Eastside Trauma</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground">Critical Need:</span>
                <span className="text-accent font-bold">4 units (O-)</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground">Condition:</span>
                <span className="text-accent font-bold animate-pulse uppercase">Code Red</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moving Dispatch Marker */}
      <div className="absolute top-1/2 left-2/3 flex flex-col items-center group/vehicle cursor-pointer z-10">
         <div className="relative">
            <div className="absolute -inset-2 bg-blue-400/20 rounded-full animate-pulse" />
            <Navigation className="text-blue-400 w-8 h-8 rotate-45 shadow-blue-400 drop-shadow-lg" />
         </div>
         <span className="text-[9px] font-bold text-blue-400 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full mt-2 border border-blue-400/20">TRANSIT TX-44</span>
      </div>

      {/* Map Overlay Controls */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-4">
        <div className="bg-black/80 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 flex flex-col gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">Grid Network</span>
          </div>
          <div className="flex gap-6">
            <LegendItem color="bg-green-500" label="STABLE" />
            <LegendItem color="bg-yellow-500" label="TRAFFIC" />
            <LegendItem color="bg-accent" label="CRITICAL" />
          </div>
        </div>
      </div>

      <div className="absolute top-24 right-8 bg-black/80 backdrop-blur-2xl p-5 rounded-3xl border border-white/10 max-w-[200px] shadow-2xl">
        <h4 className="text-[10px] font-bold text-white uppercase mb-4 tracking-tighter opacity-70">SECTOR STATUS (5KM)</h4>
        <div className="space-y-3">
          <StatusRow label="Active Banks" value="04" color="text-white" />
          <StatusRow label="Mobile Units" value="18" color="text-blue-400" />
          <StatusRow label="Trauma Load" value="LOW" color="text-green-500" />
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <button className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold uppercase rounded-lg transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Corner UI Accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-lg pointer-events-none" />
    </Card>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-2 h-2 rounded-full", color)} />
      <span className="text-[10px] text-white/80 font-bold">{label}</span>
    </div>
  );
}

function StatusRow({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex justify-between items-center text-[11px]">
      <span className="text-muted-foreground font-medium">{label}:</span>
      <span className={cn("font-bold", color)}>{value}</span>
    </div>
  );
}

import React from 'react';
