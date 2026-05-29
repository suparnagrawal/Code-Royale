"use client";

import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type BattleNavbarProps = {
  problems: { id: string; title: string; testCases: any[] }[];
  currentProblemIndex: number;
  setCurrentProblemIndex: (index: number) => void;
  questionStatus: ("not_attempted" | "0_passed" | "partially_passed" | "fully_passed")[];
  opponentQuestionStatus: ("not_attempted" | "0_passed" | "partially_passed" | "fully_passed")[];
  passedCounts: number[];
  onRun?: () => void;
  onSubmit?: () => void;
  isRunning?: boolean;
  isSubmitting?: boolean;
  isSubmitted?: boolean;
};

const BattlefieldNavBar = ({
  problems,
  currentProblemIndex,
  setCurrentProblemIndex,
  questionStatus,
  opponentQuestionStatus,
  passedCounts,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
  isSubmitted,
}: BattleNavbarProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "not_attempted": return "bg-muted text-muted-foreground";
      case "0_passed": return "bg-destructive/20 text-destructive border-destructive/50 border";
      case "partially_passed": return "bg-yellow-500/20 text-yellow-600 border-yellow-500/50 border dark:text-yellow-400";
      case "fully_passed": return "bg-green-500/20 text-green-600 border-green-500/50 border dark:text-green-400";
      default: return "bg-muted";
    }
  };

  const getOpponentColor = (status: string) => {
    switch (status) {
      case "not_attempted": return "bg-muted";
      case "0_passed": return "bg-destructive";
      case "partially_passed": return "bg-yellow-500";
      case "fully_passed": return "bg-green-500";
      default: return "bg-muted";
    }
  };

  return (
    <header className="h-14 border-b bg-background flex items-center px-4">
      {/* LEFT - Question Navigation */}
      <div className="flex-1 flex items-center gap-2 overflow-x-auto">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => window.location.href = "/controlBooth"}>
          Resign
        </Button>
        <Separator orientation="vertical" className="h-6 mx-2" />
        
        <div className="flex gap-2 items-center">
          {problems.map((p, i) => (
            <Button
              key={i}
              variant={currentProblemIndex === i ? "default" : "secondary"}
              size="sm"
              onClick={() => setCurrentProblemIndex(i)}
              className={`w-10 h-8 font-mono text-xs ${currentProblemIndex !== i ? getStatusColor(questionStatus[i]) : ""}`}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* CENTER - Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="default"
          onClick={onRun}
          disabled={isRunning || isSubmitting}
        >
          {isRunning ? "Running..." : "Run"}
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <div className="text-sm font-medium truncate max-w-[200px] text-center">
          {problems[currentProblemIndex].title}
        </div>

        <Separator orientation="vertical" className="h-6" />

        <Button
          size="default"
          onClick={onSubmit}
          disabled={isSubmitting || isSubmitted || isRunning}
          className={questionStatus[currentProblemIndex] === "fully_passed" ? "bg-green-600 hover:bg-green-700 text-white" : ""}
        >
          {questionStatus[currentProblemIndex] === "fully_passed"
            ? "Passed ✓"
            : isSubmitting
              ? "Submitting..."
              : "Submit"}
        </Button>
      </div>

      {/* RIGHT - Opponent Status */}
      <div className="flex-1 flex justify-end items-center gap-3">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Opponent</span>
        <div className="flex gap-1.5 items-center bg-muted/50 p-1.5 rounded-full border">
          {problems.map((_, i) => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-full shadow-sm transition-colors duration-300 ${getOpponentColor(opponentQuestionStatus[i])}`}
              title={`Problem ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default BattlefieldNavBar;
