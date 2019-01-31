import React from 'react';
import { Link } from "react-router-dom";

const Nav = ({children}) => (
  <>
    <nav className="nav">
      <ul className="nav__item">
        <li>
          <Link className="nav__link" to="/">HOME</Link>
        </li>
        <li>
          <Link params={{ testvalue: "hello" }} className="nav__link" to="/favourites">Favourite</Link>
        </li>
      </ul>
    </nav>
    {children}
  </>
);

export default Nav;