import { db } from "./src/db/db";
import { user, battles } from "./src/db/schema";
import { eq, or, asc } from "drizzle-orm";

async function run() {
  const users = await db.select().from(user).limit(1);
  if (!users.length) return console.log("No users");
  const profileUser = users[0];
  console.log("User:", profileUser.name, profileUser.elo);

  const allBattlesForChart = await db
    .select({
      id: battles.id,
      startedAt: battles.startedAt,
      playerAId: battles.playerAId,
      playerBId: battles.playerBId,
      eloBeforeA: battles.eloBeforeA,
      eloBeforeB: battles.eloBeforeB,
      eloChangeA: battles.eloChangeA,
      eloChangeB: battles.eloChangeB,
    })
    .from(battles)
    .where(or(eq(battles.playerAId, profileUser.id), eq(battles.playerBId, profileUser.id)))
    .orderBy(asc(battles.startedAt));

  console.log("Battles:", allBattlesForChart);
  
  // Build chart data
  const chartData: { date: string; elo: number }[] = [];
  // Add base point
  chartData.push({ date: "Start", elo: 1200 });

  allBattlesForChart.forEach((b) => {
    const isA = b.playerAId === profileUser.id;
    const newElo = isA ? b.eloBeforeA + b.eloChangeA : b.eloBeforeB + b.eloChangeB;
    const dateLabel = new Date(b.startedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    chartData.push({
      date: dateLabel,
      elo: newElo,
    });
  });
  console.log("Chart Data:", chartData);
}
run().then(() => process.exit(0));
