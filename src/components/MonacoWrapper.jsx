import React, { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import checkTypes from "../utils/checkTypes";

const MonacoWrapper = ({ originalCode, originalTest }) => {
  const monaco = useMonaco();
  const [monacoReady, setMonacoReady] = useState(false);
  const [diagnostics, setDiagnostics] = useState([]);

  useEffect(() => {
    if (!monaco) {
      return;
    }
    setMonacoReady(true);
  }, [monaco]);

  const handleEditorDidMount = (editor) => {
    if (!monacoReady) return;
  };

  const handleValidate = (cases) => {
    console.log(cases);
  };

  const handleChange = (code) => {
    setDiagnostics(checkTypes(code, originalTest));
  };

  return (
    <div className="container">
      <div className="editors">
        <h4>Code</h4>
        <Editor
          height="60vh"
          width="50vw"
          theme="light"
          defaultLanguage="typescript"
          onValidate={handleValidate}
          defaultValue={originalCode}
          onMount={handleEditorDidMount}
          onChange={handleChange}
        />
        <Editor
          height="20vh"
          width="50vw"
          theme="light"
          defaultLanguage="typescript"
          onValidate={handleValidate}
          defaultValue={originalTest}
          onMount={handleEditorDidMount}
          onChange={handleChange}
        />
      </div>
      <div className="diagnostic">
        <h4>Errors</h4>
        <div className="messages">
          {/* {diagnostics} */}
          <ul>
          {diagnostics.map((message, index) => (
            <div key={index}>
              <li>{message}</li>
            </div>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MonacoWrapper;
