import React from "react";

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
          justifyContent: "space-between",
        }}
      >
        <span>{snippet.shortId}</span>

        <a
          href={`/${snippet.shortId} `}
          style={{
            target: "_blank",
          }}
        >
          <span>{snippet.title}</span>
        </a>

        <span>{new Date(snippet.modifiedAt).toLocaleDateString()}</span>
      </div>
      <p>{snippet.content.substring(0, 40)}...</p>
      <button onClick={() => handleDelete(snippet.shortId)}>❌</button>
    </div>
  );
};

export default SnippetListItem;
