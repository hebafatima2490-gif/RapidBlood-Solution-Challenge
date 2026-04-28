
"use client";

import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const logs = [
  { id: "LOG-8821", date: "2024-03-01 14:22", event: "Emergency Dispatch", source: "Metropolis Bank", dest: "St. Mary's", status: "SUCCESS" },
  { id: "LOG-8820", date: "2024-03-01 12:05", event: "Stock Update", source: "Eastside Med", dest: "Inventory", status: "VERIFIED" },
  { id: "LOG-8819", date: "2024-03-01 09:44", event: "Donor Activation", source: "System AI", dest: "Donor DX-44", status: "SUCCESS" },
  { id: "LOG-8818", date: "2024-02-29 23:12", event: "Emergency Dispatch", source: "Metro Health", dest: "General Hosp", status: "SUCCESS" },
  { id: "LOG-8817", date: "2024-02-29 20:15", event: "Audit Check", source: "Admin", dest: "System Logs", status: "COMPLETED" },
  { id: "LOG-8816", date: "2024-02-29 18:30", event: "Request Denied", source: "Metropolis Bank", dest: "Eastside Med", status: "FAILED" },
];

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen bg-background mission-control-bg">
      <SidebarNav />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        <header className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/50 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase">
              Mission <span className="text-accent italic">Logs</span>
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1 text-sm">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              Cryptographically Verified Activity Audit
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-border bg-card/40 text-xs font-bold uppercase">
              <Download className="w-4 h-4 mr-2" /> Export JSON
            </Button>
          </div>
        </header>

        <Card className="bg-card/40 border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-secondary/10 flex items-center gap-4">
             <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Filter logs..." className="pl-10 bg-background/50 border-border h-9 text-xs" />
             </div>
             <Badge className="bg-primary/20 text-primary border-primary/30">ALL EVENTS</Badge>
          </div>
          
          <Table>
            <TableHeader className="bg-secondary/20">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Log ID</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Timestamp</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Event Type</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Source</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Destination</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="border-border hover:bg-white/5 transition-colors">
                  <TableCell className="font-code text-xs text-white/80">{log.id}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{log.date}</TableCell>
                  <TableCell className="text-xs font-bold text-white">{log.event}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{log.source}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{log.dest}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={
                      log.status === 'SUCCESS' || log.status === 'VERIFIED' || log.status === 'COMPLETED' 
                      ? "bg-green-500/20 text-green-500 border-green-500/30 text-[9px]" 
                      : "bg-accent/20 text-accent border-accent/30 text-[9px]"
                    }>
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}
