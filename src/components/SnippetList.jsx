import React, { useState } from "react";
import { useEffect } from "react";
import SnippetListItem from "./SnippetListItem";
const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/snippets")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnippets(data);
      });
  }, []);

  const handleDelete = (shortId) => {
    fetch("http://localhost:9000/snippets/" + shortId, {
      method: "DELETE",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        alert("snippet deleted successfully");
        setSnippets((prev) => prev.filter((item) => item.shortId !== shortId));
      } else {
        alert("Something went wrong. please try again later");
      }
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {snippets.map((snippet) => (
        <SnippetListItem
          key={snippet.shortId}
          snippet={snippet}
          // handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default SnippetList;
