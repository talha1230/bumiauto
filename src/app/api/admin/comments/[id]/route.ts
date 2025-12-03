import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase";
import { getAdminSession } from "@/lib/admin-auth";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// PATCH - Approve or unapprove a comment
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { action } = body;

    if (!action || !["approve", "unapprove"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Use 'approve' or 'unapprove'" },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    const { data: comment, error } = await supabase
      .from("blog_comments")
      .update({ approved: action === "approve" })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating comment:", error);
      return NextResponse.json(
        { error: "Failed to update comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: action === "approve" ? "Comment approved" : "Comment unapproved",
      comment,
    });
  } catch (error) {
    console.error("Error in PATCH /api/admin/comments/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a comment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const supabase = await createAdminSupabaseClient();

    const { error } = await supabase
      .from("blog_comments")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting comment:", error);
      return NextResponse.json(
        { error: "Failed to delete comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    console.error("Error in DELETE /api/admin/comments/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
