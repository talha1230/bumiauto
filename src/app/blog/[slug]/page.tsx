import { notFound } from "next/navigation";
import { ScrollToHash } from "@/components";
import {
  Meta,
  Schema,
  Column,
  Heading,
  HeadingNav,
  Icon,
  Row,
  Text,
  SmartLink,
  Avatar,
  Media,
  Flex,
  Tag,
} from "@once-ui-system/core";

// Force dynamic rendering since we use cookies for Supabase
export const dynamic = 'force-dynamic';
import { baseURL, about, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { createAdminSupabaseClient } from "@/lib/supabase";
import type { BlogPost, BlogComment } from "@/lib/supabase";
import type { Metadata } from "next";
import React from "react";
import { LikeButton } from "@/components/blog/LikeButton";
import { CommentSection } from "@/components/blog/CommentSection";
import { BlogContent } from "@/components/blog/BlogContent";
import styles from "./blogPost.module.css";

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createAdminSupabaseClient();

    const { data: post } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    return post as BlogPost | null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function getApprovedComments(postId: string): Promise<BlogComment[]> {
  try {
    const supabase = await createAdminSupabaseClient();

    const { data: comments } = await supabase
      .from("blog_comments")
      .select("*")
      .eq("post_id", postId)
      .eq("approved", true)
      .order("created_at", { ascending: true });

    return (comments || []) as BlogComment[];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

async function incrementViewCount(postId: string) {
  try {
    const supabase = await createAdminSupabaseClient();

    // Try to use the RPC function
    const { error: rpcError } = await supabase.rpc("increment_view_count", { post_id: postId });
    
    if (rpcError) {
      // If RPC fails, log warning (function might not exist yet)
      console.warn("Could not increment view count:", rpcError.message);
    }
  } catch (error) {
    // Silently fail - view count is not critical
    console.error("Error incrementing view count:", error);
  }
}

async function getRecentPosts(excludeSlug: string): Promise<BlogPost[]> {
  try {
    const supabase = await createAdminSupabaseClient();

    const { data: posts } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .neq("slug", excludeSlug)
      .order("published_at", { ascending: false })
      .limit(2);

    return (posts || []) as BlogPost[];
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = await getBlogPost(slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.title,
    description: post.summary || "",
    baseURL: baseURL,
    image: post.image_url || `/api/og/generate?title=${post.title}`,
    path: `${blog.path}/${post.slug}`,
  });
}

export default async function Blog({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = await getBlogPost(slugPath);

  if (!post) {
    notFound();
  }

  // Increment view count
  await incrementViewCount(post.id);

  const comments = await getApprovedComments(post.id);
  const recentPosts = await getRecentPosts(post.slug);

  return (
    <Flex fillWidth direction="column" horizontal="center">
      <div className={styles.container}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${blog.path}/${post.slug}`}
            title={post.title}
            description={post.summary || ""}
            datePublished={post.published_at || post.created_at}
            dateModified={post.updated_at}
            image={
              post.image_url ||
              `/api/og/generate?title=${encodeURIComponent(post.title)}`
            }
            author={{
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            }}
          />

          {/* Header */}
          <div className={styles.header}>
            <SmartLink href="/blog" className={styles.backLink}>
              <Icon name="arrowLeft" size="s" />
              <Text variant="label-strong-s">Back to Blog</Text>
            </SmartLink>

            {post.tag && (
              <Tag variant="brand" size="m" label={post.tag} style={{ marginBottom: "16px" }} />
            )}

            <Heading variant="display-strong-l" style={{ marginBottom: "16px" }}>
              {post.title}
            </Heading>

            {post.summary && (
              <Text variant="body-default-l" onBackground="neutral-weak" style={{ marginBottom: "24px" }}>
                {post.summary}
              </Text>
            )}

            <div className={styles.meta}>
              <div className={styles.author}>
                <Avatar size="s" src={person.avatar} />
                <Column gap="2">
                  <Text variant="label-strong-s">{person.name}</Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {post.published_at && formatDate(post.published_at)}
                  </Text>
                </Column>
              </div>
              <Row gap="16">
                <Row gap="4" vertical="center">
                  <Icon name="eye" size="xs" onBackground="neutral-weak" />
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {post.views_count} views
                  </Text>
                </Row>
                <Row gap="4" vertical="center">
                  <Icon name="heart" size="xs" onBackground="neutral-weak" />
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {post.likes_count} likes
                  </Text>
                </Row>
              </Row>
            </div>
          </div>

          {/* Featured Image */}
          {post.image_url && (
            <div className={styles.featuredImage}>
              <Media
                src={post.image_url}
                alt={post.title}
                aspectRatio="16/9"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                radius="l"
              />
            </div>
          )}

          {/* Article Content */}
          <article className={styles.article}>
            <BlogContent content={post.content} />
          </article>

          {/* Engagement Section */}
          <div className={styles.engagement}>
            <LikeButton postId={post.id} initialLikes={post.likes_count} />
            <div className={styles.stats}>
              <div className={styles.stat}>
                <Icon name="eye" size="s" onBackground="neutral-weak" />
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {post.views_count} views
                </Text>
              </div>
              <div className={styles.stat}>
                <Icon name="messageCircle" size="s" onBackground="neutral-weak" />
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {comments.length} comments
                </Text>
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <CommentSection postId={post.id} comments={comments} />

          {/* Recent Posts */}
          {recentPosts.length > 0 && (
            <div className={styles.recentPosts}>
              <Heading variant="heading-strong-xl" className={styles.recentPostsTitle}>
                More Articles
              </Heading>
              <div className={styles.recentPostsGrid}>
                {recentPosts.map((recentPost) => (
                  <SmartLink
                    key={recentPost.id}
                    href={`/blog/${recentPost.slug}`}
                    className={styles.recentPostCard}
                  >
                    {recentPost.image_url && (
                      <Media
                        src={recentPost.image_url}
                        alt={recentPost.title}
                        aspectRatio="16/9"
                        className={styles.recentPostImage}
                      />
                    )}
                    <div className={styles.recentPostContent}>
                      <div className={styles.recentPostTitle}>{recentPost.title}</div>
                      <div className={styles.recentPostDate}>
                        {recentPost.published_at && formatDate(recentPost.published_at)}
                      </div>
                    </div>
                  </SmartLink>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Hidden on Mobile */}
        <div className={styles.sidebar}>
          <Row
            gap="12"
            paddingLeft="2"
            vertical="center"
            onBackground="neutral-medium"
            textVariant="label-default-s"
          >
            <Icon name="document" size="xs" />
            On this page
          </Row>
          <HeadingNav fitHeight />
        </div>
      </div>
      <ScrollToHash />
    </Flex>
  );
}
