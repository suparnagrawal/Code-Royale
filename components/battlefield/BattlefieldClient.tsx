"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import AttackPanel from "@/components/battlefield/AttackPanel";
import BattlefieldNavBar from "@/components/battlefield/BattlefieldNavbar";
import Mission from "@/components/battlefield/Mission";
import StatusPanel, {
  type TestCaseResult,
} from "@/components/battlefield/StatusPanel";
import { getSocket } from "@/lib/socket";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

type TestCase = {
  input: string;
  expectedOutput: string;
  isExample: boolean;
};

type BattlefieldClientProps = {
  problems: {
    id: string;
    title: string;
    description: string;
    testCases: TestCase[];
    starterCode?: Record<string, string>;
  }[];
  languageId: number;
};

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function BattlefieldClient({
  problems,
  languageId,
}: BattlefieldClientProps) {
  let langKey = "";
  if (languageId === 54) langKey = "cpp";
  else if (languageId === 63) langKey = "javascript";
  else if (languageId === 71) langKey = "python";

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const problem = problems[currentProblemIndex];

  // We need to keep track of code for all problems!
  const defaultCodes = problems.map((p) => (p.starterCode && langKey) ? p.starterCode[langKey] : "");
  const codeRefs = useRef<string[]>(defaultCodes);

  // We also need results per problem
  const [resultsByProblem, setResultsByProblem] = useState<TestCaseResult[][]>(
    problems.map(() => [])
  );

  const [questionStatus, setQuestionStatus] = useState<("not_attempted" | "0_passed" | "partially_passed" | "fully_passed")[]>(
    problems.map(() => "not_attempted")
  );
  const [passedCounts, setPassedCounts] = useState<number[]>(problems.map(() => 0));

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // A battle is fully submitted if ALL questions are fully_passed
  const isSubmitted = questionStatus.every(status => status === "fully_passed");

  const exampleCases = problem.testCases.filter((tc) => tc.isExample);

  const handleCodeChange = useCallback((code: string) => {
    codeRefs.current[currentProblemIndex] = code;
  }, [currentProblemIndex]);

  const updateStatusAndEmit = (index: number, status: typeof questionStatus[0], passedCount: number) => {
    setQuestionStatus((prev) => {
      const next = [...prev];
      next[index] = status;
      return next;
    });
    setPassedCounts((prev) => {
      const next = [...prev];
      next[index] = passedCount;
      return next;
    });

    const socket = getSocket();
    socket.emit("opponent:status_update", {
      problemIndex: index,
      status,
      passedCount,
    });
  };

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    const currentIndex = currentProblemIndex;
    const currentResults = [...resultsByProblem];
    currentResults[currentIndex] = [];
    setResultsByProblem(currentResults);

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: problem.id,
          code: codeRefs.current[currentIndex],
          languageId,
          testCases: problem.testCases,
          runAll: false,
        }),
      });

      if (!res.ok) {
        console.error("Execute failed:", res.status);
        return;
      }

      const data = await res.json();
      setResultsByProblem((prev) => {
        const next = [...prev];
        next[currentIndex] = data.results;
        return next;
      });
    } catch (err) {
      console.error("Run error:", err);
    } finally {
      setIsRunning(false);
    }
  }, [languageId, problem.id, problem.testCases, currentProblemIndex, resultsByProblem]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    const currentIndex = currentProblemIndex;
    
    setResultsByProblem((prev) => {
      const next = [...prev];
      next[currentIndex] = [];
      return next;
    });

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: problem.id,
          code: codeRefs.current[currentIndex],
          languageId,
          testCases: problem.testCases,
          runAll: true,
        }),
      });

      if (!res.ok) {
        console.error("Execute failed:", res.status);
        return;
      }

      const data = await res.json();
      const testResults: TestCaseResult[] = data.results;

      // For hidden test cases, mask the input
      const maskedResults = testResults.map((r) => ({
        ...r,
        input: r.isExample ? r.input : "(hidden)",
        expected: r.isExample ? r.expected : "(hidden)",
      }));

      setResultsByProblem((prev) => {
        const next = [...prev];
        next[currentIndex] = maskedResults;
        return next;
      });

      const passedAmount = testResults.filter(r => r.passed).length;
      const allPassedForThisProblem = passedAmount === problem.testCases.length;

      let newStatus: typeof questionStatus[0] = "0_passed";
      if (allPassedForThisProblem) {
        newStatus = "fully_passed";
      } else if (passedAmount > 0) {
        newStatus = "partially_passed";
      }
      
      updateStatusAndEmit(currentIndex, newStatus, passedAmount);

      // Check overall win condition
      setQuestionStatus((prevStatus) => {
        const tempStatus = [...prevStatus];
        tempStatus[currentIndex] = newStatus;
        
        const allQuestionsFullyPassed = tempStatus.every(s => s === "fully_passed");
        if (allQuestionsFullyPassed) {
          const socket = getSocket();
          socket.emit("code:submitted", {
            roomId: "", // Room ID inferred server-side
            passedAll: true,
          });
        }
        return tempStatus;
      });

    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [languageId, problem.id, problem.testCases, currentProblemIndex]);

  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const [battleResult, setBattleResult] = useState<"win" | "loss" | null>(null);

  const [opponentQuestionStatus, setOpponentQuestionStatus] = useState<("not_attempted" | "0_passed" | "partially_passed" | "fully_passed")[]>(
    problems.map(() => "not_attempted")
  );

  useEffect(() => {
    const socket = getSocket();

    socket.on("battle:result", ({ winnerId }) => {
      if (!currentUserId) return;
      if (winnerId === currentUserId) {
        setBattleResult("win");
      } else {
        setBattleResult("loss");
      }
    });

    socket.on("opponent:status_update", ({ problemIndex, status }) => {
      setOpponentQuestionStatus((prev) => {
        const next = [...prev];
        if (next[problemIndex]) {
          next[problemIndex] = status;
        }
        return next;
      });
    });

    return () => {
      socket.off("battle:result");
      socket.off("opponent:status_update");
    };
  }, [currentUserId]);

  return (
    <main className="h-screen flex flex-col relative">
      {/* Battle Result Overlay */}
      {battleResult && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 p-10 bg-card border rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300">
            <h1 className={`text-4xl font-bold ${battleResult === "win" ? "text-green-500" : "text-destructive"}`}>
              {battleResult === "win" ? "You Won! 🏆" : "You Lost 💔"}
            </h1>
            <p className="text-muted-foreground text-center">
              {battleResult === "win"
                ? "Excellent work! Your code passed all test cases first."
                : "Your opponent finished before you. Keep practicing!"}
            </p>
            <Button size="lg" onClick={() => window.location.href = "/controlBooth"}>
              Back to Lobby
            </Button>
          </div>
        </div>
      )}

      <BattlefieldNavBar
        problems={problems}
        currentProblemIndex={currentProblemIndex}
        setCurrentProblemIndex={setCurrentProblemIndex}
        questionStatus={questionStatus}
        opponentQuestionStatus={opponentQuestionStatus}
        passedCounts={passedCounts}
        onRun={handleRun}
        onSubmit={handleSubmit}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
      />
      <section className="p-2 flex flex-1 flex-col overflow-hidden">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={35} minSize={15}>
            <div className="h-full overflow-hidden pb-1">
              <Mission
                title={problem.title}
                description={problem.description}
                examples={exampleCases}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle className="my-1 bg-border/50" />
          <ResizablePanel defaultSize={65} minSize={20}>
            <div className="h-full overflow-hidden pt-1">
              <AttackPanel
                currentProblemIndex={currentProblemIndex}
                initialCode={codeRefs.current[currentProblemIndex]}
                onCodeChange={handleCodeChange}
                results={resultsByProblem[currentProblemIndex]}
                isRunning={isRunning || isSubmitting}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </main>
  );
}
