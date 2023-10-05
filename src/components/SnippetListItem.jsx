import React from "react";
import relativeDate from "../utils/relativeDate";
const SnippetListItem = ({ snippet, handleDelete }) => {
  return (
    <div className="text-center m-[10px] p-[10px] border-2 border-black bg-gray-300 rounded-xl hover:bg-gray-100 ">
      <div className="flex flex-col gap-4 overflow-hidden hover:overflow-visible">
        <a
          href={`/${snippet.shortId}`}
          style={{ textDecoration: "underline", color: "blue" }}
        >
          {snippet.title || " untitled Snippet"}
        </a>
      </div>
      <p>{relativeDate(new Date(snippet.updatedAt))}...</p>
    </div>
  );
};

export default SnippetListItem;
