"use client";
import { Editor } from "@monaco-editor/react";
import React from "react";

const MonacoEditor = () => {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      theme="vs-dark"
    />
  );
};

export default MonacoEditor;
