"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Droplets, Loader2, X, MapPin, Gauge } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { smartMatchEmergencyBlood } from "@/ai/flows/smart-match-emergency-blood";

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await smartMatchEmergencyBlood({
        bloodGroup: 'O-',
        unitsRequired: 2,
        hospitalLocation: { latitude: 40.7128, longitude: -74.006 },
        availableBloodBanks: [
          {
            id: 'bb-1',
            name: 'Metropolis Blood Center',
            location: { latitude: 40.7128, longitude: -74.006 },
            availableUnits: [{ bloodGroup: 'O-', quantity: 5 }]
          }
        ],
        availableDonors: []
      });

      toast({
        title: "EMERGENCY PROTOCOL ACTIVATED",
        description: `Source found: ${result.bestMatch.sourceName}. ETA: ${result.bestMatch.etaMinutes} mins.`,
      });
      setIsOpen(false);
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Matching Failed",
        description: "Could not establish a smart match immediately. Notifying nearby donors.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="group relative w-full h-32 bg-accent rounded-3xl overflow-hidden shadow-2xl shadow-accent/40 transition-all active:scale-95 emergency-pulse hover:brightness-110">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-4 right-4 flex gap-2">
             <div className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold text-white uppercase backdrop-blur-sm">Priority: Level 1</div>
             <div className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold text-white uppercase backdrop-blur-sm">Live Dispatch</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-white p-4">
            <AlertCircle className="w-12 h-12 mb-1" />
            <span className="font-headline font-bold text-3xl tracking-tighter uppercase italic">RAISE EMERGENCY REQUEST</span>
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest">Instant donor matching & automated bank allocation</p>
          </div>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[550px] bg-card border-accent/20 text-white p-0 overflow-hidden rounded-3xl">
        <div className="bg-accent p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-white" />
            <div>
              <DialogTitle className="text-2xl font-headline text-white font-bold leading-none mb-1">
                CRITICAL REQUEST
              </DialogTitle>
              <p className="text-white/80 text-xs uppercase font-bold tracking-widest">Protocol Version 4.0</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleTrigger} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="blood-type" className="text-muted-foreground uppercase font-bold text-[10px] tracking-widest">Blood Group</Label>
              <Select defaultValue="O-">
                <SelectTrigger id="blood-type" className="bg-background border-border h-12 font-headline font-bold">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                    <SelectItem key={type} value={type} className="font-bold">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="units" className="text-muted-foreground uppercase font-bold text-[10px] tracking-widest">Units Needed</Label>
              <div className="relative">
                <Input id="units" type="number" defaultValue="2" min="1" className="bg-background border-border h-12 font-headline font-bold pl-10" />
                <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="hospital" className="text-muted-foreground uppercase font-bold text-[10px] tracking-widest">Hospital Destination</Label>
            <div className="relative">
              <Input id="hospital" placeholder="Searching current location..." defaultValue="St. Mary's Trauma Center" className="bg-background border-border h-12 font-medium pl-10" />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-secondary/50 border border-border flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
               <Gauge className="text-primary w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-white font-bold uppercase tracking-wide">Automatic Smart Dispatch</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                System will ping 18 active donors and 4 blood banks in a 5km radius. Estimated system decision time: <span className="text-white font-bold">1.4s</span>.
              </p>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold text-xl uppercase tracking-tighter rounded-xl transition-all active:scale-95 shadow-xl shadow-accent/20"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                   <Loader2 className="h-6 w-6 animate-spin" />
                   CALCULATING MATCHES...
                </div>
              ) : "INITIATE EMERGENCY DISPATCH"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
