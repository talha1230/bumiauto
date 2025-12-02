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
  Line,
} from "@once-ui-system/core";
import { baseURL, about, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase";
import type { BlogPost, BlogComment } from "@/lib/supabase";
import { Metadata } from "next";
import React from "react";
import { LikeButton } from "@/components/blog/LikeButton";
import { CommentSection } from "@/components/blog/CommentSection";

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createServerSupabaseClient();

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
    const supabase = await createServerSupabaseClient();

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

    await supabase.rpc("increment_view_count", { post_id: postId });
  } catch (error) {
    // Silently fail - view count is not critical
    console.error("Error incrementing view count:", error);
  }
}

async function getRecentPosts(excludeSlug: string): Promise<BlogPost[]> {
  try {
    const supabase = await createServerSupabaseClient();

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
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
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
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href="/blog">
              <Text variant="label-strong-m">Blog</Text>
            </SmartLink>
            <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
              {post.published_at && formatDate(post.published_at)}
            </Text>
            <Heading variant="display-strong-m">{post.title}</Heading>
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={person.avatar} />
              <Text variant="label-default-m" onBackground="brand-weak">
                {person.name}
              </Text>
            </Row>
          </Row>
          {post.image_url && (
            <Media
              src={post.image_url}
              alt={post.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{ lineHeight: 1.7 }}
            />
          </Column>

          {/* Like Button and Stats */}
          <Row gap="m" vertical="center" marginTop="24">
            <LikeButton postId={post.id} initialLikes={post.likes_count} />
            <Text variant="body-default-s" onBackground="neutral-weak">
              {post.views_count} views
            </Text>
          </Row>

          {/* Comment Section */}
          <CommentSection postId={post.id} comments={comments} />

          {recentPosts.length > 0 && (
            <Column fillWidth gap="40" horizontal="center" marginTop="40">
              <Line maxWidth="40" />
              <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
                Recent posts
              </Heading>
              <Row gap="m" wrap>
                {recentPosts.map((recentPost) => (
                  <SmartLink
                    key={recentPost.id}
                    href={`/blog/${recentPost.slug}`}
                    style={{ textDecoration: "none", flex: 1, minWidth: "250px" }}
                  >
                    <Column gap="s" padding="m" border="neutral-alpha-weak" radius="m">
                      {recentPost.image_url && (
                        <Media
                          src={recentPost.image_url}
                          alt={recentPost.title}
                          aspectRatio="16/9"
                          radius="s"
                        />
                      )}
                      <Text variant="heading-strong-s">{recentPost.title}</Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        {recentPost.published_at && formatDate(recentPost.published_at)}
                      </Text>
                    </Column>
                  </SmartLink>
                ))}
              </Row>
            </Column>
          )}
          <ScrollToHash />
        </Column>
      </Row>
      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
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
      </Column>
    </Row>
  );
}
