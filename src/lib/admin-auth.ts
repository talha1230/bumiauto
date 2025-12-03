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

  console.log("[Admin Auth] Checking session cookie:", sessionCookie ? "found" : "not found");

  if (!sessionCookie) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(sessionCookie.value, "base64").toString()
    ) as AdminSession;

    // Check if session is expired
    if (session.exp < Date.now()) {
      console.log("[Admin Auth] Session expired");
      return null;
    }

    console.log("[Admin Auth] Session valid for:", session.email);
    return session;
  } catch (error) {
    console.error("[Admin Auth] Error parsing session:", error);
    return null;
  }
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    console.log("[Admin Auth] No valid session, redirecting to login");
    redirect("/admin/login");
  }

  return session;
}
