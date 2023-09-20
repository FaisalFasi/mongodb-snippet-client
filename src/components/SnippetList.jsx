import React, { useState } from "react";
import { useEffect } from "react";
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

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {snippets.map((snippet) => (
        <div
          style={{
            border: "1px solid black",
            margin: "10px",
            textAlign: "center",
            padding: "10px",
          }}
          key={snippet.id}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{snippet.id}</span>

            <a
              href={`/${snippet.id} `}
              style={{
                target: "_blank",
              }}
            >
              <span>{snippet.title}</span>
            </a>

            <span>{new Date(snippet.modifiedAt).toLocaleDateString()}</span>
          </div>

          <p>{snippet.content.substring(0, 40)}...</p>
        </div>
      ))}
    </div>
  );
};

export default SnippetList;
