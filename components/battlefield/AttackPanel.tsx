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
  currentProblemIndex: number;
  oppCode: string;
};

const AttackPanel = ({ initialCode = "", onCodeChange, results = [], isRunning = false, currentProblemIndex, oppCode }: AttackPanelProps) => {
  const socket = getSocket();

  const [code, setCode] = useState(initialCode);

  const handleEmit = useMemo(
    () =>
      debounce(
        (value: string, pIndex: number) => {
          socket.emit("typing:preview", { preview: value, problemIndex: pIndex });
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

  // When the user switches problems, update the editor and broadcast the new view to the opponent
  useEffect(() => {
    setCode(initialCode || "");
    handleEmit(initialCode || "", currentProblemIndex);
  }, [currentProblemIndex, initialCode, handleEmit]);

  function handleEditorChange(value: string | undefined) {
    const newVal = value || "";

    setCode(newVal);
    handleEmit(newVal, currentProblemIndex);
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
            onChange={(value) => {
              setCode(value || "");
              onCodeChange?.(value || "");
              handleEmit(value || "", currentProblemIndex);
            }}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              quickSuggestions: false,
              suggestOnTriggerCharacters: false,
              acceptSuggestionOnEnter: "off",
              tabCompletion: "off",
              wordBasedSuggestions: "off",
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
              <div 
                className="w-full h-full select-none"
                onCopy={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              >
                <Editor
                  height="100%"
                  language="cpp"
                  value={oppCode}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    cursorStyle: "line",
                    domReadOnly: true,
                    wordWrap: "on",
                    quickSuggestions: false,
                    contextmenu: false,
                    selectionHighlight: false,
                    selectionClipboard: false,
                  }}
                  onMount={(editor, monaco) => {
                    editor.onKeyDown((e: any) => {
                      if ((e.ctrlKey || e.metaKey) && (e.keyCode === monaco.KeyCode.KeyC || e.keyCode === monaco.KeyCode.KeyX || e.keyCode === monaco.KeyCode.Insert)) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    });
                    editor.onDidChangeCursorSelection((e: any) => {
                      if (e.reason === monaco.cursor.CursorChangeReason.Explicit) {
                        editor.setSelection(new monaco.Selection(1, 1, 1, 1));
                      }
                    });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default AttackPanel;
