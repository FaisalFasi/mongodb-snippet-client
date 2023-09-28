import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnippetProvider } from "./Context/SnippetContext.jsx";
import { ApplicationSettingsProvider } from "./Context/ApplicationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnippetProvider>
      <ApplicationSettingsProvider>
        <App />
      </ApplicationSettingsProvider>
    </SnippetProvider>
  </React.StrictMode>
);
