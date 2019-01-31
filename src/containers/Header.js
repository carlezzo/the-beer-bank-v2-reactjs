import React from 'react';

const Header = ({onChange, searchQuery}) => (
  <header className="header">

    <h1 className="header__title"> The Beer Bank </h1>
    <h2 className="header__subtitle"> Find your favourite beer here </h2>

    <div className="header__input">
      <input 
        defaultValue={searchQuery}
        className="input-search" 
        placeholder="Search for beer name" 
        onChange={(e) => onChange(e)}
      />
    </div>

  </header>
);

export default Header;