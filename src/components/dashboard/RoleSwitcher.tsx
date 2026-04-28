"use client";

import { cn } from "@/lib/utils";
import { Hospital, Building2, User } from "lucide-react";

type Role = "hospital" | "bank" | "donor";

interface RoleSwitcherProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  const roles: { id: Role; label: string; icon: any }[] = [
    { id: "hospital", label: "Hospital", icon: Hospital },
    { id: "bank", label: "Blood Bank", icon: Building2 },
    { id: "donor", label: "Donor", icon: User },
  ];

  return (
    <div className="flex bg-secondary/30 p-1 rounded-xl border border-border">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onRoleChange(role.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider",
            currentRole === role.id
              ? "bg-primary text-white shadow-lg"
              : "text-muted-foreground hover:text-white"
          )}
        >
          <role.icon className="w-4 h-4" />
          {role.label}
        </button>
      ))}
    </div>
  );
}
