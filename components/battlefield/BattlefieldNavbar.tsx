"use client";

import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type BattleNavbarProps = {
  problems: { id: string; title: string; testCases: any[] }[];
  currentProblemIndex: number;
  setCurrentProblemIndex: (index: number) => void;
  questionStatus: ("not_attempted" | "0_passed" | "partially_passed" | "fully_passed")[];
  opponentQuestionStatus: ("not_attempted" | "0_passed" | "partially_passed" | "fully_passed")[];
  passedCounts: number[];
  opponentPassedCounts: number[];
  opponentCurrentProblemIndex?: number | null;
  timeLeft?: number;
  onRun?: () => void;
  onSubmit?: () => void;
  onResign?: () => void;
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
  opponentPassedCounts,
  opponentCurrentProblemIndex = null,
  timeLeft = 0,
  onRun,
  onSubmit,
  onResign,
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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="h-14 border-b bg-background flex items-center px-4">
      {/* LEFT - Question Navigation */}
      <div className="flex-1 flex items-center gap-3 overflow-x-auto">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
              Resign
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Resigning will immediately forfeit the match and decrease your Elo rating.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onResign} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Resign Match</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Separator orientation="vertical" className="h-5 my-auto" />
        
        <div className="flex gap-2 items-center px-1">
          {problems.map((p, i) => (
            <Button
              key={i}
              variant="secondary"
              size="sm"
              onClick={() => setCurrentProblemIndex(i)}
              className={`font-mono transition-all duration-200 ${
                currentProblemIndex === i 
                  ? "w-11 h-9 text-sm shadow-md scale-110 border-foreground/30" 
                  : "w-10 h-8 text-xs hover:scale-105"
              } ${getStatusColor(questionStatus[i])}`}
            >
              {questionStatus[i] !== "not_attempted" && currentProblemIndex !== i ? passedCounts[i] : String.fromCharCode(65 + i)}
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

        <Separator orientation="vertical" className="h-5 my-auto" />

        <div className="text-sm font-medium truncate max-w-[200px] text-center flex items-center justify-center">
          {problems[currentProblemIndex].title}
        </div>

        <Separator orientation="vertical" className="h-5 my-auto" />

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
      <div className="flex-1 flex justify-end items-center gap-3 overflow-x-auto">
        <div className="flex gap-2 items-center">
          {[...problems].reverse().map((_, revI) => {
            const i = problems.length - 1 - revI;
            return (
              <Button
                key={i}
                variant="secondary"
                size="sm"
                className={`font-mono transition-all duration-200 cursor-default ${
                  opponentCurrentProblemIndex === i
                    ? "w-11 h-9 text-sm shadow-md scale-110 border-foreground/30"
                    : "w-10 h-8 text-xs hover:bg-transparent"
                } ${getStatusColor(opponentQuestionStatus[i])}`}
              >
                {opponentQuestionStatus[i] !== "not_attempted" ? opponentPassedCounts[i] : String.fromCharCode(65 + i)}
              </Button>
            );
          })}
        </div>
        <Separator orientation="vertical" className="h-5 my-auto" />
        <div className="font-mono font-bold text-sm tracking-widest text-primary w-14 text-center">
          {formatTime(timeLeft)}
        </div>
      </div>
    </header>
  );
};

export default BattlefieldNavBar;
