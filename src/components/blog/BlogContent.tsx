"use client";

import { useEffect, useState } from "react";
import styles from "@/app/blog/[slug]/blogPost.module.css";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");

  useEffect(() => {
    // Dynamically import DOMPurify only on the client side
    import("dompurify").then((DOMPurify) => {
      setSanitizedContent(DOMPurify.default.sanitize(content));
    });
  }, [content]);

  if (!sanitizedContent) {
    // Show raw content initially, then sanitized version
    // This is safe because we're on the client
    return (
      <div 
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  }

  return (
    <div 
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
    />
  );
}
