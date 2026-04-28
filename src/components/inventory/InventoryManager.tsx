"use client";

import { Card } from "@/components/ui/card";
import { BloodStock, MOCK_BLOOD_BANKS } from "@/lib/mock-data";
import { Droplets, Plus, Minus, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function InventoryManager() {
  const [stock, setStock] = useState<BloodStock[]>(MOCK_BLOOD_BANKS[0].stock);

  const updateUnits = (type: string, delta: number) => {
    setStock(prev => prev.map(item => {
      if (item.type === type) {
        const newUnits = Math.max(0, item.units + delta);
        return {
          ...item,
          units: newUnits,
          status: newUnits < 5 ? 'Critical' : newUnits < 15 ? 'Low' : 'Available'
        };
      }
      return item;
    }));
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline font-bold text-white flex items-center gap-2">
          <Droplets className="text-primary" />
          INVENTORY MANAGEMENT
        </h3>
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest bg-secondary/50 px-2 py-1 rounded">
          Last Sync: Just now
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stock.map((item) => (
          <div key={item.type} className="p-4 rounded-xl bg-secondary/20 border border-border group hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-2xl font-headline font-bold text-white">{item.type}</p>
                <p className={cn(
                  "text-[9px] font-bold uppercase",
                  item.status === 'Critical' ? "text-accent" :
                  item.status === 'Low' ? "text-yellow-500" :
                  "text-green-500"
                )}>
                  {item.status}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateUnits(item.type, -1)}
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-12 text-center text-xl font-bold font-headline">{item.units}</div>
                <button 
                  onClick={() => updateUnits(item.type, 1)}
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500",
                  item.status === 'Critical' ? "bg-accent" :
                  item.status === 'Low' ? "bg-yellow-500" :
                  "bg-green-500"
                )}
                style={{ width: `${Math.min(100, (item.units / 50) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {stock.some(s => s.status === 'Critical') && (
        <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-center gap-3">
          <AlertTriangle className="text-accent w-6 h-6 animate-pulse" />
          <p className="text-xs text-accent font-medium leading-relaxed">
            CRITICAL STOCK DETECTED: Automated AI alerts have been dispatched to nearby donors for O- Negative units.
          </p>
        </div>
      )}
    </Card>
  );
}
