import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/src/db/db";
import { user, battles } from "@/src/db/schema";
import { count, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Sword, Trophy, Zap, Shield, ChevronRight } from "lucide-react";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = !!session?.user;

  // Fetch stats from DB
  const [{ count: rawTotalBattles }] = await db.select({ count: count() }).from(battles);
  const totalBattles = Math.floor(rawTotalBattles / 2);
  const [{ count: totalPlayers }] = await db.select({ count: count() }).from(user);

  // Fetch top 5 players for leaderboard
  const topPlayers = await db.select({
    id: user.id,
    name: user.name,
    elo: user.elo,
    gamesPlayed: user.gamesPlayed
  })
    .from(user)
    .orderBy(desc(user.elo))
    .limit(5);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sword className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">Code Royale</span>
          </div>
          <nav className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link href="/controlBooth">
                <Button variant="default">Go to Control Booth</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="default">Login / Signup</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 flex flex-col items-center text-center px-4">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl relative z-10">
          The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Competitive Coding</span> Arena
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-10 relative z-10">
          Battle against developers worldwide in real-time. Solve algorithms faster than your opponent, climb the Elo rating ladder, and claim your spot at the top.
        </p>
        <div className="flex gap-4 relative z-10">
          <Link href={isLoggedIn ? "/controlBooth" : "/login"}>
            <Button size="lg" className="h-14 px-8 text-lg rounded-full">
              {isLoggedIn ? "Enter Queue" : "Start Playing for Free"}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Live Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border rounded-2xl bg-card/40 backdrop-blur-sm p-8 relative z-10 max-w-4xl w-full">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary">{totalBattles.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground font-medium mt-1">Total Battles</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-500">{totalPlayers.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground font-medium mt-1">Registered Coders</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-500">1v1</span>
            <span className="text-sm text-muted-foreground font-medium mt-1">Real-time PvP</span>
          </div>
        </div>
      </section>

      {/* How it Works & Leaderboard */}
      <section className="py-20 bg-muted/30 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: Features */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">How it works</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">1. Instant Matchmaking</h3>
                    <p className="text-muted-foreground">Queue up and instantly get matched with a player of similar skill based on your Elo rating.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Sword className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2. Real-time Combat</h3>
                    <p className="text-muted-foreground">Solve 1 to 5 algorithms. Watch your opponent type in real-time and see their test case progress live.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">3. Climb the Ladder</h3>
                    <p className="text-muted-foreground">Win battles to increase your Elo rating. Become the highest-rated coder in the arena.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Leaderboard */}
          <div>
            <div className="bg-card border rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Global Leaderboard
                </h3>
              </div>
              <div className="divide-y">
                {topPlayers.map((player, idx) => (
                  <Link href={`/u/${player.name}`} key={player.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className={`w-6 text-center font-bold ${idx === 0 ? "text-yellow-500" : idx === 1 ? "text-slate-300" : idx === 2 ? "text-amber-600" : "text-muted-foreground"}`}>
                        #{idx + 1}
                      </span>
                      <div className="font-semibold">{player.name}</div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-muted-foreground">{player.gamesPlayed} games</div>
                      <div className="font-bold text-primary w-12 text-right">{player.elo}</div>
                    </div>
                  </Link>
                ))}
                {topPlayers.length === 0 && (
                  <div className="px-6 py-8 text-center text-muted-foreground">
                    No players ranked yet. Be the first!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t text-center text-muted-foreground text-sm mt-auto">
        <p>© {new Date().getFullYear()} Code Royale. Built for competitive coders.</p>
      </footer>
    </main>
  );
}
