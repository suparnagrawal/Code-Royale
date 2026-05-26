"use client";

import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type BattleNavbarProps = {
  missionName: string;
};

const BattlefieldNavBar = ({
  missionName,
}: BattleNavbarProps) => {
  return (
    <header className="h-14 border-b bg-background flex items-center px-4">
      {/* LEFT */}
      <div className="flex-1 flex items-center">
        <Button variant="destructive" size="default">
          Resign
        </Button>
      </div>

      {/* CENTER */}
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="default">
          Run
        </Button>

        <Separator orientation="vertical" />

        <div className="text-medium font-light truncate max-w-62.5">
          {missionName}
        </div>

        <Separator orientation="vertical" />

        <Button size="default">Submit</Button>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex justify-end items-center gap-2">
        {/* future controls */}
      </div>
    </header>
  );
};

export default BattlefieldNavBar;
