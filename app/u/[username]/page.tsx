import React from "react";
import { db } from "@/src/db/db";
import { user, battles, problems } from "@/src/db/schema";
import { eq, or, desc, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trophy, Swords, Medal } from "lucide-react";
import ProfileChart from "./ProfileChart";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const username = decodeURIComponent(resolvedParams.username);

  // Fetch user
  const users = await db.select().from(user).where(eq(user.name, username)).limit(1);
  if (users.length === 0) {
    notFound();
  }
  const profileUser = users[0];

  // Fetch recent battles for the table
  const recentBattles = await db
    .select({
      id: battles.id,
      startedAt: battles.startedAt,
      winnerId: battles.winnerId,
      playerAId: battles.playerAId,
      playerBId: battles.playerBId,
      eloChangeA: battles.eloChangeA,
      eloChangeB: battles.eloChangeB,
      problemTitle: problems.title,
    })
    .from(battles)
    .leftJoin(problems, eq(battles.problemId, problems.id))
    .where(or(eq(battles.playerAId, profileUser.id), eq(battles.playerBId, profileUser.id)))
    .orderBy(desc(battles.startedAt))
    .limit(10);

  // Fetch all battles for the chart to show progression over time
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

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1 -ml-2">
              <ChevronLeft className="w-4 h-4" /> Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full px-4 py-8 space-y-8 flex-1">
        {/* Profile Header */}
        <section className="bg-card border rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-4xl font-bold text-primary">{profileUser.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{profileUser.name}</h1>
            <p className="text-muted-foreground">Joined {new Date(profileUser.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <div className="text-center">
              <div className="text-sm text-muted-foreground flex items-center gap-1 justify-center mb-1">
                <Trophy className="w-4 h-4 text-yellow-500" /> Current Elo
              </div>
              <div className="text-3xl font-bold text-yellow-500">{profileUser.elo}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground flex items-center gap-1 justify-center mb-1">
                <Swords className="w-4 h-4 text-blue-500" /> Battles
              </div>
              <div className="text-3xl font-bold">{profileUser.gamesPlayed}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground flex items-center gap-1 justify-center mb-1">
                <Medal className="w-4 h-4 text-purple-500" /> Peak
              </div>
              <div className="text-3xl font-bold">{profileUser.peakElo}</div>
            </div>
          </div>
        </section>

        {/* Elo Chart */}
        <section className="bg-card border rounded-2xl p-6 shadow-sm h-80">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            Rating Progression
          </h2>
          <div className="h-64 w-full">
            <ProfileChart data={chartData} />
          </div>
        </section>

        {/* Recent Matches */}
        <section className="bg-card border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            Recent Battles
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Result</th>
                  <th className="px-4 py-3">Problem</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 rounded-tr-lg text-right">Rating Change</th>
                </tr>
              </thead>
              <tbody>
                {recentBattles.map((b) => {
                  const isA = b.playerAId === profileUser.id;
                  const isDraw = b.winnerId === null;
                  const isWin = !isDraw && b.winnerId === profileUser.id;
                  const eloChange = isA ? b.eloChangeA : b.eloChangeB;
                  
                  return (
                    <tr key={b.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4 font-medium">
                        {isDraw ? (
                          <span className="text-slate-500">Draw</span>
                        ) : isWin ? (
                          <span className="text-green-500">Win</span>
                        ) : (
                          <span className="text-destructive">Loss</span>
                        )}
                      </td>
                      <td className="px-4 py-4">{b.problemTitle || "Random Match"}</td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {new Date(b.startedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-right font-medium">
                        <span className={eloChange > 0 ? "text-green-500" : eloChange < 0 ? "text-destructive" : "text-slate-500"}>
                          {eloChange > 0 ? "+" : ""}{eloChange}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {recentBattles.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                      No recent battles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
