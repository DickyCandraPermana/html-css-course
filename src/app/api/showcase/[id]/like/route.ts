import { NextResponse } from "next/server";
import { db, showcases } from "@/db";
import { eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Showcase ID required" }, { status: 400 });
    }

    try {
      await db
        .update(showcases)
        .set({
          likesCount: sql`${showcases.likesCount} + 1`,
        })
        .where(eq(showcases.id, id));

      return NextResponse.json({ success: true });
    } catch {
      // Fallback for demo IDs
      return NextResponse.json({ success: true, mode: "demo-liked" });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
