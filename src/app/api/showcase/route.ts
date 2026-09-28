import { NextResponse } from "next/server";
import { db, showcases, participants } from "@/db";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    try {
      const allShowcases = await db
        .select({
          id: showcases.id,
          cafeName: showcases.cafeName,
          htmlCode: showcases.htmlCode,
          cssCode: showcases.cssCode,
          likesCount: showcases.likesCount,
          createdAt: showcases.createdAt,
          authorName: participants.name,
          sessionCode: participants.sessionCode,
        })
        .from(showcases)
        .leftJoin(participants, eq(showcases.participantId, participants.id))
        .orderBy(desc(showcases.createdAt));

      return NextResponse.json({ showcases: allShowcases });
    } catch (dbErr) {
      console.warn("DB query error in /api/showcase (using fallback seed):", dbErr);

      // Return a couple of cool demo showcases so the gallery is never empty
      const demoShowcases = [
        {
          id: "demo-1",
          cafeName: "Kopi Senja Bahagia",
          authorName: "Dicky Candra Permana",
          sessionCode: "workshop-senja",
          likesCount: 12,
          createdAt: new Date().toISOString(),
          htmlCode: `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Kopi Senja</title></head>
<body>
  <div class="card">
    <nav class="nav"><span>☕ Kopi Senja</span><span>[ Menu ] [ Kontak ]</span></nav>
    <h1>Kopi Senja Bahagia</h1>
    <p>Seduhan biji <strong>single origin arabika</strong> khas pegunungan Jawa Barat.</p>
    <table border="1" style="width:100%;margin-top:15px;border-collapse:collapse;">
      <tr><th>Menu</th><th>Harga</th></tr>
      <tr><td>V60 Gayo</td><td>Rp 25.000</td></tr>
      <tr><td>Americano</td><td>Rp 20.000</td></tr>
    </table>
    <div style="margin-top:20px;text-align:center;">
      <button style="background:#d97706;color:white;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;">Reservasi Meja</button>
    </div>
  </div>
</body>
</html>`,
          cssCode: `body { background: #0c0a09; color: #f5f5f4; font-family: sans-serif; padding: 20px; }
.card { background: #1c1917; border: 1px solid #333; border-radius: 12px; padding: 24px; max-width: 600px; margin: 0 auto; }
.nav { display: flex; justify-content: space-between; border-bottom: 1px dashed #444; padding-bottom: 10px; margin-bottom: 15px; }
h1 { color: #f59e0b; margin-bottom: 8px; }
th, td { padding: 8px; border: 1px solid #333; text-align: left; }
th { background: #262626; color: #f59e0b; }`,
        },
      ];

      return NextResponse.json({ showcases: demoShowcases });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
