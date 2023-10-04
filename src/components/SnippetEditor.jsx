import SnippetList from "./SnippetList";
import React, { useContext } from "react";

import CodeBlock from "./CodeBlock";
import { SnippetContext } from "../Context/SnippetContext";

const SnippetEditor = () => {
  const { editor } = useContext(SnippetContext);
  const [snippet, setSnippet] = editor;

  const handleEdit = (value) => {
    setSnippet({ ...snippet, content: value });
  };

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
