import { useParams } from "react-router-dom";
import SnippetList from "./SnippetList";
// ==============================================
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { useEffect } from "react";

import CodeBlock from "./CodeBlock";

const SnippetEditor = () => {
  let { snippet_id } = useParams();
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState({
    title: "",
    content: "",
  });
  const handleEdit = (value) => {
    setSnippet({ ...snippet, content: value });
  };

  useEffect(() => {
    if (!snippet_id) {
      return;
    }
    fetch("http://localhost:9000/snippets/" + snippet_id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnippet(data);
      });
  }, []);
  const sendDeleteSnippetRequest = () => {
    fetch("http://localhost:9000/snippets/" + snippet.shortId, {
      method: "delete",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        setSnippet({ title: "", content: "" });
        navigate("/");
        // alert("snippet deleted successfully");
        // setSnippets((prev) => prev.filter((item) => item.shortId !== shortId));
      } else {
        alert("Something went wrong. please try again later");
      }
    });
  };
  const sendUpdateSnippetRequest = () => {
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

  const sendCreateSnippetRequest = (e) => {
    e.preventDefault();

    fetch("http://localhost:9000/snippets", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
      }),
    })
      .then((httpResponse) => httpResponse.json())
      .then((data) => {
        setSnippet({ title: "", content: "" });
        navigate("/" + data.shortId);
      });
  };

  return (
    <div className=" flex flex-col w-full h-screen">
      <div>
        <div
          id="navbar"
          className="flex gap-4 p-2 rounded-xl justify-between items-center  m-4 bg-blue-400"
        >
          <h1 className="  text-2xl font-bold">FR-PasteBin</h1>
          <div className="flex gap-8">
            {snippet.createdAt && (
              <p>{new Date(snippet.updatedAt).toLocaleDateString()}</p>
            )}
            <input
              value={snippet.title}
              className="rounded-md px-2"
              onChange={(e) => {
                setSnippet({ ...snippet, title: e.target.value });
              }}
            />
            <select name="" id="" className="rounded-md px-2">
              <option value="language">language</option>{" "}
            </select>
            {snippet.shortId ? (
              <button onClick={sendUpdateSnippetRequest}>Save</button>
            ) : (
              <button onClick={sendCreateSnippetRequest}>Create</button>
            )}
            {snippet.shortId && (
              <button onClick={sendDeleteSnippetRequest}>Delete</button>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between mr-4">
        <CodeBlock code={snippet.content} handleEdit={handleEdit} />
        <SnippetList />
      </div>
    </div>
  );
};

export default SnippetEditor;
