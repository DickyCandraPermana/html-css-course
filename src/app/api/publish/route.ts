import { NextResponse } from "next/server";
import { db, showcases, participants } from "@/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { participantId, participantName, cafeName, htmlCode, cssCode } = body;

    if (!cafeName || typeof cafeName !== "string" || !cafeName.trim()) {
      return NextResponse.json({ error: "Nama cafe wajib diisi." }, { status: 400 });
    }

    let validParticipantId = participantId;

    // If local participant or anonymous, find or create one
    if (!validParticipantId || validParticipantId.startsWith("local-") || validParticipantId === "anonymous") {
      try {
        const [created] = await db
          .insert(participants)
          .values({
            name: participantName || "Kreator Cafe",
            sessionCode: "public-showcase",
            currentStep: 7,
            completedSteps: [1, 2, 3, 4, 5, 6, 7],
            htmlDraft: htmlCode || "",
            cssDraft: cssCode || "",
          })
          .returning();
        validParticipantId = created.id;
      } catch (err) {
        console.warn("Could not create fallback participant in db:", err);
      }
    }

    try {
      const [newShowcase] = await db
        .insert(showcases)
        .values({
          participantId: validParticipantId,
          cafeName: cafeName.trim(),
          htmlCode: htmlCode || "",
          cssCode: cssCode || "",
          likesCount: 0,
          isApproved: true,
        })
        .returning();

      return NextResponse.json({ success: true, showcase: newShowcase });
    } catch (insertErr) {
      console.warn("Could not insert showcase to DB (returning fallback):", insertErr);
      return NextResponse.json({
        success: true,
        mode: "offline-demo",
        showcase: {
          id: "demo-" + Date.now(),
          cafeName: cafeName.trim(),
          participantId: validParticipantId,
          likesCount: 0,
          createdAt: new Date(),
        },
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
