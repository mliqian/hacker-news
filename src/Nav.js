import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  let theme = "light";
  return (
    <nav className="topbar">
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
      <div className="theme-switch">{theme == "light" ? "🌒" : "🌕"}</div>
    </nav>
  );
}

export default Nav;
