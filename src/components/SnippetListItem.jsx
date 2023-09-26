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
          // justifyContent: "space-between",
        }}
      >
        {/* <span>{snippet.shortId}</span> */}

        <a
          href={`/${snippet.shortId} `}
          style={{
            target: "_blank",
          }}
        >
          <span>{snippet.title}</span>
        </a>

        {/* <span>{new Date(snippet.updatedAt).toLocaleDateString()}</span> */}
      </div>
      <p>{relativeDate(new Date(snippet.updatedAt))}...</p>

      {/* <p>{snippet.content.substring(0, 40)}...</p> */}
      {/* <button onClick={() => handleDelete(snippet.shortId)}>❌</button> */}
    </div>
  );
};

export default SnippetListItem;
