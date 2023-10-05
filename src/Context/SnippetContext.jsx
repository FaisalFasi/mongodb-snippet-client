import React, { createContext, useEffect, useState } from "react";
import { AVAILABLE_LANGUAGES } from "../enums/editor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SnippetContext = createContext(null);

export const SnippetProvider = ({ children }) => {
  const emptySnippetState = {
    title: "",
    content: "",
    language: AVAILABLE_LANGUAGES.javascript,
  };
  const [snippets, setSnippets] = useState([]);
  const [snippetsDIFF, setSnippetDIFF] = useState(emptySnippetState);
  const [unsavedState, setUnsavedState] = useState(false);

  const snippet_id = window.location.pathname.split("/")[1];

  const notify = (msg) => toast(msg);

  const [snippet, setSnippet] = useState(emptySnippetState);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
  };

  useEffect(() => {
    if (
      snippet.title !== snippetsDIFF.title ||
      snippet.content !== snippetsDIFF.content ||
      snippet.language !== snippetsDIFF.language
    ) {
      setUnsavedState(true);
    } else {
      setUnsavedState(false);
    }
  }, [snippet, snippetsDIFF]);

  useEffect(() => {
    if (snippet_id) {
      fetch(import.meta.env.VITE_SNIPPET_API_KEY + "/snippets/" + snippet_id)
        .then((res) => res.json())
        .then((data) => {
          setSnippet(data);
          setSnippetDIFF(data);
        });
    }
    fetch(import.meta.env.VITE_SNIPPET_API_KEY + "/snippets")
      .then((res) => res.json())
      .then((data) => {
        setSnippets(data);
      });
  }, []);

  const organisedSnippets = () => {
    if (snippet.shortId) {
      return [
        snippet,
        ...snippets
          .filter((s) => s.shortId !== snippet.shortId)
          .sort((a, b) => a.updatedAt - b.updatedAt),
      ];
    } else {
      return [...snippets.sort((a, b) => b.updatedAt - a.updatedAt)];
    }
  };

  const sendDeleteSnippetRequest = () => {
    fetch(
      import.meta.env.VITE_SNIPPET_API_KEY + "/snippets/" + snippet.shortId,
      {
        method: "delete",
      }
    ).then((httpResponse) => {
      if (httpResponse.ok) {
        setSnippet(emptySnippetState);

        setUnsavedState(false);
        setSnippetDIFF(emptySnippetState);

        navigate("/");
        setSnippets(snippets.filter((s) => s.shortId !== snippet.shortId));

        notify("snippet deleted successfully");
      } else {
        notify("Something went wrong. please try again later");
      }
    });
  };
  const sendUpdateSnippetRequest = () => {
    fetch(
      import.meta.env.VITE_SNIPPET_API_KEY + "/snippets/" + snippet.shortId,
      {
        method: "put",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: snippet.title,
          content: snippet.content,
          language: snippet.language,
        }),
      }
    )
      .then((httpResponse) => {
        if (httpResponse.ok) {
          notify("saved the changes successfully");
        } else {
          notify("Something went wrong. please try again later");
        }
        return httpResponse.json();
      })
      .then((data) => {
        setSnippet(data);
        setSnippetDIFF(data);
        setUnsavedState(false);
        setSnippets([
          data,
          ...snippets.filter((s) => s.shortId !== data.shortId),
        ]);
      });
  };

  const sendCreateSnippetRequest = (e) => {
    e.preventDefault();

    fetch(import.meta.env.VITE_SNIPPET_API_KEY + "/snippets", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
        language: snippet.language,
      }),
    })
      .then((httpResponse) => httpResponse.json())
      .then((newlyCreatedSnippet) => {
        setSnippet(newlyCreatedSnippet);
        setSnippetDIFF(newlyCreatedSnippet);

        setSnippets([newlyCreatedSnippet, ...snippets]);
        notify("snippet created successfully");
        navigate("/" + newlyCreatedSnippet.shortId);
      });
  };
  const resetFields = () => {
    setSnippet(emptySnippetState);
    setSnippetDIFF(emptySnippetState);
    navigate("/");
  };

  return (
    <SnippetContext.Provider
      value={{
        editor: [snippet, setSnippet],
        sendDeleteSnippetRequest,
        sendUpdateSnippetRequest,
        sendCreateSnippetRequest,
        resetFields,
        unsavedState,
        snippetList: [organisedSnippets(), setSnippets],
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
