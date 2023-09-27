import React, { useContext, useState } from "react";
import { useEffect } from "react";
import SnippetListItem from "./SnippetListItem";
import { SnippetContext } from "../Context/SnippetContext";

const SnippetList = () => {
  const { snippetList } = useContext(SnippetContext);
  const [snippets, setSnippets] = snippetList;

  useEffect(() => {
    fetch("http://localhost:9000/snippets")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnippets(data);
      });
  }, []);

  return (
    <div className="flex flex-col h-[90%] w-[300px] bg-blue-400 rounded-xl mt-4 overflow-scroll">
      {snippets.map((snippet) => (
        <SnippetListItem key={snippet.shortId} snippet={snippet} />
      ))}
    </div>
  );
};

export default SnippetList;
