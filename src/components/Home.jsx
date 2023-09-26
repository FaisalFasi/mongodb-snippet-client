import React from "react";
import SnippetCreationForm from "./SnippetCreationForm";
import SnippetEditor from "./SnippetEditor";
import SnippetList from "./SnippetList";

function Home() {
  return (
    <div className="flex">
      <SnippetEditor />
    </div>
  );
}

export default Home;
