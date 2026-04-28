
"use client";

import { useState, useEffect } from "react";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Phone, MapPin, Mail, Shield, Loader2, Save } from "lucide-react";
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking, setDocumentNonBlocking } from "@/firebase";
import { doc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, "users", user.uid);
  }, [db, user?.uid]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(userDocRef);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
    role: "User",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        phoneNumber: profile.phoneNumber || "",
        address: profile.address || "",
        email: profile.email || user?.email || "",
        role: profile.role || "User",
      });
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || "",
      }));
    }
  }, [profile, user]);

  const handleSave = () => {
    if (!userDocRef || !user) return;

    const profileData = {
      ...formData,
      id: user.uid,
      updatedAt: serverTimestamp(),
    };

    if (profile) {
      updateDocumentNonBlocking(userDocRef, profileData);
    } else {
      setDocumentNonBlocking(userDocRef, {
        ...profileData,
        createdAt: serverTimestamp(),
      }, { merge: true });
    }

    toast({
      title: "Profile Updated",
      description: "Your information has been successfully saved to the secure grid.",
    });
  };

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background mission-control-bg">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background mission-control-bg">
      <SidebarNav />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        <header className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/50 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase">
              User <span className="text-accent italic">Profile</span>
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1 text-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Identity Verification • Sector 7-G Node
            </p>
          </div>
        </header>

        <div className="max-w-3xl space-y-6">
          <Card className="p-8 bg-card/40 border-border">
            <div className="flex items-center gap-6 mb-10 pb-6 border-b border-border">
              <div className="w-24 h-24 rounded-2xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-headline font-bold text-white uppercase">{formData.fullName || "New Operator"}</h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  Access Level: {formData.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Full Name</Label>
                <div className="relative">
                  <Input 
                    value={formData.fullName} 
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="bg-background/50 border-border pl-10" 
                    placeholder="Enter full name"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Contact Email</Label>
                <div className="relative">
                  <Input 
                    value={formData.email} 
                    disabled
                    className="bg-background/20 border-border pl-10 opacity-60" 
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Phone Number</Label>
                <div className="relative">
                  <Input 
                    value={formData.phoneNumber} 
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="bg-background/50 border-border pl-10" 
                    placeholder="+1 (555) 000-0000"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Grid Address</Label>
                <div className="relative">
                  <Input 
                    value={formData.address} 
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="bg-background/50 border-border pl-10" 
                    placeholder="Metropolis, Sector 4"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <Button 
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-white font-bold uppercase px-8 h-12 rounded-xl transition-all active:scale-95 shadow-lg shadow-primary/20"
              >
                <Save className="w-4 h-4 mr-2" />
                Commit Changes
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-secondary/20 border-border border-dashed">
            <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4 tracking-widest">Security Credentials</h3>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              Your profile data is encrypted and stored according to RAPIDBLOOD protocol v2.04. Location sharing is only active during emergency response phases.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
