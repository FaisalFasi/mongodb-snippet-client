import React, { useContext, useState } from "react";
import { useEffect } from "react";
import SnippetListItem from "./SnippetListItem";
import { SnippetContext } from "../Context/SnippetContext";

const SnippetList = () => {
  const { snippetList } = useContext(SnippetContext);
  const [snippets, setSnippets] = snippetList;

  useEffect(() => {
    fetch(import.meta.env.VITE_SNIPPET_API_KEY + "/snippets")
      .then((res) => res.json())
      .then((data) => {
        setSnippets(data);
      });
  }, []);

  return (
    <div className="flex flex-col h-[80vh] w-[300px] bg-blue-400 rounded-xl mt-4 overflow-hidden overflow-y-scroll">
      {snippets.map((snippet) => {
        return <SnippetListItem key={snippet.shortId} snippet={snippet} />;
      })}
    </div>
  );
};

export default SnippetList;
