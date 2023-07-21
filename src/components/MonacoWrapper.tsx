import React, { FC, useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import * as ts from "typescript";

const MonacoWrapper = ({ originalCode }) => {
  const monaco = useMonaco();
  const [monacoReady, setMonacoReady] = useState(false);

  useEffect(() => {
    if (!monaco) {
      // Monaco editor is not ready yet, or it lacks required methods.
      // You can either wait for the next render cycle or return early.
      return;
    }
    // Mark monaco as ready
    setMonacoReady(true);
  }, [monaco]);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    if (!monacoReady) {
      // ** monaco is not ready yet, wait for it to be ready ** //
      return;
    }
  };

  const handleValidate = (cases) => {
    // ** here is error cases ** //
    console.log(cases);
  };
  const handleChange = (code) => {
    // ** here is all text ** //
    console.log(code);
  };

  return (
    <>
      <h4>Code</h4>
      <Editor
        height="60vh"
        width="90vw"
        theme="light"
        defaultLanguage="typescript"
        onValidate={handleValidate}
        defaultValue={originalCode}
        onMount={handleEditorDidMount}
        onChange={handleChange}
      />
    </>
  );
};

export default MonacoWrapper;
