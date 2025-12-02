import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client-side Supabase client
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Server-side Supabase client
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// Server-side Supabase client with service role (for admin operations)
export async function createAdminSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// Database types
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: "new" | "read" | "responded" | "archived";
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoanInquiry {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  loan_type: "motorcycle" | "consumer-durable" | "other";
  loan_amount: number | null;
  monthly_income: number | null;
  message: string | null;
  status: "pending" | "contacted" | "approved" | "rejected" | "completed";
  assigned_to: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content: string;
  image_url: string | null;
  tag: string | null;
  author_id: string | null;
  published: boolean;
  published_at: string | null;
  likes_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface BlogComment {
  id: string;
  post_id: string;
  parent_id: string | null;
  name: string;
  email: string;
  content: string;
  approved: boolean;
  created_at: string;
}

export interface BlogLike {
  id: string;
  post_id: string;
  visitor_id: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: "super_admin" | "admin" | "staff";
  name: string;
  avatar_url: string | null;
  active: boolean;
  last_login: string | null;
  created_at: string;
}
