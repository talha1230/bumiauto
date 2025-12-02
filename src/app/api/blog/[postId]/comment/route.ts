import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase";

// Maximum comment length (configurable via environment variable)
const MAX_COMMENT_LENGTH = parseInt(process.env.MAX_COMMENT_LENGTH || "2000", 10);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const body = await request.json();
    const { name, email, content } = body;

    // Validation
    if (!name || !email || !content) {
      return NextResponse.json(
        { error: "Name, email, and comment are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Content length validation
    if (content.length > MAX_COMMENT_LENGTH) {
      return NextResponse.json(
        { error: `Comment is too long (max ${MAX_COMMENT_LENGTH} characters)` },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    // Check if post exists
    const { data: post } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("id", postId)
      .eq("published", true)
      .single();

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Insert comment (pending moderation)
    const { error: commentError } = await supabase
      .from("blog_comments")
      .insert({
        post_id: postId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        content: content.trim(),
        approved: false, // Requires moderation
      });

    if (commentError) {
      console.error("Error adding comment:", commentError);
      return NextResponse.json(
        { error: "Failed to submit comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Comment submitted and awaiting moderation",
    });
  } catch (error) {
    console.error("Error processing comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
