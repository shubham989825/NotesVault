import { useState, useEffect } from "react";
import "./ThemeToggler.css"; // optional for styling

export function ThemeToggler() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme; // add class to body
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} className="theme-toggler">
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}