import React from 'react';
import { Link } from "react-router-dom";

const Header = ({onChange, onClear, searchQuery }) => (
  <header className="header">
    <h1 className="header__title"> The Beer Bank </h1>
    <h2 className="header__subtitle"> Find your favourite beer here </h2>

    <div className="header__input">
      <input 
        value={searchQuery}
        className="input" 
        placeholder="Search for beer name" 
        onChange={(e) => onChange(e)}
      />
      <i 
        className="fa fa-times header__clear"
        onClick={() => onClear()}
      ></i>
    </div>

    <Link className="header__link" to="/search">
      <i className="fa fa-search"></i>
      <span> Advanced Search </span>
    </Link>
  </header>
);

export default Header;