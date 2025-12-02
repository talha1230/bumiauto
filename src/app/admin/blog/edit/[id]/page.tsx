import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import type { BlogPost } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { EditBlogPostForm } from "./EditBlogPostForm";

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const supabase = await createAdminSupabaseClient();

    const { data: post } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    return post as BlogPost | null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return <EditBlogPostForm post={post} />;
}
