import { NextResponse } from "next/server";
import { db, participants } from "@/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      participantId,
      htmlDraft,
      cssDraft,
      currentStep,
      completedSteps,
    } = body;

    if (!participantId || typeof participantId !== "string") {
      return NextResponse.json(
        { error: "Participant ID wajib disertakan." },
        { status: 400 }
      );
    }

    // Skip DB update if local simulated participant
    if (participantId.startsWith("local-")) {
      return NextResponse.json({
        success: true,
        mode: "local-simulation",
        updatedAt: new Date(),
      });
    }

    try {
      const updateData: Record<string, unknown> = {
        updatedAt: new Date(),
      };

      if (typeof htmlDraft === "string") updateData.htmlDraft = htmlDraft;
      if (typeof cssDraft === "string") updateData.cssDraft = cssDraft;
      if (typeof currentStep === "number") updateData.currentStep = currentStep;
      if (Array.isArray(completedSteps)) updateData.completedSteps = completedSteps;

      await db
        .update(participants)
        .set(updateData)
        .where(eq(participants.id, participantId));

      return NextResponse.json({
        success: true,
        updatedAt: new Date(),
      });
    } catch (dbErr) {
      console.warn("DB update failed (offline mode):", dbErr);
      return NextResponse.json({
        success: true,
        mode: "offline-fallback",
        updatedAt: new Date(),
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
