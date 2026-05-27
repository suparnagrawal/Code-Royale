"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export type TestCaseResult = {
  index: number;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  time: string;
  statusDescription: string;
  isExample: boolean;
  compileOutput?: string;
  stderr?: string;
};

type StatusPanelProps = {
  results: TestCaseResult[];
  isRunning: boolean;
};

const StatusPanel = ({ results, isRunning }: StatusPanelProps) => {
  if (isRunning) {
    return (
      <div className="flex h-full items-center justify-center py-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="text-sm">Running tests...</span>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex h-full items-center justify-center py-6">
        <span className="text-sm text-muted-foreground">
          Click Run to test your code against example cases
        </span>
      </div>
    );
  }

  const passedCount = results.filter((r) => r.passed).length;
  const allPassed = passedCount === results.length;

  return (
    <div className="flex flex-col h-full">
      <div className="py-3 px-4 border-b">
        <div className="text-sm font-medium flex items-center gap-2">
          <span>Results Summary</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              allPassed
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {passedCount}/{results.length} passed
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {results.map((r) => (
          <div
            key={r.index}
            className={`rounded-md border p-2.5 text-sm ${
              r.passed
                ? "border-green-500/30 bg-green-500/5"
                : "border-red-500/30 bg-red-500/5"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span>{r.passed ? "✅" : "❌"}</span>
              <span className="font-medium">
                {r.isExample
                  ? `Example ${r.index + 1}`
                  : `Test Case ${r.index + 1}`}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                {r.statusDescription} • {r.time}s
              </span>
            </div>
            {!r.passed && (
              <div className="mt-2 space-y-1 text-xs font-mono">
                {r.compileOutput ? (
                  <div>
                    <span className="text-muted-foreground">Compilation Error: </span>
                    <pre className="text-red-400 mt-1 whitespace-pre-wrap">{r.compileOutput}</pre>
                  </div>
                ) : r.stderr ? (
                  <div>
                    <span className="text-muted-foreground">Runtime Error: </span>
                    <pre className="text-red-400 mt-1 whitespace-pre-wrap">{r.stderr}</pre>
                  </div>
                ) : (
                  <>
                    {r.isExample && (
                      <div>
                        <span className="text-muted-foreground">Input: </span>
                        <span>{r.input}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Expected: </span>
                      <span className="text-green-400">{r.expected}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Actual: </span>
                      <span className="text-red-400">
                        {r.actual || "(no output)"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusPanel;
