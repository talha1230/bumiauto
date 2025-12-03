"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../admin.module.css";

interface CommentActionsProps {
  commentId: string;
  isApproved: boolean;
}

export function CommentActions({ commentId, isApproved }: CommentActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleApprove = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "approve" }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to approve comment");
      }
    } catch (error) {
      console.error("Error approving comment:", error);
      alert("Failed to approve comment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (isLoading) return;
    
    const confirmed = window.confirm(
      "Are you sure you want to reject and delete this comment? This action cannot be undone."
    );
    
    if (!confirmed) return;
    
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnapprove = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "unapprove" }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to unapprove comment");
      }
    } catch (error) {
      console.error("Error unapproving comment:", error);
      alert("Failed to unapprove comment");
    } finally {
      setIsLoading(false);
    }
  };

  if (isApproved) {
    return (
      <>
        <button
          type="button"
          onClick={handleUnapprove}
          disabled={isLoading}
          className={`${styles.button} ${styles.buttonSecondary} ${styles.buttonSmall}`}
        >
          {isLoading ? "..." : "↩️ Unapprove"}
        </button>
        <button
          type="button"
          onClick={handleReject}
          disabled={isLoading}
          className={`${styles.button} ${styles.buttonDanger} ${styles.buttonSmall}`}
        >
          {isLoading ? "..." : "🗑️ Delete"}
        </button>
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleApprove}
        disabled={isLoading}
        className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonSmall}`}
      >
        {isLoading ? "..." : "✅ Approve"}
      </button>
      <button
        type="button"
        onClick={handleReject}
        disabled={isLoading}
        className={`${styles.button} ${styles.buttonDanger} ${styles.buttonSmall}`}
      >
        {isLoading ? "..." : "❌ Reject"}
      </button>
    </>
  );
}
