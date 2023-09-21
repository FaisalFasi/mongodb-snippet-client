import React, { useRef } from "react";
import { useNavigate } from "react-router";
const SnippetCreationForm = () => {
  const titelRef = useRef();
  const contentRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:9000/snippets", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: titelRef.current.value,
        content: contentRef.current.value,
      }),
    })
      .then((httpResponse) => httpResponse.json())
      .then((data) => navigate("/" + data.shortId));
  };

  return (
    <form
      action="submit"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="title"
        name="title"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Title <input type="text" name="title" id="title" ref={titelRef} />
      </label>
      <textarea
        style={{
          resize: "vertical",
          minWidth: "40rem",
        }}
        ref={contentRef}
      ></textarea>
      <button>create snippet</button>
    </form>
  );
};

export default SnippetCreationForm;
