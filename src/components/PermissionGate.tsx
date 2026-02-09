"use client";

import { ReactNode } from "react";
import { useAuth } from "@/providers/AuthProvider";

interface PermissionGateProps {
  children: ReactNode;
  permissions: string | string[];
  fallback?: ReactNode;
}

export const PermissionGate = ({
  children,
  permissions,
  fallback = null,
}: PermissionGateProps) => {
  const { permissions: userPermissions } = useAuth();

  const hasPermission = () => {
    if (userPermissions) return false;

    const requiredPermissions = Array.isArray(permissions)
      ? permissions
      : [permissions];

    return requiredPermissions.every((permission) =>
      (userPermissions as string[]).includes(permission)
    );
  };

  if (!hasPermission()) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
