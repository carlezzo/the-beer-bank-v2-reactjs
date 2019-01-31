import React from 'react';
import { getFavourite } from '../utils/utils';

const BeerCard = ({ beer, onShowModal, onSelectFavourite }) => {
  
  const favouriteIcon = (
    <a className="favourite" onClick={() => onSelectFavourite(beer.id)}>
      {
        getFavourite(beer.id)
        ? <i className="fa fa-star favourite__ok"></i>
        : <i className="fa fa-star-o"></i>
      }
    </a>
  );

  return (
    <div className="grid__item">
      <div className="card">
        {favouriteIcon}
        <div className="card__content" onClick={() => onShowModal(beer)}>
          <img className="card__img" src={beer.image_url} />
          <p className="card__name">{beer.name}</p>
          <p className="card__tagline">{beer.tagline}</p>
        </div>
      </div>
    </div>
  );
}

export default BeerCard;