"use client";

import { useState } from "react";
import { Column, Flex, Heading, Text, Icon, Input, Button } from "@once-ui-system/core";

// Preview access code - change this to your desired code
const PREVIEW_ACCESS_CODE = "bumiauto2025";

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
      // Store in localStorage so they don't have to enter it again
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
      style={{ minHeight: "100vh" }}
      padding="xl"
    >
      <Column
        maxWidth="m"
        gap="32"
        horizontal="center"
        align="center"
        padding="xl"
      >
        {/* Maintenance Icon */}
        <Flex
          width={96}
          height={96}
          radius="full"
          background="brand-alpha-weak"
          horizontal="center"
          vertical="center"
        >
          <Icon name="tool" size="xl" onBackground="brand-medium" />
        </Flex>

        {/* Main Message */}
        <Heading variant="display-strong-l" align="center">
          We&apos;re Under Maintenance
        </Heading>

        <Text
          variant="heading-default-m"
          onBackground="neutral-weak"
          align="center"
          style={{ maxWidth: "500px" }}
        >
          We&apos;re currently making improvements to serve you better. 
          Please check back soon!
        </Text>

        {/* Estimated Time */}
        <Flex
          paddingX="24"
          paddingY="16"
          radius="l"
          border="neutral-alpha-weak"
          background="surface"
          gap="12"
          vertical="center"
        >
          <Icon name="clock" size="m" onBackground="brand-medium" />
          <Text variant="body-default-m">
            Expected to be back shortly
          </Text>
        </Flex>

        {/* Contact Info */}
        <Column gap="16" horizontal="center" marginTop="16">
          <Text variant="body-default-s" onBackground="neutral-weak">
            Need urgent assistance?
          </Text>
          <Flex gap="24" wrap horizontal="center">
            <Flex gap="8" vertical="center">
              <Icon name="whatsapp" size="s" onBackground="brand-medium" />
              <Text variant="body-default-s">+60 12-345 6789</Text>
            </Flex>
            <Flex gap="8" vertical="center">
              <Icon name="email" size="s" onBackground="brand-medium" />
              <Text variant="body-default-s">info@bumiauto.com.my</Text>
            </Flex>
          </Flex>
        </Column>

        {/* Admin Preview Access */}
        {!showAccessForm ? (
          <Button
            variant="tertiary"
            size="s"
            onClick={() => setShowAccessForm(true)}
            style={{ marginTop: "32px", opacity: 0.6 }}
          >
            Admin Preview Access
          </Button>
        ) : (
          <Column
            gap="16"
            padding="24"
            radius="l"
            border="neutral-alpha-weak"
            background="surface"
            style={{ marginTop: "16px", width: "100%", maxWidth: "320px" }}
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
        <Text
          variant="label-strong-m"
          onBackground="brand-medium"
          marginTop="32"
        >
          BumiAuto
        </Text>
      </Column>
    </Flex>
  );
}
