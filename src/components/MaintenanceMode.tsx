"use client";

import { useState } from "react";
import { Column, Flex, Heading, Text, Icon, Input, Button } from "@once-ui-system/core";

// Preview access code - change this to your desired code
const PREVIEW_ACCESS_CODE = "demo2025";

interface MaintenanceModeProps {
  onAccessGranted: () => void;
}

export function MaintenanceMode({ onAccessGranted }: MaintenanceModeProps) {
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === PREVIEW_ACCESS_CODE) {
      localStorage.setItem("preview_access", "granted");
      onAccessGranted();
    } else {
      setError("Invalid access code");
    }
  };

  return (
    <Flex
      fillWidth
      direction="column"
      horizontal="center"
      vertical="center"
      padding="l"
      style={{ 
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "min(500px, 80vw)",
          height: "min(500px, 80vw)",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-brand-alpha-weak) 0%, transparent 70%)",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "min(400px, 60vw)",
          height: "min(400px, 60vw)",
          borderRadius: "50%",
          background: "linear-gradient(315deg, var(--color-brand-alpha-weak) 0%, transparent 70%)",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <Column
        gap="24"
        horizontal="center"
        align="center"
        padding="l"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "480px",
        }}
      >
        {/* Animated Icon */}
        <Flex
          width={80}
          height={80}
          radius="l"
          background="brand-alpha-weak"
          horizontal="center"
          vertical="center"
          style={{
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          <Icon name="tool" size="l" onBackground="brand-medium" />
        </Flex>

        {/* Main Message */}
        <Column gap="12" horizontal="center">
          <Heading 
            variant="display-strong-m" 
            align="center"
            style={{ 
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              lineHeight: 1.2,
            }}
          >
            We&apos;re Under Maintenance
          </Heading>

          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
            style={{ 
              maxWidth: "380px",
              fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
            }}
          >
            We&apos;re currently making improvements to serve you better. 
            Please check back soon!
          </Text>
        </Column>

        {/* Status Badge */}
        <Flex
          paddingX="20"
          paddingY="12"
          radius="full"
          background="surface"
          border="neutral-alpha-weak"
          gap="8"
          vertical="center"
          style={{
            backdropFilter: "blur(8px)",
          }}
        >
          <Flex
            width={8}
            height={8}
            radius="full"
            style={{
              backgroundColor: "var(--color-brand-medium)",
              animation: "blink 1.5s ease-in-out infinite",
            }}
          />
          <Text variant="body-default-s">
            Expected to be back shortly
          </Text>
        </Flex>

        {/* Contact Info */}
        <Column 
          gap="16" 
          horizontal="center" 
          marginTop="8"
          padding="20"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
          fillWidth
          style={{
            backdropFilter: "blur(8px)",
          }}
        >
          <Text variant="label-default-s" onBackground="neutral-weak">
            Need urgent assistance?
          </Text>
          <Column gap="12" horizontal="center" fillWidth>
            <a 
              href="https://wa.me/60123456789" 
              style={{ textDecoration: "none", width: "100%" }}
            >
              <Flex 
                gap="8" 
                vertical="center" 
                horizontal="center"
                paddingY="8"
                paddingX="16"
                radius="m"
                fillWidth
                style={{
                  transition: "background 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <Icon name="whatsapp" size="s" onBackground="brand-medium" />
                <Text variant="body-default-s">+60 12-345 6789</Text>
              </Flex>
            </a>
            <a 
              href="mailto:info@bumiauto.com.my" 
              style={{ textDecoration: "none", width: "100%" }}
            >
              <Flex 
                gap="8" 
                vertical="center" 
                horizontal="center"
                paddingY="8"
                paddingX="16"
                radius="m"
                fillWidth
                style={{
                  transition: "background 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <Icon name="email" size="s" onBackground="brand-medium" />
                <Text variant="body-default-s">info@bumiauto.com.my</Text>
              </Flex>
            </a>
          </Column>
        </Column>

        {/* Admin Preview Access */}
        {!showAccessForm ? (
          <Button
            variant="tertiary"
            size="s"
            onClick={() => setShowAccessForm(true)}
            style={{ 
              marginTop: "16px", 
              opacity: 0.5,
              fontSize: "0.75rem",
            }}
          >
            Admin Preview Access
          </Button>
        ) : (
          <Column
            gap="16"
            padding="20"
            radius="l"
            border="neutral-alpha-weak"
            background="surface"
            fillWidth
            style={{ 
              marginTop: "8px",
              backdropFilter: "blur(8px)",
            }}
          >
            <Text variant="label-strong-s" onBackground="neutral-weak">
              Enter Preview Access Code
            </Text>
            <form onSubmit={handleAccessSubmit}>
              <Column gap="12">
                <Input
                  id="access-code"
                  type="password"
                  value={accessCode}
                  onChange={(e) => {
                    setAccessCode(e.target.value);
                    setError("");
                  }}
                  placeholder="Access code"
                />
                {error && (
                  <Text variant="body-default-xs" style={{ color: "var(--color-danger-medium)" }}>
                    {error}
                  </Text>
                )}
                <Flex gap="8">
                  <Button type="submit" variant="primary" size="s" fillWidth>
                    Access Site
                  </Button>
                  <Button
                    type="button"
                    variant="tertiary"
                    size="s"
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
          </Column>
        )}

        {/* Brand */}
        <Flex gap="8" vertical="center" marginTop="24">
          <Text
            variant="heading-strong-m"
            onBackground="brand-medium"
          >
            BumiAuto
          </Text>
        </Flex>
      </Column>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </Flex>
  );
}
