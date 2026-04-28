"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { predictiveBloodStockAlerts, PredictiveBloodStockAlertsOutput } from "@/ai/flows/predictive-blood-stock-alerts";

export function PredictiveAlerts() {
  const [alerts, setAlerts] = useState<PredictiveBloodStockAlertsOutput[]>([]);

  useEffect(() => {
    // Simulate AI analysis on load
    const runAnalysis = async () => {
      try {
        const result = await predictiveBloodStockAlerts({
          bloodType: 'O-',
          location: 'Metropolis',
          historicalDataSummary: 'Decreasing donations in winter, high traffic accidents on weekends.',
          currentTrendsSummary: 'Impending snowstorm predicted to reduce foot traffic at donor centers.'
        });
        setAlerts([result]);
      } catch (e) {
        // Fallback static mock
        setAlerts([{
          prediction: "O- stock likely to run out in 2 days",
          severity: "High",
          recommendedAction: "Increase targeted donor drives immediately"
        }]);
      }
    };
    runAnalysis();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2 px-1">
        <BrainCircuit className="w-5 h-5 text-primary" />
        <h3 className="font-headline text-sm font-bold text-white uppercase tracking-widest">Predictive Insights</h3>
      </div>
      
      {alerts.map((alert, idx) => (
        <Card key={idx} className="p-4 bg-primary/5 border-primary/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-primary translate-x-1 translate-y-[-1]" />
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <Badge variant="destructive" className="bg-primary/30 text-primary border-primary/40 text-[9px] uppercase">
                  {alert.severity} Risk
                </Badge>
              </div>
              <p className="text-sm font-medium text-white leading-snug">
                {alert.prediction}
              </p>
              <div className="pt-2 border-t border-primary/10">
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Recommended Action</p>
                <p className="text-xs text-white/70 italic">
                  &quot;{alert.recommendedAction}&quot;
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Card className="p-4 bg-secondary/30 border-border border-dashed flex items-center justify-center py-8">
        <div className="text-center space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Scanning for surges</p>
          <div className="flex gap-1 justify-center">
            {[1,2,3].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}