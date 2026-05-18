"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Play } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";

const EnterBattlefield = () => {
  const router = useRouter();

  const [matchmakingState, setMatchmakingState] = useState("none");

  useEffect(() => {
    const socket = getSocket();

    const handleQueued = () => {
      console.log("queued event received");

      setMatchmakingState("queued");
    };

    const handleBattleStart = () => {
      router.replace("/battlefield");
    };

    socket.on("queued", handleQueued);
    socket.on("battle:start", handleBattleStart);

    socket.connect();

    return () => {
      socket.off("queued", handleQueued);
      socket.off("battle:start", handleBattleStart);
    };
  }, [router]);

  function handleQueueing() {
    const socket = getSocket();
    l;
    socket.emit("queue:enter", 1200);
  }

  return (
    <div className="flex flex-auto min-h-screen items-center justify-center">
      <Button size="lg" onClick={handleQueueing}>
        <HugeiconsIcon icon={Play} size={12} />
      </Button>

      {matchmakingState === "queued" && <p>queued</p>}
    </div>
  );
};

export default EnterBattlefield;
