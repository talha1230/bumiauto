import { createAdminSupabaseClient } from "@/lib/supabase";
import styles from "./admin.module.css";
import Link from "next/link";

// Force dynamic rendering since we use cookies for Supabase
export const dynamic = 'force-dynamic';

async function getStats() {
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
  const stats = await getStats();

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>
          Welcome to the BumiAuto admin dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📧</div>
          <div className={styles.statLabel}>Contact Submissions</div>
          <div className={styles.statValue}>{stats.contactsCount}</div>
          <div className={styles.statSubtext}>{stats.newContactsCount} new</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📋</div>
          <div className={styles.statLabel}>Loan Inquiries</div>
          <div className={styles.statValue}>{stats.loansCount}</div>
          <div className={styles.statSubtext}>{stats.pendingLoansCount} pending</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📝</div>
          <div className={styles.statLabel}>Blog Posts</div>
          <div className={styles.statValue}>{stats.postsCount}</div>
          <div className={styles.statSubtext}>{stats.publishedPostsCount} published</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>💬</div>
          <div className={styles.statLabel}>Pending Comments</div>
          <div className={styles.statValue}>{stats.pendingCommentsCount}</div>
          <div className={styles.statSubtext}>awaiting approval</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
      </div>
      <div className={styles.quickActions}>
        <Link href="/admin/inquiries" className={styles.quickActionCard}>
          <span className={styles.quickActionIcon}>📧</span>
          <span className={styles.quickActionLabel}>View Inquiries</span>
        </Link>
        <Link href="/admin/comments" className={styles.quickActionCard}>
          <span className={styles.quickActionIcon}>💬</span>
          <span className={styles.quickActionLabel}>
            Moderate Comments
            {stats.pendingCommentsCount > 0 && (
              <span style={{ 
                marginLeft: "8px",
                background: "var(--danger-solid-strong, #ef4444)",
                color: "white",
                padding: "2px 8px",
                borderRadius: "9999px",
                fontSize: "0.75rem",
              }}>
                {stats.pendingCommentsCount}
              </span>
            )}
          </span>
        </Link>
        <Link href="/admin/blog/new" className={styles.quickActionCard}>
          <span className={styles.quickActionIcon}>✏️</span>
          <span className={styles.quickActionLabel}>Write New Post</span>
        </Link>
        <Link href="/admin/blog" className={styles.quickActionCard}>
          <span className={styles.quickActionIcon}>📚</span>
          <span className={styles.quickActionLabel}>Manage Blog</span>
        </Link>
        <a href="/" target="_blank" rel="noopener noreferrer" className={styles.quickActionCard}>
          <span className={styles.quickActionIcon}>🌐</span>
          <span className={styles.quickActionLabel}>View Website</span>
        </a>
      </div>
    </div>
  );
}
