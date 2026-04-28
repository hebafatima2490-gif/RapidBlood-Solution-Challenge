"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info, Droplets, User, Radio, Navigation } from "lucide-react";

export function LiveMap() {
  return (
    <Card className="relative w-full h-[450px] overflow-hidden bg-background border-border group shadow-2xl">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      {/* Simulated Map Background */}
      <div className="absolute inset-0 opacity-20 grayscale brightness-75 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,20 L100,80 M20,0 L80,100 M0,50 L100,50 M50,0 L50,100 M10,10 L90,90 M90,10 L10,90" stroke="white" strokeWidth="0.2" fill="none" />
          <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.1" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.1" fill="none" />
          <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="0.1" fill="none" />
        </svg>
      </div>

      {/* Pulsing Scan Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="w-32 h-32 bg-primary/5 rounded-full animate-ping" />
      </div>

      {/* Map Markers */}
      <div className="absolute top-[20%] left-[30%] group/marker cursor-pointer">
        <div className="relative">
          <div className="absolute -inset-2 bg-green-500/20 rounded-full animate-pulse" />
          <MapPin className="text-green-500 w-8 h-8 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <div className="absolute top-10 left-0 bg-card border border-border rounded-xl p-3 w-48 opacity-0 group-hover/marker:opacity-100 transition-all scale-95 group-hover/marker:scale-100 shadow-2xl z-20 pointer-events-none">
            <p className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Central Blood Bank</p>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground">O- Stock:</span>
                <span className="text-green-500 font-bold">12 units</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground">Staff Status:</span>
                <span className="text-blue-400 font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[30%] left-[25%] group/marker2 cursor-pointer">
        <div className="relative">
          <div className="absolute -inset-2 bg-accent/20 rounded-full animate-pulse" />
          <MapPin className="text-accent w-10 h-10 drop-shadow-[0_0_15px_rgba(242,13,13,0.5)]" />
          <div className="absolute bottom-12 left-0 bg-card border border-border rounded-xl p-3 w-48 opacity-0 group-hover/marker2:opacity-100 transition-all scale-95 group-hover/marker2:scale-100 shadow-2xl z-20 pointer-events-none">
            <p className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Eastside Trauma</p>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground">O- Needed:</span>
                <span className="text-accent font-bold">4 units</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-accent font-bold animate-pulse">EMERGENCY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moving Donor Marker */}
      <div className="absolute top-1/2 left-2/3 flex flex-col items-center">
         <Navigation className="text-blue-400 w-6 h-6 rotate-45 animate-bounce shadow-blue-400 drop-shadow-md" />
         <span className="text-[8px] font-bold text-blue-400 bg-black/60 px-1 py-0.5 rounded mt-1">DONOR TX-44</span>
      </div>

      {/* Map Overlay Controls */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-3">
        <div className="bg-black/80 backdrop-blur-xl p-3 rounded-2xl border border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Radio className="w-3 h-3 text-primary animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Network Nodes</span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[9px] text-white/80 font-bold">Stable</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-[9px] text-white/80 font-bold">Warning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[9px] text-white/80 font-bold">Critical</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 max-w-[180px] shadow-2xl">
        <h4 className="text-[10px] font-bold text-white uppercase mb-3 tracking-tighter">SURROUNDING STATUS (5KM)</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-muted-foreground font-medium">Active Banks:</span>
            <span className="text-white font-bold">04</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-muted-foreground font-medium">On-Call Donors:</span>
            <span className="text-blue-400 font-bold">18</span>
          </div>
          <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[11px]">
            <span className="text-muted-foreground font-medium">Traffic Load:</span>
            <span className="text-green-500 font-bold">Low</span>
          </div>
        </div>
      </div>

      {/* Tech Overlay Borders */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary/40" />
    </Card>
  );
}
