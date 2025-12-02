import { getAdminSession } from "@/lib/admin-auth";
import { Column, Flex, Row, Text, SmartLink, Button, Icon } from "@once-ui-system/core";
import { redirect } from "next/navigation";

async function AdminSidebar() {
  const session = await getAdminSession();

  if (!session) {
    return null;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "home" },
    { href: "/admin/inquiries", label: "Inquiries", icon: "mail" },
    { href: "/admin/blog", label: "Blog", icon: "document" },
  ];

  return (
    <Column
      padding="l"
      gap="m"
      style={{
        width: "250px",
        borderRight: "1px solid var(--neutral-alpha-weak)",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <Column gap="s" marginBottom="l">
        <Text variant="heading-strong-m">Admin Panel</Text>
        <Text variant="body-default-xs" onBackground="neutral-weak">
          {session.email}
        </Text>
      </Column>

      <Column gap="xs">
        {navItems.map((item) => (
          <SmartLink
            key={item.href}
            href={item.href}
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Icon name={item.icon as any} size="s" />
            <Text variant="body-default-m">{item.label}</Text>
          </SmartLink>
        ))}
      </Column>

      <Column style={{ marginTop: "auto" }}>
        <form action="/api/admin/logout" method="POST">
          <Button type="submit" variant="secondary" size="m" fillWidth>
            <Icon name="close" size="s" />
            Logout
          </Button>
        </form>
      </Column>
    </Column>
  );
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If not logged in and not on login page, the individual page will redirect
  if (!session) {
    return <>{children}</>;
  }

  return (
    <Row fillWidth>
      <AdminSidebar />
      <Column padding="l" fillWidth style={{ minHeight: "calc(100vh - 80px)" }}>
        {children}
      </Column>
    </Row>
  );
}
