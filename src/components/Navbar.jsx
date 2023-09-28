import React from "react";
import { useContext } from "react";
import { SnippetContext } from "../Context/SnippetContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

import { ApplicationSettingsContext } from "../Context/ApplicationContext";
import { AVAILABLE_LANGUAGES } from "../enums/editor";

const Navbar = () => {
  const { editor } = useContext(SnippetContext);
  const [snippet, setSnippet] = editor;

  const { darkMode, setDarkMode, toggleDarkMode } = useContext(
    ApplicationSettingsContext
  );
  const navigate = useNavigate();

  const notify = (msg) => toast(msg);

  const sendDeleteSnippetRequest = () => {
    fetch(
      import.meta.env.VITE_SNIPPET_API_KEY + "/snippets/" + snippet.shortId,
      {
        method: "delete",
      }
    ).then((httpResponse) => {
      if (httpResponse.ok) {
        setSnippet({
          title: "",
          content: "",
          language: AVAILABLE_LANGUAGES.plaintext,
        });
        navigate("/");
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
      .then((data) => {
        setSnippet(data);

        notify("snippet created successfully");
        // setSnippet({ title: "", content: "" });
        navigate("/" + data.shortId);
      });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    notify("Link copied to clipboard");
  };

  return (
    <div>
      <div
        id="navbar"
        className={`flex gap-4 p-2 rounded-xl justify-between items-center  m-4 bg-blue-400 ${
          darkMode ? "text-white" : "text-black"
        }}`}
      >
        <h1 className="  text-2xl font-bold">FR-PasteBin</h1>
        <div className="flex gap-8 justify-center items-center ">
          <div className="flex flex-col gap-4">
            <input
              value={snippet.title}
              className="rounded-md px-2"
              onChange={(e) => {
                setSnippet({ ...snippet, title: e.target.value });
              }}
            />

            <select
              value={snippet.language}
              name=""
              id=""
              className="rounded-md px-2"
              onChange={(e) =>
                setSnippet({ ...snippet, language: e.target.value })
              }
            >
              {Object.keys(AVAILABLE_LANGUAGES).map((lang, index) => {
                return (
                  <option key={index} value={AVAILABLE_LANGUAGES[lang]}>
                    {lang}
                  </option>
                );
              })}
            </select>
            {snippet.createdAt && (
              <p>{new Date(snippet.updatedAt).toLocaleDateString()}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={toggleDarkMode}> theme </button>
            {snippet.shortId ? (
              <button onClick={sendUpdateSnippetRequest}>Update</button>
            ) : (
              <button onClick={sendCreateSnippetRequest}>Save</button>
            )}
            {snippet.shortId && <button onClick={copyLink}> Link</button>}
            {snippet.shortId && (
              <button onClick={sendDeleteSnippetRequest}>Delete</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
