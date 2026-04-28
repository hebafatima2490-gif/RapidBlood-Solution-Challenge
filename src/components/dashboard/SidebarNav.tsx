
"use client";

import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  AlertTriangle, 
  Settings, 
  History, 
  Activity,
  Droplets,
  UserCircle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: MapIcon, label: "Live Map", href: "/dashboard/map" },
  { icon: Activity, label: "Analytics", href: "/dashboard/analytics" },
  { icon: History, label: "Log History", href: "/dashboard/history" },
  { icon: UserCircle, label: "User Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "System Config", href: "/dashboard/settings" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Droplets className="text-white w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-white">RAPIDBLOOD</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-medium">Emergency Coordination</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-secondary hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-white")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-accent">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">System Status</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            All nodes operational. Latency 14ms. Emergency protocol active.
          </p>
        </div>
      </div>
    </aside>
  );
}
