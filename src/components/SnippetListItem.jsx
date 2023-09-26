import React from "react";
import relativeDate from "../utils/relativeDate";
const SnippetListItem = ({ snippet, handleDelete }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        margin: "10px",
        textAlign: "center",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <a href={`/${snippet.shortId} `}>
          {snippet.title || " untitled Snippet"}
        </a>
      </div>
      <p>{relativeDate(new Date(snippet.updatedAt))}...</p>
    </div>
  );
};

export default SnippetListItem;
