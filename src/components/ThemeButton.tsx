// import { useContext } from "react";
// import { ThemeContext } from "./ThemeContext";
import "./Toggle.css";
import { useTheme } from "../CustomHooks/CustomTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
      <span className="slider round"></span>
    </label>
  );
}

export default ThemeToggle;