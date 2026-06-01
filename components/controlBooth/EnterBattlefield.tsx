"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Play } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";

const EnterBattlefield = ({ elo = 1200 }: { elo?: number }) => {
  const router = useRouter();

  const [matchmakingState, setMatchmakingState] = useState("none");
  const [gameLength, setGameLength] = useState<1 | 3 | 5>(1);

  useEffect(() => {
    let active = true;

    async function initSocket() {
      try {
        const res = await fetch("/api/socket-ticket", { method: "POST" });
        if (!res.ok) {
          console.error("Failed to get socket ticket", res.status);
          return;
        }
        
        const { ticket } = await res.json();
        if (!active) return;

        const socket = getSocket(ticket);

        const handleQueued = () => {
          console.log("queued event received");
          setMatchmakingState("queued");
        };

        const handleBattleStart = () => {
          router.replace(`/battlefield`);
        };

        socket.on("queued", handleQueued);
        socket.on("battle:start", handleBattleStart);
        socket.on("battle:ongoing", handleBattleStart);

        socket.connect();
      } catch (error) {
        console.error("Error initializing socket:", error);
      }
    }

    initSocket();

    return () => {
      active = false;
      const socket = getSocket();
      socket.off("queued");
      socket.off("battle:start");
      socket.off("battle:ongoing");
    };
  }, [router]);

  function handleQueueing() {
    const socket = getSocket();
    socket.emit("queue:enter", { elo, gameLength });
  }

  return (
    <div className="flex flex-auto min-h-screen items-center justify-center flex-col gap-6">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-muted-foreground">Mode:</label>
        <select 
          className="bg-background border rounded-md px-3 py-2 text-sm"
          value={gameLength} 
          onChange={(e) => setGameLength(Number(e.target.value) as 1 | 3 | 5)}
          disabled={matchmakingState === "queued"}
        >
          <option value={1}>Quick (1 Problem)</option>
          <option value={3}>Classic (3 Problems)</option>
          <option value={5}>Long (5 Problems)</option>
        </select>
      </div>

      <Button size="lg" onClick={handleQueueing} disabled={matchmakingState === "queued"}>
        <HugeiconsIcon icon={Play} size={12} className="mr-2" />
        {matchmakingState === "queued" ? "In Queue..." : "Find Match"}
      </Button>

      {matchmakingState === "queued" && <p className="text-sm text-muted-foreground animate-pulse">Searching for opponent...</p>}
    </div>
  );
};

export default EnterBattlefield;
