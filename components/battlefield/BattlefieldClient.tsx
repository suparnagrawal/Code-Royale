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
  startedAt: string;
};

import { getBattleProblems } from "@/app/battlefield/actions";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function BattlefieldGame({
  problems,
  languageId,
  startedAt,
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

  const handleResign = () => {
    const socket = getSocket();
    socket.emit("player:resign");
  };

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

  const [battleResult, setBattleResult] = useState<"win" | "loss" | "draw" | null>(null);
  const [eloData, setEloData] = useState<{ newElo: number; delta: number } | null>(null);

  const [opponentQuestionStatus, setOpponentQuestionStatus] = useState<("not_attempted" | "0_passed" | "partially_passed" | "fully_passed")[]>(
    problems.map(() => "not_attempted")
  );
  const [opponentPassedCounts, setOpponentPassedCounts] = useState<number[]>(
    problems.map(() => 0)
  );
  const [opponentCurrentProblemIndex, setOpponentCurrentProblemIndex] = useState<number | null>(null);
  const [oppCode, setOppCode] = useState<string>("");

  const [isOpponentReconnecting, setIsOpponentReconnecting] = useState(false);
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(30);
  const [opponentLeft, setOpponentLeft] = useState(false);

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const start = new Date(startedAt).getTime();
    const now = Date.now();
    const elapsed = now - start;
    const gameLengthMs = 30 * 60 * 1000;
    return Math.floor(Math.max(0, gameLengthMs - elapsed) / 1000);
  });

  useEffect(() => {
    if (battleResult) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [battleResult]);

  useEffect(() => {
    if (!isOpponentReconnecting || battleResult || opponentLeft) return;
    const interval = setInterval(() => {
      setReconnectTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpponentReconnecting, battleResult, opponentLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !battleResult) {
      const socket = getSocket();
      const myScore = passedCounts.reduce((acc, curr) => acc + curr, 0);
      const oppScore = opponentPassedCounts.reduce((acc, curr) => acc + curr, 0);
      socket.emit("game:timeout_end", { myScore, oppScore });
    }
  }, [timeLeft, battleResult, passedCounts, opponentPassedCounts]);

  useEffect(() => {
    const socket = getSocket();

    if (!socket.connected) {
      socket.connect();
      socket.once("connect", () => {
        socket.emit("battle:check_reconnect");
      });
    } else {
      socket.emit("battle:check_reconnect");
    }

    socket.on("battle:result", ({ winnerId, draw, eloUpdates }) => {
      if (!currentUserId) return;
      if (draw) {
        setBattleResult("draw");
      } else if (winnerId === currentUserId) {
        setBattleResult("win");
      } else {
        setBattleResult("loss");
      }

      if (eloUpdates && eloUpdates[currentUserId]) {
        setEloData(eloUpdates[currentUserId]);
      }
    });

    socket.on("opponent:status_update", ({ problemIndex, status, passedCount }) => {
      setOpponentQuestionStatus((prev) => {
        const next = [...prev];
        if (next[problemIndex] !== undefined) {
          next[problemIndex] = status;
        }
        return next;
      });
      if (passedCount !== undefined) {
        setOpponentPassedCounts((prev) => {
          const next = [...prev];
          next[problemIndex] = passedCount;
          return next;
        });
      }
    });

    socket.on("opponent:preview", ({ preview, problemIndex }) => {
      if (problemIndex !== undefined) {
        setOpponentCurrentProblemIndex(problemIndex);
      }
      if (preview !== undefined) {
        setOppCode(preview);
      }
    });

    socket.on("opponent:reconnecting", () => {
      setIsOpponentReconnecting(true);
      setReconnectTimeLeft(30);
    });

    socket.on("opponent:reconnected", () => {
      setIsOpponentReconnecting(false);
    });

    socket.on("opponent:left", () => {
      setIsOpponentReconnecting(false);
      setOpponentLeft(true);
      // Backend will also emit battle:result shortly after
    });

    return () => {
      socket.off("battle:result");
      socket.off("opponent:status_update");
      socket.off("opponent:preview");
      socket.off("opponent:reconnecting");
      socket.off("opponent:reconnected");
      socket.off("opponent:left");
    };
  }, [currentUserId, battleResult]);

  return (
    <main className="h-screen flex flex-col relative">
      {/* Battle Result Overlay */}
      {battleResult && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 p-10 bg-card border rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300">
            <h1 className={`text-4xl font-bold ${battleResult === "win" ? "text-green-500" : battleResult === "loss" ? "text-destructive" : "text-yellow-500"}`}>
              {battleResult === "win" ? "You Won! 🏆" : battleResult === "loss" ? "You Lost 💔" : "It's a Draw 🤝"}
            </h1>
            
            {eloData && (
              <div className="bg-muted/50 rounded-lg px-6 py-3 flex flex-col items-center gap-1 border">
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">New Elo Rating</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{eloData.newElo}</span>
                  <span className={`text-lg font-medium ${eloData.delta > 0 ? "text-green-500" : eloData.delta < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                    {eloData.delta > 0 ? `(+${eloData.delta})` : `(${eloData.delta})`}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-8 my-4 items-center justify-center">
               <div className="flex flex-col items-center">
                  <span className="text-sm text-muted-foreground uppercase">Your Score</span>
                  <span className="text-4xl font-mono font-bold text-primary">{passedCounts.reduce((a,b)=>a+b,0)}</span>
               </div>
               <div className="text-xl font-bold text-muted-foreground">VS</div>
               <div className="flex flex-col items-center">
                  <span className="text-sm text-muted-foreground uppercase">Opponent</span>
                  <span className={`text-4xl font-mono font-bold ${battleResult === "win" ? "text-destructive" : battleResult === "loss" ? "text-green-500" : "text-yellow-500"}`}>{opponentPassedCounts.reduce((a,b)=>a+b,0)}</span>
               </div>
            </div>
            <p className="text-muted-foreground text-center max-w-md">
              {timeLeft === 0 
                ? "Time's up! The winner was decided by total passed test cases."
                : battleResult === "win"
                  ? "Excellent work! Your code passed all test cases first."
                  : battleResult === "loss"
                    ? "Your opponent finished before you. Keep practicing!"
                    : "The battle ended in a draw!"}
            </p>
            <Button size="lg" onClick={() => window.location.href = "/controlBooth"}>
              Back to Lobby
            </Button>
          </div>
        </div>
      )}

      {/* Opponent Reconnecting Overlay */}
      {isOpponentReconnecting && !battleResult && !opponentLeft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card shadow-2xl border-yellow-500/30 border rounded-xl overflow-hidden p-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
              <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-yellow-500 mb-2">Opponent Disconnected</h2>
            <p className="text-muted-foreground text-sm">
              Waiting for them to reconnect. If they don't return within <strong className="text-yellow-500 text-base">{reconnectTimeLeft} seconds</strong>, they will forfeit the match.
            </p>
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
        opponentPassedCounts={opponentPassedCounts}
        opponentCurrentProblemIndex={opponentCurrentProblemIndex}
        timeLeft={timeLeft}
        onRun={handleRun}
        onSubmit={handleSubmit}
        onResign={handleResign}
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
                oppCode={oppCode}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </main>
  );
}

export default function BattlefieldClient({ languageId }: { languageId: number }) {
  const [problems, setProblems] = useState<any[]>([]);
  const [startedAt, setStartedAt] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    if (!socket.connected) {
      socket.connect();
    }

    const checkStatus = () => {
      socket.emit("battle:check_reconnect");
    };

    if (socket.connected) {
      checkStatus();
    } else {
      socket.once("connect", checkStatus);
    }

    const handleFailed = () => {
      window.location.href = "/controlBooth";
    };

    const handleSuccess = async ({ problemIds, startedAt }: { problemIds: string[], startedAt: string }) => {
      if (!problemIds || problemIds.length === 0) {
        handleFailed();
        return;
      }
      try {
        const fetched = await getBattleProblems(problemIds);
        if (!fetched || fetched.length === 0) {
          handleFailed();
          return;
        }
        setProblems(fetched);
        setStartedAt(startedAt);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch problems", err);
        setError(true);
      }
    };

    socket.on("battle:reconnect_failed", handleFailed);
    socket.on("battle:reconnect_success", handleSuccess);

    return () => {
      socket.off("battle:reconnect_failed", handleFailed);
      socket.off("battle:reconnect_success", handleSuccess);
    };
  }, []);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-destructive">Failed to load battlefield. Please return to the control booth.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground animate-pulse">Syncing battlefield...</p>
      </div>
    );
  }

  return <BattlefieldGame problems={problems} languageId={languageId} startedAt={startedAt} />;
}
