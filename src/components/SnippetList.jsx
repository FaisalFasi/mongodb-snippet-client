import React, { useContext, useState } from "react";
import SnippetListItem from "./SnippetListItem";
import { SnippetContext } from "../Context/SnippetContext";

const SnippetList = () => {
  const { snippetList } = useContext(SnippetContext);
  const [snippets] = snippetList;

  return (
    <div className="flex flex-col w-full  rounded-xl p-2 gap-2 ">
      {snippets.map((snippet) => {
        return <SnippetListItem key={snippet.shortId} snippet={snippet} />;
      })}
    </div>
  );
};

export default SnippetList;
