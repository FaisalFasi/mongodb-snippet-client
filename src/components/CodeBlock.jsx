import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { basicLight, basicDark } from "@uiw/codemirror-theme-basic";

import { useContext } from "react";
import { SnippetContext } from "../Context/SnippetContext";

import { ApplicationSettingsContext } from "../Context/ApplicationContext";

import { markdown } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { python } from "@codemirror/lang-python";
import { json } from "@codemirror/lang-json";
import { java } from "@codemirror/lang-java";

const EXTENSIONS = {
  markdown: markdown(),
  python: python(),
  javascript: javascript(),
  typescript: javascript({ typescript: true }),
  jsx: javascript({ jsx: true }),
  tsx: javascript({ jsx: true, typescript: true }),
  cpp: cpp(),
  "c++": cpp(),
  html: html(),
  json: json(),
  java: java(),
};

export default function CodeBlock({ code, handleEdit }) {
  const { editor } = useContext(SnippetContext);
  const [snippet] = editor;
  const { darkMode } = useContext(ApplicationSettingsContext);

  const extensions = (() => {
    if (snippet.language === "plaintext") {
      return [];
    } else {
      return [EXTENSIONS[snippet.language]];
    }
  })();

  const onChange = (value) => {
    handleEdit(value);
  };

  return (
    <CodeMirror
      className="m-2 rounded-xl "
      height="60vh"
      value={code}
      theme={darkMode ? basicDark : basicLight}
      extensions={extensions}
      onChange={onChange}
      style={{ wordWrap: "break-word" }}
    />
  );
}
