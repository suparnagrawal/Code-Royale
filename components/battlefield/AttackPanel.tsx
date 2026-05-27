"use client";

import { getSocket } from "@/lib/socket";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import StatusPanel, { type TestCaseResult } from "./StatusPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type AttackPanelProps = {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  results?: TestCaseResult[];
  isRunning?: boolean;
};

const AttackPanel = ({ initialCode = "", onCodeChange, results = [], isRunning = false }: AttackPanelProps) => {
  const socket = getSocket();

  const [code, setCode] = useState(initialCode);
  const [oppCode, setOppCode] = useState("");

  const handleEmit = useMemo(
    () =>
      debounce(
        (value: string) => {
          socket.emit("typing:preview", { preview: value });
        },
        300,
        { maxWait: 2000 },
      ),
    [socket],
  );

  useEffect(() => {
    return () => {
      handleEmit.cancel();
    };
  }, [handleEmit]);

  useEffect(() => {
    function handlePreview(data: { preview: string }) {
      setOppCode(data.preview);
    }

    socket.on("opponent:preview", handlePreview);

    return () => {
      socket.off("opponent:preview", handlePreview);
    };
  }, [socket]);

  function handleEditorChange(value: string | undefined) {
    const newVal = value || "";

    setCode(newVal);
    handleEmit(newVal);
    onCodeChange?.(newVal);
  }

  const [activeTab, setActiveTab] = useState<"opponent" | "results">("opponent");

  useEffect(() => {
    if (isRunning) {
      setActiveTab("results");
    }
  }, [isRunning]);



  return (
    <ResizablePanelGroup orientation="horizontal" className="h-full rounded-md border">
      <ResizablePanel defaultSize={50} minSize={20}>
        <div className="h-full overflow-hidden flex flex-col relative bg-background">
          <Editor
            height="100%"
            language="cpp"
            value={code}
            theme="vs-dark"
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
            }}
          />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle className="mx-1 bg-border/50" />

      <ResizablePanel defaultSize={50} minSize={20}>
        <div className="h-full overflow-hidden flex flex-col relative bg-card">
          <div className="flex items-center border-b bg-muted/30 gap-1">
            <button
              onClick={() => setActiveTab("opponent")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "opponent"
                  ? "border-primary text-primary bg-muted/50"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Opponent
            </button>
            <button
              onClick={() => setActiveTab("results")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "results"
                  ? "border-primary text-primary bg-muted/50"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Results
              {(results.length > 0 || isRunning) && (
                <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
              )}
            </button>
          </div>

          <div className="flex-1 relative overflow-hidden flex flex-col">
            {activeTab === "results" ? (
              <div className="absolute inset-0 z-20 flex flex-col overflow-y-auto">
                <StatusPanel results={results} isRunning={isRunning} />
              </div>
            ) : (
              <Editor
                height="100%"
                language="cpp"
                value={oppCode}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  cursorStyle: "block",
                  domReadOnly: true,
                  wordWrap: "on",
                }}
              />
            )}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default AttackPanel;
