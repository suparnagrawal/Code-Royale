"use client";
import { Editor } from "@monaco-editor/react";
import React, { useState } from "react";

const AttackPanel = () => {
  const [code, setCode] = useState("");

  function handleEditorChange(value: string | undefined) {
    console.log("here is the current model value:", value);
  }

  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      <div className="col-span-2 overflow-hidden border rounded-md">
        <Editor
          height={"100%"}
          language="cpp"
          defaultValue="class Solution:"
          theme="vs-dark"
          onChange={handleEditorChange}
        ></Editor>
      </div>
    </div>
  );
};

export default AttackPanel;
