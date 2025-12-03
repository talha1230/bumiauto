import { createAdminSupabaseClient } from "@/lib/supabase";

async function getStats() {
  console.log("[Admin Dashboard] Fetching stats...");
  
  try {
    const supabase = await createAdminSupabaseClient();

    const { count: contactsCount } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true });

    const { count: newContactsCount } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new");

    const { count: loansCount } = await supabase
      .from("loan_inquiries")
      .select("*", { count: "exact", head: true });

    const { count: pendingLoansCount } = await supabase
      .from("loan_inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    const { count: postsCount } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true });

    const { count: publishedPostsCount } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("published", true);

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
    console.error("[Admin Dashboard] Error fetching stats:", error);
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
  console.log("[Admin Dashboard] Loading dashboard...");
  const stats = await getStats();

  return (
    <div>
      <h1 style={{ 
        fontSize: "2rem", 
        fontWeight: "bold", 
        marginBottom: "0.5rem",
        color: "var(--neutral-on-background-strong, #fff)"
      }}>
        Dashboard
      </h1>
      <p style={{ 
        marginBottom: "2rem",
        color: "var(--neutral-on-background-weak, #888)"
      }}>
        Welcome to the BumiAuto admin dashboard
      </p>

      <h2 style={{ 
        fontSize: "1.25rem", 
        fontWeight: "bold", 
        marginBottom: "1rem",
        color: "var(--neutral-on-background-strong, #fff)"
      }}>
        Overview
      </h2>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem"
      }}>
        <div style={{
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid var(--neutral-alpha-weak, #333)",
          background: "var(--surface-background, #111)"
        }}>
          <p style={{ color: "var(--neutral-on-background-weak, #888)", marginBottom: "0.5rem" }}>
            📧 Contact Submissions
          </p>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--neutral-on-background-strong, #fff)" }}>
            {stats.contactsCount}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--neutral-on-background-weak, #888)" }}>
            {stats.newContactsCount} new
          </p>
        </div>

        <div style={{
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid var(--neutral-alpha-weak, #333)",
          background: "var(--surface-background, #111)"
        }}>
          <p style={{ color: "var(--neutral-on-background-weak, #888)", marginBottom: "0.5rem" }}>
            📋 Loan Inquiries
          </p>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--neutral-on-background-strong, #fff)" }}>
            {stats.loansCount}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--neutral-on-background-weak, #888)" }}>
            {stats.pendingLoansCount} pending
          </p>
        </div>

        <div style={{
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid var(--neutral-alpha-weak, #333)",
          background: "var(--surface-background, #111)"
        }}>
          <p style={{ color: "var(--neutral-on-background-weak, #888)", marginBottom: "0.5rem" }}>
            📝 Blog Posts
          </p>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--neutral-on-background-strong, #fff)" }}>
            {stats.postsCount}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--neutral-on-background-weak, #888)" }}>
            {stats.publishedPostsCount} published
          </p>
        </div>

        <div style={{
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid var(--neutral-alpha-weak, #333)",
          background: "var(--surface-background, #111)"
        }}>
          <p style={{ color: "var(--neutral-on-background-weak, #888)", marginBottom: "0.5rem" }}>
            💬 Pending Comments
          </p>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--neutral-on-background-strong, #fff)" }}>
            {stats.pendingCommentsCount}
          </p>
        </div>
      </div>
    </div>
  );
}
