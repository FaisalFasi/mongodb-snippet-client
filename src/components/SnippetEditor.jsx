import { useParams } from "react-router-dom";
import SnippetList from "./SnippetList";
// ==============================================
import React, { useContext, useState } from "react";
import { useEffect } from "react";

import CodeBlock from "./CodeBlock";
import { SnippetContext } from "../Context/SnippetContext";

const SnippetEditor = () => {
  let { snippet_id } = useParams();

  const { editor } = useContext(SnippetContext);
  const [snippet, setSnippet] = editor;

  const handleEdit = (value) => {
    setSnippet({ ...snippet, content: value });
  };

  useEffect(() => {
    if (!snippet_id) {
      return;
    }
    fetch(import.meta.env.VITE_SNIPPET_API_KEY + "/snippets/" + snippet_id)
      .then((res) => res.json())
      .then((data) => {
        setSnippet(data);
      });
  }, []);

  return (
    <div className=" flex flex-col w-full h-screen">
      <div className="flex-col flex md:flex-row justify-between mr-4">
        <div className="w-screen md:60">
          <CodeBlock code={snippet.content} handleEdit={handleEdit} />
        </div>
        <div className="ml-4 md:ml-0 flex justify-center">
          <SnippetList />
        </div>
      </div>
    </div>
  );
};

export default SnippetEditor;
