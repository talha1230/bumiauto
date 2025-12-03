import { createAdminSupabaseClient } from "@/lib/supabase";
import styles from "../admin.module.css";
import { CommentActions } from "./CommentActions";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface CommentWithPost {
  id: string;
  post_id: string;
  name: string;
  email: string;
  content: string;
  approved: boolean;
  created_at: string;
  blog_posts: {
    title: string;
    slug: string;
  } | null;
}

async function getComments() {
  try {
    const supabase = await createAdminSupabaseClient();

    const { data: comments, error } = await supabase
      .from("blog_comments")
      .select(`
        *,
        blog_posts (
          title,
          slug
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      return [];
    }

    return (comments || []) as CommentWithPost[];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string) {
  const colors = [
    "#22c55e", // green
    "#3b82f6", // blue
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#f97316", // orange
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export default async function CommentsPage() {
  const comments = await getComments();
  
  const pendingComments = comments.filter((c) => !c.approved);
  const approvedComments = comments.filter((c) => c.approved);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Comment Management</h1>
        <p className={styles.pageSubtitle}>
          Review and moderate user comments on blog posts
        </p>
      </div>

      {/* Stats Summary */}
      <div className={styles.statsGrid} style={{ marginBottom: "2rem" }}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏳</div>
          <div className={styles.statLabel}>Pending Review</div>
          <div className={styles.statValue}>{pendingComments.length}</div>
          <div className={styles.statSubtext}>awaiting approval</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statLabel}>Approved</div>
          <div className={styles.statValue}>{approvedComments.length}</div>
          <div className={styles.statSubtext}>visible on blog</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💬</div>
          <div className={styles.statLabel}>Total Comments</div>
          <div className={styles.statValue}>{comments.length}</div>
          <div className={styles.statSubtext}>all time</div>
        </div>
      </div>

      {/* Pending Comments Section */}
      <div className={styles.sectionMargin}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            🔔 Pending Approval ({pendingComments.length})
          </h2>
        </div>

        {pendingComments.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>✨</div>
            <p className={styles.emptyStateText}>
              No pending comments to review
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {pendingComments.map((comment) => (
              <CommentCard 
                key={comment.id} 
                comment={comment} 
                isPending={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Approved Comments Section */}
      <div className={styles.sectionMargin}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            ✅ Approved Comments ({approvedComments.length})
          </h2>
        </div>

        {approvedComments.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📝</div>
            <p className={styles.emptyStateText}>
              No approved comments yet
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {approvedComments.slice(0, 20).map((comment) => (
              <CommentCard 
                key={comment.id} 
                comment={comment} 
                isPending={false}
              />
            ))}
            {approvedComments.length > 20 && (
              <p style={{ textAlign: "center", color: "var(--neutral-on-background-weak)" }}>
                Showing 20 of {approvedComments.length} approved comments
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CommentCard({ comment, isPending }: { comment: CommentWithPost; isPending: boolean }) {
  const initials = getInitials(comment.name);
  const avatarColor = getAvatarColor(comment.name);

  return (
    <div 
      className={styles.listItem}
      style={{
        borderColor: isPending ? "var(--warning-alpha-medium, #f59e0b40)" : undefined,
        background: isPending ? "var(--warning-alpha-weak, #f59e0b08)" : undefined,
      }}
    >
      <div className={styles.listItemHeader}>
        {/* User Info Section */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flex: 1 }}>
          {/* Avatar */}
          <div 
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: avatarColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>

          {/* User Details */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className={styles.listItemTitleRow}>
              <span className={styles.listItemTitle}>{comment.name}</span>
              <span 
                className={`${styles.badge} ${isPending ? styles.badgeWarning : styles.badgeSuccess}`}
              >
                {isPending ? "Pending" : "Approved"}
              </span>
            </div>
            
            {/* Email */}
            <div style={{ 
              fontSize: "0.85rem", 
              color: "var(--neutral-on-background-weak)",
              marginTop: "0.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <span>📧</span>
              <a 
                href={`mailto:${comment.email}`}
                style={{ color: "var(--brand-on-background-strong)", textDecoration: "none" }}
              >
                {comment.email}
              </a>
            </div>

            {/* Post Reference */}
            {comment.blog_posts && (
              <div style={{ 
                fontSize: "0.85rem", 
                color: "var(--neutral-on-background-weak)",
                marginTop: "0.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}>
                <span>📝</span>
                <span>On: </span>
                <a 
                  href={`/blog/${comment.blog_posts.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--info-on-background-strong)", textDecoration: "none" }}
                >
                  {comment.blog_posts.title}
                </a>
              </div>
            )}

            {/* Timestamp */}
            <div style={{ 
              fontSize: "0.8rem", 
              color: "var(--neutral-on-background-weak)",
              marginTop: "0.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <span>🕐</span>
              <span>{formatDate(comment.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.listItemActions}>
          <CommentActions 
            commentId={comment.id} 
            isApproved={comment.approved}
          />
        </div>
      </div>

      {/* Comment Content */}
      <div style={{
        marginTop: "1rem",
        padding: "1rem",
        background: "var(--neutral-alpha-weak, #1a1a1a)",
        borderRadius: "8px",
        borderLeft: "3px solid var(--brand-solid-strong, #22c55e)",
      }}>
        <p style={{ 
          fontSize: "0.95rem",
          color: "var(--neutral-on-background-strong)",
          lineHeight: "1.6",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}>
          "{comment.content}"
        </p>
      </div>
    </div>
  );
}
