import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnippetProvider } from "./Context/SnippetContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnippetProvider>
      <App />
    </SnippetProvider>
  </React.StrictMode>
);
