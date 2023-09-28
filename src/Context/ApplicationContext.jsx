import React, { createContext, useState } from "react";
import { AVAILABLE_LANGUAGES } from "../enums/editor";

export const ApplicationSettingsContext = createContext(null);

export const ApplicationSettingsProvider = ({ children }) => {
  const initialThemeState =
    localStorage.getItem("darkMode") === "true" ? true : false;

  const [darkMode, setDarkMode] = useState(initialThemeState);

  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };
  return (
    <ApplicationSettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ApplicationSettingsContext.Provider>
  );
};
