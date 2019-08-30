import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ThemeContext from "./ThemeContext";

function Nav() {
  let { theme, setTheme } = useContext(ThemeContext);
  function changeTheme() {
    setTheme(theme => (theme == "light" ? "dark" : "light"));
  }
  return (
    <nav className={`topbar ${theme}`}>
      <ul className="nav">
        <li>
          <NavLink
            to="/"
            exact
            className="nav__link"
            activeClassName="nav__link--active"
          >
            Top
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/new"
            className="nav__link"
            activeClassName="nav__link--active"
          >
            New
          </NavLink>
        </li>
      </ul>
      <div className="theme-switch" onClick={changeTheme}>
        {theme == "light" ? "🌒" : "🌕"}
      </div>
    </nav>
  );
}

export default Nav;
