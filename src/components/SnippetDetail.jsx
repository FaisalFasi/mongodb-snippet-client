import { useParams } from "react-router-dom";

// ==============================================

import React, { useState } from "react";
import { useEffect } from "react";
const SnippetDetail = () => {
  let { snippet_id } = useParams();

  const [snippet, setSnippet] = useState();
  useEffect(() => {
    fetch("http://localhost:9000/snippets/" + snippet_id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnippet(data);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {snippet ? (
        <div
          style={{
            border: "1px solid black",
            margin: "10px",
            textAlign: "center",
            padding: "10px",
          }}
          key={snippet.shortId}
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

          <p>{snippet.content}...</p>
        </div>
      ) : (
        <h1> Loading ... </h1>
      )}
    </div>
  );
};

export default SnippetDetail;
