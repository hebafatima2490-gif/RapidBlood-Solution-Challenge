
"use client";

import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { Activity, TrendingUp, Users, Droplets } from "lucide-react";

const data = [
  { name: 'Mon', units: 400 },
  { name: 'Tue', units: 300 },
  { name: 'Wed', units: 600 },
  { name: 'Thu', units: 800 },
  { name: 'Fri', units: 500 },
  { name: 'Sat', units: 900 },
  { name: 'Sun', units: 1100 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-background mission-control-bg">
      <SidebarNav />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        <header className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/50 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase">
              System <span className="text-accent italic">Analytics</span>
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1 text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Real-time Performance Metrics • Data Sync v2.0
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Droplets} label="TOTAL DISPATCHED" value="1,284" sub="Units this month" color="text-accent" />
          <StatCard icon={TrendingUp} label="AVG RESPONSE" value="4.2m" sub="Across all sectors" color="text-primary" />
          <StatCard icon={Users} label="NEW DONORS" value="+128" sub="In the last 7 days" color="text-green-500" />
          <StatCard icon={Activity} label="SYSTEM LOAD" value="14%" sub="Optimal performance" color="text-blue-400" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="p-6 bg-card/40 border-border">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">Blood Demand Forecast</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="name" stroke="#666" fontSize={10} />
                  <YAxis stroke="#666" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                    itemStyle={{ color: '#8884d8' }}
                  />
                  <Area type="monotone" dataKey="units" stroke="#8884d8" fillOpacity={1} fill="url(#colorUnits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 bg-card/40 border-border">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">Stock Level Integrity</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="name" stroke="#666" fontSize={10} />
                  <YAxis stroke="#666" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  />
                  <Bar dataKey="units" fill="#334a99" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }: any) {
  return (
    <Card className="p-6 bg-card/40 border-border">
      <div className="flex items-center gap-3 mb-4">
        <Icon className={color + " w-5 h-5"} />
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</h3>
      </div>
      <p className="text-3xl font-headline font-bold text-white">{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase mt-1">{sub}</p>
    </Card>
  );
}
