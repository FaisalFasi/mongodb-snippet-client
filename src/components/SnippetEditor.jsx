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
    <div className="flex flex-col w-screen ">
      <div className="max-w-[100vw] m-8 border-2 border-solid border-black rounded-md overflow-hidden">
        <CodeBlock code={snippet.content} handleEdit={handleEdit} />
      </div>
      <div className=" m-8 border-2 border-solid  border-black rounded-md ">
        <SnippetList />
      </div>
    </div>
  );
};

export default SnippetEditor;
