"use client";

import { useState, useEffect } from "react";
import { MaintenanceMode } from "./MaintenanceMode";

interface MaintenanceWrapperProps {
  children: React.ReactNode;
  enabled: boolean;
}

export function MaintenanceWrapper({ children, enabled }: MaintenanceWrapperProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has preview access from localStorage
    const previewAccess = localStorage.getItem("preview_access");
    if (previewAccess === "granted") {
      setHasAccess(true);
    }
    setIsLoading(false);
  }, []);

  // Don't render anything until we've checked localStorage
  if (isLoading) {
    return null;
  }

  // If maintenance mode is disabled or user has access, show the site
  if (!enabled || hasAccess) {
    return <>{children}</>;
  }

  // Show maintenance page with access form
  return <MaintenanceMode onAccessGranted={() => setHasAccess(true)} />;
}
