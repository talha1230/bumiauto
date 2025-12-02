"use client";

import { useState } from "react";
import type { BlogComment } from "@/lib/supabase";
import {
  Column,
  Heading,
  Text,
  Input,
  Button,
  Row,
  Card,
} from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";

interface CommentSectionProps {
  postId: string;
  comments: BlogComment[];
}

export function CommentSection({ postId, comments }: CommentSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`/api/blog/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", content: "" });
      } else {
        setError(data.error || "Failed to submit comment");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Column gap="l" fillWidth marginTop="40">
      <Heading variant="heading-strong-l">Comments</Heading>

      {/* Existing Comments */}
      {comments.length > 0 ? (
        <Column gap="m">
          {comments.map((comment) => (
            <Card key={comment.id} padding="m" radius="m" border="neutral-alpha-weak">
              <Column gap="xs">
                <Row gap="s" vertical="center">
                  <Text variant="label-strong-s">{comment.name}</Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {formatDate(comment.created_at)}
                  </Text>
                </Row>
                <Text variant="body-default-m">{comment.content}</Text>
              </Column>
            </Card>
          ))}
        </Column>
      ) : (
        <Text variant="body-default-m" onBackground="neutral-weak">
          No comments yet. Be the first to comment!
        </Text>
      )}

      {/* Comment Form */}
      <Card padding="l" radius="l" border="neutral-alpha-weak">
        <form onSubmit={handleSubmit}>
          <Column gap="m">
            <Heading variant="heading-strong-m">Leave a Comment</Heading>

            <Row gap="m" wrap>
              <Input
                id="name"
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                style={{ flex: 1, minWidth: "200px" }}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                style={{ flex: 1, minWidth: "200px" }}
              />
            </Row>

            <Column gap="xs">
              <Text variant="label-default-s">Comment</Text>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                required
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid var(--neutral-alpha-weak)",
                  background: "var(--surface-background)",
                  color: "var(--neutral-on-background-strong)",
                  fontSize: "14px",
                  resize: "vertical",
                }}
                placeholder="Write your comment here..."
              />
            </Column>

            {error && (
              <Text variant="body-default-s" onBackground="danger-strong">
                {error}
              </Text>
            )}

            {success && (
              <Text variant="body-default-s" onBackground="success-strong">
                Your comment has been submitted and is awaiting moderation.
              </Text>
            )}

            <Button type="submit" variant="primary" size="m" disabled={loading}>
              {loading ? "Submitting..." : "Submit Comment"}
            </Button>
          </Column>
        </form>
      </Card>
    </Column>
  );
}
