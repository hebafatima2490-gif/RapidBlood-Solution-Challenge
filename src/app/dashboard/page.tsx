"use client";

import { useState } from "react";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";
import { HospitalDashboard } from "@/components/dashboard/HospitalDashboard";
import { BankDashboard } from "@/components/dashboard/BankDashboard";
import { DonorDashboard } from "@/components/dashboard/DonorDashboard";
import { Droplets, Activity, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "hospital" | "bank" | "donor";

export default function Dashboard() {
  const [role, setRole] = useState<Role>("hospital");

  return (
    <div className="flex min-h-screen bg-background mission-control-bg">
      <SidebarNav />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        <header className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/50 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase">
              {role === 'hospital' ? 'Hospital Command' : role === 'bank' ? 'Inventory Control' : 'Donor Portal'}
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              RapidBlood Dispatch v2.04 • Live Connection Established
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <RoleSwitcher currentRole={role} onRoleChange={setRole} />
            <div className="flex gap-2">
               <StatMini icon={Droplets} label="O- UNITS" value="08" color="text-accent" />
               <StatMini icon={Activity} label="ACTIVE REQ" value="14" color="text-primary" />
               <StatMini icon={Users} label="ON-CALL" value="128" color="text-white" />
            </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {role === "hospital" && <HospitalDashboard />}
          {role === "bank" && <BankDashboard />}
          {role === "donor" && <DonorDashboard />}
        </div>
      </main>
    </div>
  );
}

function StatMini({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-card/50 border border-border px-4 py-2 rounded-xl backdrop-blur-md min-w-[100px]">
      <div className="flex items-center gap-2 mb-1">
        <Icon className={cn("w-3 h-3", color)} />
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-xl font-headline font-bold text-white">{value}</p>
    </div>
  );
}
