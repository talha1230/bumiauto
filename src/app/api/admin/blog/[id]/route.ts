import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = await createAdminSupabaseClient();

    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching blog post:", error);
      return NextResponse.json(
        { error: "Failed to fetch blog post" },
        { status: 500 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, slug, summary, content, image_url, tag, published, published_at } = body;

    const supabase = await createAdminSupabaseClient();

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (summary !== undefined) updateData.summary = summary || null;
    if (content !== undefined) updateData.content = content;
    if (image_url !== undefined) updateData.image_url = image_url || null;
    if (tag !== undefined) updateData.tag = tag || null;
    if (published !== undefined) updateData.published = published;
    if (published_at !== undefined) updateData.published_at = published_at;

    const { data: post, error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating blog post:", error);
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "Failed to update blog post" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = await createAdminSupabaseClient();

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting blog post:", error);
      return NextResponse.json(
        { error: "Failed to delete blog post" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
