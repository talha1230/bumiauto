import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import {
  Column,
  Heading,
  Text,
  Row,
  Card,
  Icon,
} from "@once-ui-system/core";

interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
  description?: string;
}

function StatsCard({ title, value, icon, description }: StatsCardProps) {
  return (
    <Card padding="l" radius="l" border="neutral-alpha-weak" fillWidth>
      <Row gap="m" vertical="center">
        <Icon name={icon as any} size="l" onBackground="brand-medium" />
        <Column gap="xs">
          <Text variant="body-default-s" onBackground="neutral-weak">
            {title}
          </Text>
          <Heading variant="heading-strong-l">{value}</Heading>
          {description && (
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {description}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}

async function getStats() {
  try {
    const supabase = await createAdminSupabaseClient();

    // Get contact submissions count
    const { count: contactsCount } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true });

    // Get new contacts count
    const { count: newContactsCount } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new");

    // Get loan inquiries count
    const { count: loansCount } = await supabase
      .from("loan_inquiries")
      .select("*", { count: "exact", head: true });

    // Get pending loans count
    const { count: pendingLoansCount } = await supabase
      .from("loan_inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    // Get blog posts count
    const { count: postsCount } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true });

    // Get published posts count
    const { count: publishedPostsCount } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("published", true);

    // Get pending comments count
    const { count: pendingCommentsCount } = await supabase
      .from("blog_comments")
      .select("*", { count: "exact", head: true })
      .eq("approved", false);

    return {
      contactsCount: contactsCount || 0,
      newContactsCount: newContactsCount || 0,
      loansCount: loansCount || 0,
      pendingLoansCount: pendingLoansCount || 0,
      postsCount: postsCount || 0,
      publishedPostsCount: publishedPostsCount || 0,
      pendingCommentsCount: pendingCommentsCount || 0,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      contactsCount: 0,
      newContactsCount: 0,
      loansCount: 0,
      pendingLoansCount: 0,
      postsCount: 0,
      publishedPostsCount: 0,
      pendingCommentsCount: 0,
    };
  }
}

export default async function AdminDashboard() {
  await requireAdminSession();
  const stats = await getStats();

  return (
    <Column gap="xl" fillWidth>
      <Column gap="s">
        <Heading variant="display-strong-m">Dashboard</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          Welcome to the BumiAuto admin dashboard
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">Overview</Heading>
        <Row gap="m" wrap>
          <StatsCard
            title="Contact Submissions"
            value={stats.contactsCount}
            icon="mail"
            description={`${stats.newContactsCount} new`}
          />
          <StatsCard
            title="Loan Inquiries"
            value={stats.loansCount}
            icon="document"
            description={`${stats.pendingLoansCount} pending`}
          />
          <StatsCard
            title="Blog Posts"
            value={stats.postsCount}
            icon="edit"
            description={`${stats.publishedPostsCount} published`}
          />
          <StatsCard
            title="Pending Comments"
            value={stats.pendingCommentsCount}
            icon="chat"
          />
        </Row>
      </Column>
    </Column>
  );
}
