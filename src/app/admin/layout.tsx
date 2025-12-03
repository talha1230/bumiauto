import { getAdminSession } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import { AdminSidebar } from "./AdminSidebar";
import styles from "./admin.module.css";

// Force dynamic rendering since we use cookies for auth
export const dynamic = 'force-dynamic';

async function getPendingCount(): Promise<number> {
  try {
    const supabase = await createAdminSupabaseClient();
    
    const { count: newContacts } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new");
    
    const { count: pendingLoans } = await supabase
      .from("loan_inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");
    
    return (newContacts || 0) + (pendingLoans || 0);
  } catch {
    return 0;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If not logged in, just render children (login page)
  // Middleware handles the redirect
  if (!session) {
    return <>{children}</>;
  }

  const pendingCount = await getPendingCount();

  // Logged in - show admin layout with sidebar
  return (
    <div className={styles.adminContainer}>
      <AdminSidebar email={session.email} pendingCount={pendingCount} />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
