"use client";

import { useState, useEffect } from "react";
import { 
  Column, 
  Flex, 
  Heading, 
  Text, 
  Icon, 
  Input, 
  Button, 
  Background 
} from "@once-ui-system/core";

// Preview access code configuration
const PREVIEW_ACCESS_CODE = "bumiauto2025";
const ACCESS_STORAGE_KEY = "preview_access";

interface MaintenanceModeProps {
  onAccessGranted: () => void;
}

export function MaintenanceMode({ onAccessGranted }: MaintenanceModeProps) {
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  // Optional: Check if they already have access on mount to prevent flicker
  useEffect(() => {
    const hasAccess = localStorage.getItem(ACCESS_STORAGE_KEY);
    if (hasAccess === "granted") {
      onAccessGranted();
    }
  }, [onAccessGranted]);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === PREVIEW_ACCESS_CODE) {
      localStorage.setItem(ACCESS_STORAGE_KEY, "granted");
      onAccessGranted();
    } else {
      setError("Invalid access code");
      // Clear error after 3 seconds so the user isn't staring at their failure forever
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <Flex
      fillWidth
      fillHeight
      direction="column"
      horizontal="center"
      vertical="center"
      background="surface"
      padding="l"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(ellipse at top, var(--color-brand-alpha-weak) 0%, transparent 50%)",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      <Column
        fillWidth
        gap="32"
        padding="40"
        radius="xl"
        border="neutral-alpha-weak"
        background="surface"
        horizontal="center"
        align="center"
        style={{ 
          maxWidth: "480px", 
          position: "relative", 
          zIndex: 1,
          boxShadow: "var(--shadow-l)" // Use system variables, not raw rgba
        }}
      >
        {/* Header Section */}
        <Column gap="16" horizontal="center" align="center">
          <Flex
            padding="16"
            radius="full"
            background="brand-alpha-weak"
            border="brand-alpha-medium"
          >
            <Icon name="tool" size="l" onBackground="brand-medium" />
          </Flex>

          <Column gap="8" horizontal="center">
            <Heading variant="display-strong-s" align="center">
              System Maintenance
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              BumiAuto is currently undergoing scheduled upgrades.
            </Text>
          </Column>
        </Column>

        {/* Status Pill */}
        <Flex
          paddingX="12"
          paddingY="4"
          radius="full"
          border="neutral-alpha-medium"
          background="neutral-alpha-weak"
          gap="8"
          vertical="center"
        >
          <div style={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%', 
            backgroundColor: 'var(--color-warning-medium)' 
          }} />
          <Text variant="body-default-s" onBackground="neutral-medium">
            Estimated return: shortly
          </Text>
        </Flex>

        {/* Admin Access Section - Moved Higher */}
        <Column fillWidth gap="16" style={{ marginTop: "8px" }}>
          {!showAccessForm ? (
            <Column fillWidth gap="8" horizontal="center">
              <Text variant="label-default-s" onBackground="neutral-weak">
                Admin Access
              </Text>
              <Button
                variant="secondary"
                size="m"
                onClick={() => setShowAccessForm(true)}
                fillWidth
                style={{ maxWidth: "240px" }}
              >
                Enter Access Code
              </Button>
            </Column>
          ) : (
            <form onSubmit={handleAccessSubmit} style={{ width: '100%' }}>
              <Column gap="12" fillWidth>
                <Text variant="label-strong-s" onBackground="neutral-medium" align="center">
                  Admin Access
                </Text>
                <Input
                  id="access-code"
                  type="password"
                  value={accessCode}
                  onChange={(e) => {
                    setAccessCode(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter access code"
                  autoFocus
                />
                
                {error && (
                  <Text variant="body-default-xs" onBackground="danger-medium" align="center">
                    {error}
                  </Text>
                )}
                
                <Flex gap="8">
                  <Button type="submit" variant="primary" size="m" fillWidth>
                    Unlock Site
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="m"
                    onClick={() => {
                      setShowAccessForm(false);
                      setAccessCode("");
                      setError("");
                    }}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Column>
            </form>
          )}
        </Column>

        {/* Divider */}
        <div style={{ 
          width: "100%", 
          height: "1px", 
          background: "var(--color-neutral-alpha-weak)" 
        }} />

        {/* Contact Links */}
        <Column fillWidth gap="12">
          <Text variant="label-default-s" onBackground="neutral-weak" align="center">
            Need urgent assistance?
          </Text>
          <Flex gap="12" horizontal="center" wrap>
            <Button 
              href="https://wa.me/60123456789" 
              prefixIcon="whatsapp" 
              variant="tertiary" 
              size="m"
            >
              WhatsApp
            </Button>
            <Button 
              href="mailto:info@bumiauto.com.my" 
              prefixIcon="email" 
              variant="tertiary" 
              size="m"
            >
              Email Support
            </Button>
          </Flex>
        </Column>

      </Column>
    </Flex>
  );
}