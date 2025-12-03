"use client";

import { useState } from "react";
import { Button, Text, Row } from "@once-ui-system/core";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (hasLiked || loading) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/blog/${postId}/like`, {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setLikes(data.likes_count);
        setHasLiked(true);
      } else if (response.status === 409) {
        // Already liked
        setHasLiked(true);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row gap="s" vertical="center">
      <Button
        variant={hasLiked ? "secondary" : "primary"}
        size="s"
        onClick={handleLike}
        disabled={hasLiked || loading}
      >
        {hasLiked ? "❤️ Liked" : "🤍 Like"}
      </Button>
      <Text variant="body-default-s" onBackground="neutral-weak">
        {likes} {likes === 1 ? "like" : "likes"}
      </Text>
    </Row>
  );
}
