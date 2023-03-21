import { createContext, useState, useEffect, useContext } from "react";


const ThemeContext = createContext({});

const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

export const UseThemeContext = () => useContext(ThemeContext);
