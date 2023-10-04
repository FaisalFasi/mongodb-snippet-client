import React from "react";
import { useContext } from "react";
import { SnippetContext } from "../Context/SnippetContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ApplicationSettingsContext } from "../Context/ApplicationContext";
import { AVAILABLE_LANGUAGES } from "../enums/editor";

const Navbar = () => {
  const {
    editor,
    unsavedState,
    sendCreateSnippetRequest,
    sendUpdateSnippetRequest,
    sendDeleteSnippetRequest,
    resetFields,
  } = useContext(SnippetContext);
  const [snippet, setSnippet] = editor;

  const { darkMode, setDarkMode, toggleDarkMode } = useContext(
    ApplicationSettingsContext
  );

  const notify = (msg) => toast(msg);

  const handleSwitchToNewSnippet = () => {
    if (unsavedState) {
      const result = window.confirm(
        "You have unsaved changes. Are you sure you want to create a new snippet?"
      );
      if (!result) {
        return;
      }
    }
    resetFields();
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
            {snippet.shortId && (
              <button onClick={handleSwitchToNewSnippet}>
                Open Blank Snippent
              </button>
            )}
          </div>
        </div>
      </div>
      <span className="pl-8 ">
        {unsavedState && (
          <span>
            You have unsaved changes.
            {snippet.updatedAt && (
              <span>
                (last saved at
                {new Date(snippet.updatedAt).toLocaleDateString()})
              </span>
            )}{" "}
          </span>
        )}
      </span>
    </div>
  );
};

export default Navbar;
