import { Link } from "react-router-dom";
import { useTheme } from "../context/useTheme";

function Navbar() {
  const { theme, toggleMode } = useTheme();
  return (
    <nav className="navbar">
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/blogs"}>Blogs</Link>
      </div>
      <div className="mode-switch">
        <label>
          <input
            id="checkbox"
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleMode}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </nav>
  );
}

export default Navbar;
