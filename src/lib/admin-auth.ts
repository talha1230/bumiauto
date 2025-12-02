import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface AdminSession {
  email: string;
  role: string;
  name: string;
  exp: number;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");

  if (!sessionCookie) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(sessionCookie.value, "base64").toString()
    ) as AdminSession;

    // Check if session is expired
    if (session.exp < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
