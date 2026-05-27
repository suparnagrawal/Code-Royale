import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db/db";
import { problems } from "@/src/db/schema";
import { lte, sql } from "drizzle-orm";

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY!;

export async function GET(request: NextRequest) {
  const internalKey = request.headers.get("req-internal-key");

  if (internalKey !== INTERNAL_API_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const avgElo = Number(request.nextUrl.searchParams.get("avgElo") ?? "0");

  const result = await db
    .select()
    .from(problems)
    .where(lte(problems.minElo, avgElo))
    .orderBy(sql`RANDOM()`)
    .limit(1);

  if (result.length === 0) {
    return NextResponse.json({ error: "No problems found" }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}
