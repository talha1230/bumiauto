import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase";
import { headers } from "next/headers";
import crypto from "crypto";

function generateVisitorId(ip: string, userAgent: string): string {
  const data = `${ip}-${userAgent}`;
  return crypto.createHash("sha256").update(data).digest("hex").substring(0, 32);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const headersList = await headers();
    
    // Get visitor identifier
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";
    const visitorId = generateVisitorId(ip, userAgent);

    const supabase = await createAdminSupabaseClient();

    // Check if already liked
    const { data: existingLike } = await supabase
      .from("blog_likes")
      .select("id")
      .eq("post_id", postId)
      .eq("visitor_id", visitorId)
      .single();

    if (existingLike) {
      return NextResponse.json(
        { error: "Already liked this post" },
        { status: 409 }
      );
    }

    // Add like
    const { error: likeError } = await supabase
      .from("blog_likes")
      .insert({
        post_id: postId,
        visitor_id: visitorId,
      });

    if (likeError) {
      console.error("Error adding like:", likeError);
      return NextResponse.json(
        { error: "Failed to like post" },
        { status: 500 }
      );
    }

    // Update likes count
    const { error: updateError } = await supabase.rpc("increment_likes_count", {
      post_id: postId,
    });

    // Get updated like count
    const { data: post } = await supabase
      .from("blog_posts")
      .select("likes_count")
      .eq("id", postId)
      .single();

    return NextResponse.json({
      success: true,
      likes_count: post?.likes_count || 0,
    });
  } catch (error) {
    console.error("Error processing like:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
