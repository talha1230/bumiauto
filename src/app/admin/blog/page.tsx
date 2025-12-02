import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import type { BlogPost } from "@/lib/supabase";
import {
  Column,
  Heading,
  Text,
  Row,
  Card,
  Tag,
  Button,
  SmartLink,
} from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { BlogPostActions } from "./BlogPostActions";

async function getBlogPosts() {
  try {
    const supabase = await createAdminSupabaseClient();

    const { data: posts } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    return (posts || []) as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogAdminPage() {
  await requireAdminSession();
  const posts = await getBlogPosts();

  return (
    <Column gap="xl" fillWidth>
      <Row gap="m" vertical="center" horizontal="between" wrap>
        <Column gap="s">
          <Heading variant="display-strong-m">Blog Management</Heading>
          <Text variant="body-default-l" onBackground="neutral-weak">
            Create and manage blog posts
          </Text>
        </Column>
        <SmartLink href="/admin/blog/new">
          <Button variant="primary" size="m">
            New Post
          </Button>
        </SmartLink>
      </Row>

      <Column gap="m">
        {posts.length === 0 ? (
          <Card padding="l" border="neutral-alpha-weak">
            <Column gap="m" horizontal="center">
              <Text onBackground="neutral-weak">No blog posts yet</Text>
              <SmartLink href="/admin/blog/new">
                <Button variant="secondary" size="m">
                  Create your first post
                </Button>
              </SmartLink>
            </Column>
          </Card>
        ) : (
          <Column gap="s">
            {posts.map((post) => (
              <Card
                key={post.id}
                padding="m"
                radius="m"
                border="neutral-alpha-weak"
              >
                <Row gap="m" vertical="center" wrap>
                  <Column gap="xs" style={{ flex: 1, minWidth: "200px" }}>
                    <Row gap="s" vertical="center">
                      <Text variant="heading-strong-s">{post.title}</Text>
                      <Tag
                        variant={post.published ? "success" : "warning"}
                        size="s"
                        label={post.published ? "Published" : "Draft"}
                      />
                    </Row>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      /{post.slug}
                    </Text>
                    {post.summary && (
                      <Text
                        variant="body-default-xs"
                        onBackground="neutral-weak"
                        style={{ marginTop: "4px" }}
                      >
                        {post.summary.substring(0, 150)}
                        {post.summary.length > 150 ? "..." : ""}
                      </Text>
                    )}
                    <Row gap="m" style={{ marginTop: "8px" }}>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        {formatDate(post.created_at)}
                      </Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        {post.views_count} views • {post.likes_count} likes
                      </Text>
                    </Row>
                  </Column>
                  <BlogPostActions
                    id={post.id}
                    slug={post.slug}
                    published={post.published}
                  />
                </Row>
              </Card>
            ))}
          </Column>
        )}
      </Column>
    </Column>
  );
}
