"use client";

import React, { useCallback, useRef, useState } from "react";
import AttackPanel from "@/components/battlefield/AttackPanel";
import BattlefieldNavBar from "@/components/battlefield/BattlefieldNavbar";
import Mission from "@/components/battlefield/Mission";
import StatusPanel, {
  type TestCaseResult,
} from "@/components/battlefield/StatusPanel";
import { getSocket } from "@/lib/socket";

type TestCase = {
  input: string;
  expectedOutput: string;
  isExample: boolean;
};

type BattlefieldClientProps = {
  problem: {
    id: string;
    title: string;
    description: string;
    testCases: TestCase[];
    starterCode?: Record<string, string>;
  };
  languageId: number;
};

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function BattlefieldClient({
  problem,
  languageId,
}: BattlefieldClientProps) {
  let langKey = "";
  if (languageId === 54) langKey = "cpp";
  else if (languageId === 63) langKey = "javascript";
  else if (languageId === 71) langKey = "python";

  const defaultCode = (problem.starterCode && langKey) ? problem.starterCode[langKey] : "";

  const codeRef = useRef(defaultCode);
  const [results, setResults] = useState<TestCaseResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const exampleCases = problem.testCases.filter((tc) => tc.isExample);

  const handleCodeChange = useCallback((code: string) => {
    codeRef.current = code;
  }, []);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setResults([]);

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: problem.id,
          code: codeRef.current,
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
      setResults(data.results);
    } catch (err) {
      console.error("Run error:", err);
    } finally {
      setIsRunning(false);
    }
  }, [languageId, problem.testCases]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setResults([]);

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: problem.id,
          code: codeRef.current,
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

      setResults(maskedResults);

      const allPassed = 
        testResults.length === problem.testCases.length && 
        testResults.every((r) => r.passed);

      if (allPassed) {
        setIsSubmitted(true);

        const socket = getSocket();
        socket.emit("code:submitted", {
          roomId: "", // roomId would come from battle context
          passedAll: true,
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [languageId, problem.testCases]);

  return (
    <main className="h-screen flex flex-col">
      <BattlefieldNavBar
        missionName={problem.title}
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
                initialCode={defaultCode}
                onCodeChange={handleCodeChange}
                results={results}
                isRunning={isRunning || isSubmitting}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </main>
  );
}
