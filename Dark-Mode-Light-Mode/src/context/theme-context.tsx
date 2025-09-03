import React, { createContext, useEffect, useState } from "react";

type ThemeContextType = {
  toggleMode: () => void;
  theme: "dark" | "light";
};
/* eslint-disable react-refresh/only-export-components */
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode, theme]);

  return (
    <ThemeContext.Provider value={{ toggleMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
