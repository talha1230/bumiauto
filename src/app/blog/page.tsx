import { Column, Heading, Meta, Text, Flex, Card, Row, SmartLink, Tag, Media } from "@once-ui-system/core";
import { baseURL, blog } from "@/resources";
import { createAdminSupabaseClient } from "@/lib/supabase";

// Force dynamic rendering since we use cookies for Supabase
export const dynamic = 'force-dynamic';
import type { BlogPost } from "@/lib/supabase";
import { formatDate } from "@/utils/formatDate";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createAdminSupabaseClient();

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching blog posts:", error);
      return [];
    }

    console.log("Fetched blog posts:", posts?.length || 0);
    return (posts || []) as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <Flex
      fillWidth
      maxWidth="m"
      direction="column"
      horizontal="center"
      paddingY="xl"
      gap="xl"
    >
      <Column gap="m" horizontal="center">
        <Heading wrap="balance" variant="display-strong-l">
          Blog
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
          {posts.length > 0
            ? "Articles, insights, and updates from BumiAuto"
            : "Articles and updates coming soon."}
        </Text>
      </Column>

      {posts.length > 0 && (
        <Column gap="m" fillWidth>
          {posts.map((post) => (
            <SmartLink key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <Card
                padding="l"
                radius="l"
                border="neutral-alpha-weak"
                fillWidth
                style={{ cursor: "pointer" }}
              >
                <Row gap="l" wrap>
                  {post.image_url && (
                    <Media
                      src={post.image_url}
                      alt={post.title}
                      aspectRatio="16/9"
                      radius="m"
                      style={{ width: "200px", minWidth: "200px" }}
                    />
                  )}
                  <Column gap="s" style={{ flex: 1 }}>
                    <Row gap="s" vertical="center">
                      {post.tag && (
                        <Tag variant="brand" size="s" label={post.tag} />
                      )}
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        {post.published_at && formatDate(post.published_at)}
                      </Text>
                    </Row>
                    <Heading variant="heading-strong-m">{post.title}</Heading>
                    {post.summary && (
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {post.summary}
                      </Text>
                    )}
                    <Row gap="m" style={{ marginTop: "8px" }}>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        {post.views_count} views
                      </Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        {post.likes_count} likes
                      </Text>
                    </Row>
                  </Column>
                </Row>
              </Card>
            </SmartLink>
          ))}
        </Column>
      )}
    </Flex>
  );
}
