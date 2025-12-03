"use client";

import { useRouter } from "next/navigation";
import { Button, Icon } from "@once-ui-system/core";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="m"
      fillWidth
      onClick={handleLogout}
    >
      <Icon name="close" size="s" />
      Logout
    </Button>
  );
}
