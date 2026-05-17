"use client";

import { getSocket } from "@/lib/socket";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

const AttackPanel = () => {
  const socket = getSocket();

  const [code, setCode] = useState("");
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
  }

  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      <div className="col-span-2 overflow-hidden border rounded-md">
        <Editor
          height="100%"
          language="cpp"
          value={code}
          theme="vs-dark"
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
          }}
        />
      </div>

      <div className="col-span-2 overflow-y-auto border rounded-md">
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
          }}
        />
      </div>
    </div>
  );
};

export default AttackPanel;
