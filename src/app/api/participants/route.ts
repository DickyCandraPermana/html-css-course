import { NextResponse } from "next/server";
import { db, participants } from "@/db";
import { eq, and } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, sessionCode = "default-workshop" } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Nama peserta wajib diisi." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const cleanSession = sessionCode.trim() || "default-workshop";

    // Check if participant already exists in this session
    let existing;
    try {
      [existing] = await db
        .select()
        .from(participants)
        .where(
          and(
            eq(participants.name, trimmedName),
            eq(participants.sessionCode, cleanSession)
          )
        );
    } catch (dbErr) {
      console.warn("Database query error (using offline participant fallback):", dbErr);
    }

    if (existing) {
      return NextResponse.json({
        participant: existing,
        isNew: false,
      });
    }

    // Create new participant
    try {
      const [newParticipant] = await db
        .insert(participants)
        .values({
          name: trimmedName,
          sessionCode: cleanSession,
          currentStep: 0,
          completedSteps: [],
          htmlDraft: "",
          cssDraft: "",
        })
        .returning();

      return NextResponse.json({
        participant: newParticipant,
        isNew: true,
      });
    } catch (insertErr) {
      console.warn("Database insert error, returning simulated participant:", insertErr);
      // Fallback for offline/no-db dev
      return NextResponse.json({
        participant: {
          id: "local-" + Date.now(),
          name: trimmedName,
          sessionCode: cleanSession,
          currentStep: 0,
          completedSteps: [],
          htmlDraft: "",
          cssDraft: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        isNew: true,
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
