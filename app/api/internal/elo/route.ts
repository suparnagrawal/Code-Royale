import { NextResponse } from "next/server";
import { db } from "@/src/db/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY!;

export async function POST(req: Request) {
  try {
    const internalKey = req.headers.get("req-internal-key");
    if (internalKey !== INTERNAL_API_KEY) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { playerAId, playerBId, result, problemId, language, startedAt } = body; 
    // result: "winA", "winB", "draw"

    if (!playerAId || !playerBId || !result) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const playerA = await db.query.user.findFirst({ where: eq(user.id, playerAId) });
    const playerB = await db.query.user.findFirst({ where: eq(user.id, playerBId) });

    if (!playerA || !playerB) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const eloA = playerA.elo;
    const eloB = playerB.elo;

    const expectedA = 1 / (1 + Math.pow(10, (eloB - eloA) / 400));
    const expectedB = 1 / (1 + Math.pow(10, (eloA - eloB) / 400));

    let actualA = 0;
    let actualB = 0;
    if (result === "winA") {
      actualA = 1;
      actualB = 0;
    } else if (result === "winB") {
      actualA = 0;
      actualB = 1;
    } else if (result === "draw") {
      actualA = 0.5;
      actualB = 0.5;
    }

    const K = 32;
    const newEloA = Math.round(eloA + K * (actualA - expectedA));
    const newEloB = Math.round(eloB + K * (actualB - expectedB));

    const deltaA = newEloA - eloA;
    const deltaB = newEloB - eloB;

    await db.update(user).set({ 
      elo: newEloA, 
      gamesPlayed: playerA.gamesPlayed + 1, 
      peakElo: Math.max(playerA.peakElo, newEloA) 
    }).where(eq(user.id, playerAId));
    
    await db.update(user).set({ 
      elo: newEloB, 
      gamesPlayed: playerB.gamesPlayed + 1, 
      peakElo: Math.max(playerB.peakElo, newEloB) 
    }).where(eq(user.id, playerBId));

    if (problemId && startedAt) {
      const { battles } = await import("@/src/db/game-schema");
      await db.insert(battles).values({
        playerAId,
        playerBId,
        winnerId: result === "winA" ? playerAId : result === "winB" ? playerBId : null,
        problemId,
        language: language || "cpp",
        eloChangeA: deltaA,
        eloChangeB: deltaB,
        eloBeforeA: eloA,
        eloBeforeB: eloB,
        startedAt: new Date(startedAt),
        endedAt: new Date()
      });
    }

    return NextResponse.json({
      [playerAId]: { newElo: newEloA, delta: deltaA },
      [playerBId]: { newElo: newEloB, delta: deltaB },
    });
  } catch (error) {
    console.error("Error updating Elo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
