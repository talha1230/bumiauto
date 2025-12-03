import { getAdminSession } from "@/lib/admin-auth";

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

  // Logged in - show admin layout with sidebar
  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
      {/* Sidebar */}
      <div style={{
        width: "250px",
        padding: "1.5rem",
        borderRight: "1px solid var(--neutral-alpha-weak, #333)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ 
            fontSize: "1.25rem", 
            fontWeight: "bold",
            color: "var(--neutral-on-background-strong, #fff)"
          }}>
            Admin Panel
          </h2>
          <p style={{ 
            fontSize: "0.75rem", 
            color: "var(--neutral-on-background-weak, #888)" 
          }}>
            {session.email}
          </p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <a href="/admin" style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            color: "var(--neutral-on-background-strong, #fff)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            🏠 Dashboard
          </a>
          <a href="/admin/inquiries" style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            color: "var(--neutral-on-background-strong, #fff)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            📧 Inquiries
          </a>
          <a href="/admin/blog" style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            color: "var(--neutral-on-background-strong, #fff)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            📝 Blog
          </a>
        </nav>

        <div style={{ marginTop: "auto" }}>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              border: "1px solid var(--neutral-alpha-weak, #333)",
              background: "transparent",
              color: "var(--neutral-on-background-strong, #fff)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}>
              🚪 Logout
            </button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "1.5rem" }}>
        {children}
      </div>
    </div>
  );
}
