"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Play } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";

const EnterBattlefield = () => {
  const socket = getSocket();
  const router = useRouter();
  socket.connect();
  const [matchmakingState, setmatchMakingState] = useState("none");

  function handleQueueing() {
    socket.emit("queue:enter", 1200);
  }

  useEffect(() => {
    socket.on("queued", () => {
      setmatchMakingState("queued");
    });
  });

  useEffect(() => {
    socket.on("battle:start", () => {
      router.replace("/battlefield");
    });
  });

  return (
    <div className="flex flex-auto min-h-screen items-center justify-center">
      <Button size={"lg"} className="" onClick={handleQueueing}>
        <HugeiconsIcon icon={Play} size={12}></HugeiconsIcon>
      </Button>
      {matchmakingState === "queued" && <p>queued</p>}
    </div>
  );
};

export default EnterBattlefield;
