import { useParams } from "react-router-dom";

// ==============================================
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { useEffect } from "react";
const SnippetDetail = () => {
  let { snippet_id } = useParams();
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState();
  useEffect(() => {
    fetch("http://localhost:9000/snippets/" + snippet_id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnippet(data);
      });
  }, []);
  const handleDelete = () => {
    fetch("http://localhost:9000/snippets/" + snippet.shortId, {
      method: "delete",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        navigate("/");
        // alert("snippet deleted successfully");
        // setSnippets((prev) => prev.filter((item) => item.shortId !== shortId));
      } else {
        alert("Something went wrong. please try again later");
      }
    });
  };
  const handleSave = () => {
    fetch("http://localhost:9000/snippets/" + snippet.shortId, {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
      }),
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        alert("saved the changes successfully");
      } else {
        alert("Something went wrong. please try again later");
      }
    });
  };

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

            <input
              value={snippet.title}
              onChange={(e) => {
                setSnippet({ ...snippet, title: e.target.value });
              }}
            />

            <span>{new Date(snippet.updatedAt).toLocaleDateString()}</span>
          </div>
          <textarea
            value={snippet.content}
            onChange={(e) => {
              setSnippet({ ...snippet, content: e.target.value });
            }}
          />
          <button onClick={handleSave}>Save</button>{" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <h1> Loading ... </h1>
      )}
    </div>
  );
};

export default SnippetDetail;
