"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/supabase";
import {
  Column,
  Heading,
  Text,
  Input,
  Button,
  Row,
} from "@once-ui-system/core";
import styles from "../../../admin.module.css";

interface EditBlogPostFormProps {
  post: BlogPost;
}

export function EditBlogPostForm({ post }: EditBlogPostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: post.title,
    slug: post.slug,
    summary: post.summary || "",
    content: post.content,
    image_url: post.image_url || "",
    tag: post.tag || "",
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = generateSlug(title);
    setFormData((prev) => ({
      ...prev,
      title,
      slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError(data.error || "Failed to update post");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Column gap="xl" fillWidth style={{ maxWidth: "800px" }}>
      <Column gap="s">
        <Heading variant="display-strong-m">Edit Blog Post</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          Update your blog post
        </Text>
      </Column>

      <form onSubmit={handleSubmit}>
        <Column gap="m">
          <Input
            id="title"
            label="Title"
            value={formData.title}
            onChange={handleTitleChange}
            required
          />

          <Column gap="xs">
            <Text variant="label-default-s">Slug (auto-generated from title)</Text>
            <div className={styles.slugPreview}>
              /blog/{formData.slug || "your-post-slug"}
            </div>
          </Column>

          <Input
            id="summary"
            label="Summary"
            value={formData.summary}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, summary: e.target.value }))
            }
          />

          <Input
            id="image_url"
            label="Featured Image URL"
            value={formData.image_url}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image_url: e.target.value }))
            }
          />

          <Input
            id="tag"
            label="Tag"
            value={formData.tag}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tag: e.target.value }))
            }
          />

          <Column gap="xs">
            <Text variant="label-default-s">Content (HTML supported)</Text>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              required
              rows={15}
              className={styles.formTextareaCode}
              placeholder="Write your blog post content here. HTML tags are supported."
            />
          </Column>

          {error && (
            <Text variant="body-default-s" onBackground="danger-strong">
              {error}
            </Text>
          )}

          <Row gap="m">
            <Button
              type="button"
              variant="secondary"
              size="m"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="m" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Row>
        </Column>
      </form>
    </Column>
  );
}
