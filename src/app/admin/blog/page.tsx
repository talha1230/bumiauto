import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import type { BlogPost } from "@/lib/supabase";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { BlogPostActions } from "./BlogPostActions";
import styles from "../admin.module.css";

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
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.sectionHeader}>
          <div>
            <h1 className={styles.pageTitle}>Blog Management</h1>
            <p className={styles.pageSubtitle}>Create and manage blog posts</p>
          </div>
          <Link href="/admin/blog/new" className={`${styles.button} ${styles.buttonPrimary}`}>
            ✏️ New Post
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className={`${styles.card} ${styles.emptyState}`}>
          <div className={styles.emptyStateIcon}>📝</div>
          <p className={styles.emptyStateText}>No blog posts yet</p>
          <Link href="/admin/blog/new" className={`${styles.button} ${styles.buttonSecondary}`}>
            Create your first post
          </Link>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} className={styles.listItem}>
              <div className={styles.listItemHeader}>
                <div className={styles.listItemContent}>
                  <div className={styles.listItemTitleRow}>
                    <span className={styles.listItemTitle}>{post.title}</span>
                    <span className={`${styles.badge} ${post.published ? styles.badgeSuccess : styles.badgeWarning}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className={styles.listItemSubtext}>/{post.slug}</p>
                  {post.summary && (
                    <p className={styles.listItemMessage}>
                      {post.summary.substring(0, 150)}
                      {post.summary.length > 150 ? "..." : ""}
                    </p>
                  )}
                  <p className={styles.listItemMeta}>
                    {formatDate(post.created_at)} • {post.views_count} views • {post.likes_count} likes
                  </p>
                </div>
                <div className={styles.listItemActions}>
                  <BlogPostActions
                    id={post.id}
                    slug={post.slug}
                    published={post.published}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
