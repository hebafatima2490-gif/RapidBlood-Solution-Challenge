
"use client";

import { useState } from "react";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings, ShieldAlert, Cpu, Bell, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_SETTINGS = {
  automatedDispatch: true,
  predictiveAnalysis: true,
  searchRadius: "15",
  donorTimeout: "5",
  emergencySms: true,
  hospitalInterlink: true,
};

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const handleSave = () => {
    // In a real app, this would persist to a database or localStorage
    toast({
      title: "Configuration Saved",
      description: "Global system parameters have been successfully updated.",
    });
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    toast({
      title: "Settings Reset",
      description: "All parameters have been restored to factory defaults.",
    });
  };

  const updateSetting = (key: keyof typeof DEFAULT_SETTINGS, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex min-h-screen bg-background mission-control-bg">
      <SidebarNav />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        <header className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/50 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase">
              System <span className="text-accent italic">Config</span>
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1 text-sm">
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
              Global Parameters • Firmware v4.0.2
            </p>
          </div>
        </header>

        <div className="max-w-4xl space-y-6">
          <Card className="p-8 bg-card/40 border-border">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
              <Cpu className="text-primary w-6 h-6" />
              <h3 className="text-lg font-headline font-bold text-white uppercase">AI Matching Engine</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Automated Dispatch</Label>
                  <p className="text-xs text-muted-foreground">Allow AI to initiate dispatch protocols based on inventory levels.</p>
                </div>
                <Switch 
                  checked={settings.automatedDispatch} 
                  onCheckedChange={(checked) => updateSetting("automatedDispatch", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Predictive Analysis</Label>
                  <p className="text-xs text-muted-foreground">Run background simulations to anticipate stock shortages.</p>
                </div>
                <Switch 
                  checked={settings.predictiveAnalysis} 
                  onCheckedChange={(checked) => updateSetting("predictiveAnalysis", checked)}
                />
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Search Radius (km)</Label>
                  <Input 
                    type="number" 
                    value={settings.searchRadius} 
                    onChange={(e) => updateSetting("searchRadius", e.target.value)}
                    className="bg-background/50 border-border" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Donor Timeout (min)</Label>
                  <Input 
                    type="number" 
                    value={settings.donorTimeout} 
                    onChange={(e) => updateSetting("donorTimeout", e.target.value)}
                    className="bg-background/50 border-border" 
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card/40 border-border">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
              <Bell className="text-accent w-6 h-6" />
              <h3 className="text-lg font-headline font-bold text-white uppercase">Communication Protocols</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Emergency SMS Alerts</Label>
                  <p className="text-xs text-muted-foreground">Push notifications to on-call donors during trauma alerts.</p>
                </div>
                <Switch 
                  checked={settings.emergencySms} 
                  onCheckedChange={(checked) => updateSetting("emergencySms", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Hospital Interlink</Label>
                  <p className="text-xs text-muted-foreground">Real-time inventory sharing with regional trauma centers.</p>
                </div>
                <Switch 
                  checked={settings.hospitalInterlink} 
                  onCheckedChange={(checked) => updateSetting("hospitalInterlink", checked)}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button 
              variant="ghost" 
              onClick={handleReset}
              className="text-white font-bold uppercase text-xs"
            >
              Reset to Factory
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 text-white font-bold uppercase px-8"
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
