"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Row, Button, Select } from "@once-ui-system/core";

interface InquiryActionsProps {
  id: string;
  type: "contact" | "loan";
  currentStatus: string;
}

const contactStatuses = ["new", "read", "responded", "archived"];
const loanStatuses = ["pending", "contacted", "approved", "rejected", "completed"];

export function InquiryActions({ id, type, currentStatus }: InquiryActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const statuses = type === "contact" ? contactStatuses : loanStatuses;

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/inquiries/${type}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setStatus(newStatus);
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row gap="s" vertical="center">
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={loading}
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid var(--neutral-alpha-weak)",
          background: "var(--surface-background)",
          color: "var(--neutral-on-background-strong)",
          cursor: loading ? "wait" : "pointer",
        }}
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
    </Row>
  );
}
