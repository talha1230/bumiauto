"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "2rem",
        borderRadius: "12px",
        border: "1px solid var(--neutral-alpha-weak, #333)",
        background: "var(--surface-background, #111)"
      }}>
        <h1 style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "0.5rem",
          color: "var(--neutral-on-background-strong, #fff)"
        }}>
          Admin Login
        </h1>
        <p style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "var(--neutral-on-background-weak, #888)"
        }}>
          Sign in to access the admin dashboard
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: "var(--neutral-on-background-strong, #fff)"
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--neutral-alpha-weak, #333)",
                background: "var(--surface-background, #000)",
                color: "var(--neutral-on-background-strong, #fff)",
                fontSize: "1rem"
              }}
              placeholder="admin@bumiauto.com"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: "var(--neutral-on-background-strong, #fff)"
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--neutral-alpha-weak, #333)",
                background: "var(--surface-background, #000)",
                color: "var(--neutral-on-background-strong, #fff)",
                fontSize: "1rem"
              }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p style={{
              color: "#ef4444",
              fontSize: "0.875rem",
              marginBottom: "1rem"
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "8px",
              border: "none",
              background: loading ? "#666" : "#22c55e",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{
          marginTop: "1.5rem",
          textAlign: "center",
          fontSize: "0.75rem",
          color: "var(--neutral-on-background-weak, #666)"
        }}>
          Demo: admin@bumiauto.com / bumiauto0123
        </p>
      </div>
    </div>
  );
}
