import React from "react";
import CodeMirror from "@uiw/react-codemirror";
// we use the @uiw/codemirror-theme-vscode  theme
import { vscodeDark, vscodeDarkInit } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

const extensions = [javascript({ jsx: true })];

export default function CodeBlock({ code, handleEdit }) {
  const onChange = (value) => {
    handleEdit(value);
  };
  return (
    <CodeMirror
      className="m-4 w-full rounded-xl "
      height="80vh"
      linewrapping={"true"}
      value={code}
      theme={vscodeDark}
      extensions={extensions}
      onChange={onChange}
    />
  );
}
