"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Row, Button, SmartLink } from "@once-ui-system/core";

interface BlogPostActionsProps {
  id: string;
  slug: string;
  published: boolean;
}

export function BlogPostActions({ id, slug, published }: BlogPostActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleTogglePublish = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: !published,
          published_at: !published ? new Date().toISOString() : null,
        }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row gap="s" vertical="center">
      <SmartLink href={`/blog/${slug}`} target="_blank">
        <Button variant="tertiary" size="s" disabled={!published}>
          View
        </Button>
      </SmartLink>
      <SmartLink href={`/admin/blog/edit/${id}`}>
        <Button variant="secondary" size="s">
          Edit
        </Button>
      </SmartLink>
      <Button
        variant={published ? "secondary" : "primary"}
        size="s"
        onClick={handleTogglePublish}
        disabled={loading}
      >
        {published ? "Unpublish" : "Publish"}
      </Button>
      <Button
        variant="danger"
        size="s"
        onClick={handleDelete}
        disabled={loading}
      >
        Delete
      </Button>
    </Row>
  );
}
