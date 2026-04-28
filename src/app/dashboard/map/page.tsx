
"use client";

import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { LiveMap } from "@/components/map/LiveMap";
import { Card } from "@/components/ui/card";
import { Map as MapIcon, ShieldCheck, Radio } from "lucide-react";

export default function MapPage() {
  return (
    <div className="flex min-h-screen bg-background mission-control-bg">
      <SidebarNav />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        <header className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/50 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase">
              Geospatial <span className="text-accent italic">Intelligence</span>
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Network Visualization • Grid Sector 7-G
            </p>
          </div>
        </header>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <LiveMap />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/40 border-border">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Active Assets</h3>
              </div>
              <p className="text-2xl font-headline font-bold text-white">24</p>
              <p className="text-[10px] text-muted-foreground uppercase mt-1">Verified mobile units in range</p>
            </Card>
            
            <Card className="p-6 bg-card/40 border-border">
              <div className="flex items-center gap-3 mb-4">
                <Radio className="w-5 h-5 text-accent" />
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Signal Strength</h3>
              </div>
              <p className="text-2xl font-headline font-bold text-white">99.8%</p>
              <p className="text-[10px] text-muted-foreground uppercase mt-1">Mesh network reliability</p>
            </Card>

            <Card className="p-6 bg-card/40 border-border">
              <div className="flex items-center gap-3 mb-4">
                <MapIcon className="w-5 h-5 text-blue-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Sector Coverage</h3>
              </div>
              <p className="text-2xl font-headline font-bold text-white">100%</p>
              <p className="text-[10px] text-muted-foreground uppercase mt-1">Metropolis metropolitan area</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
