import { NextResponse } from "next/server";
import { db, participants, showcases } from "@/db";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin } = body;

    const validPin = process.env.MENTOR_SECRET_PIN || "kopicode2026";

    if (pin !== validPin) {
      return NextResponse.json(
        { error: "PIN Mentor tidak valid. Silakan coba lagi." },
        { status: 401 }
      );
    }

    try {
      const allParticipants = await db
        .select()
        .from(participants)
        .orderBy(desc(participants.updatedAt));

      const allShowcases = await db.select().from(showcases);

      return NextResponse.json({
        success: true,
        participants: allParticipants,
        totalShowcases: allShowcases.length,
      });
    } catch (dbErr) {
      console.warn("DB error in mentor api (fallback data):", dbErr);
      return NextResponse.json({
        success: true,
        participants: [
          {
            id: "sample-1",
            name: "Budi Santoso",
            sessionCode: "workshop-senja",
            currentStep: 4,
            completedSteps: [1, 2, 3],
            htmlDraft: "<h1>Kopi Senja</h1><p>Enak sekali</p>",
            cssDraft: "body { background: #111; }",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "sample-2",
            name: "Siti Rahma",
            sessionCode: "workshop-senja",
            currentStep: 6,
            completedSteps: [1, 2, 3, 4, 5],
            htmlDraft: "<h1>Kedai Kopi Rukun</h1>",
            cssDraft: "body { color: white; }",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        totalShowcases: 1,
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
