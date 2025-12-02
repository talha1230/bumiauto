import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@bumiauto.com";
const ADMIN_PASSWORD = "bumiauto0123";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check hardcoded credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create a simple session token
      const sessionToken = Buffer.from(
        JSON.stringify({
          email: ADMIN_EMAIL,
          role: "super_admin",
          name: "Admin",
          exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        })
      ).toString("base64");

      // Set session cookie
      const cookieStore = await cookies();
      cookieStore.set("admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60, // 24 hours
        path: "/",
      });

      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
          user: {
            email: ADMIN_EMAIL,
            role: "super_admin",
            name: "Admin",
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error processing login:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
