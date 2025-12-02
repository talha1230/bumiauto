"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Column,
  Heading,
  Text,
  Input,
  Button,
  Flex,
  Card,
} from "@once-ui-system/core";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      fillWidth
      fillHeight
      horizontal="center"
      vertical="center"
      paddingY="xl"
      style={{ minHeight: "80vh" }}
    >
      <Card
        padding="xl"
        radius="l"
        border="neutral-alpha-weak"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Column gap="l">
          <Column gap="s" horizontal="center">
            <Heading variant="heading-strong-l">Admin Login</Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Sign in to access the admin dashboard
            </Text>
          </Column>

          <form onSubmit={handleSubmit}>
            <Column gap="m">
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && (
                <Text variant="body-default-s" onBackground="danger-strong">
                  {error}
                </Text>
              )}

              <Button
                type="submit"
                variant="primary"
                size="l"
                fillWidth
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Column>
          </form>
        </Column>
      </Card>
    </Flex>
  );
}
