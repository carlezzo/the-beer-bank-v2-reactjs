import React from 'react';
import BeerCard from './BeerCard';
import Loading from './Loading';

const Modal = ({ beer, onClose, onOpenSimilar, similarBeers, onSelectFavourite, loadingSimilar }) => {

  const similarBeersNormalized = similarBeers && similarBeers.map(beer =>
    <BeerCard
      key={beer.id}
      beer={beer}
      onShowModal={onOpenSimilar}
      onSelectFavourite={onSelectFavourite}
    />
  );

  const close = (
    <button className="btn-link modal__close" onClick={() => onClose()}>
      <i className="fa fa-times"></i>
    </button>
  );

  const leftSide = (
    <div className="modal__left">
      <img className="modal__img--left" src={beer.image_url} alt="beer"/>
    </div>
  );

  const rightSide = (
    <div className="modal__right">

      <div className="modal__right--header">
        <h1 className="modal__title">{beer.name}</h1>
        <h2 className="modal__right--tagline">{beer.tagline}</h2>
      </div>

      <div className="modal__right--values">
        <div>
          <span> IBU: </span> <span> {beer.ibu} </span>
        </div>
        <div>
          <span> ABV: </span> <span> {beer.abv} </span>
        </div>
        <div>
          <span> EBC: </span> <span> {beer.ebc} </span>
        </div>
      </div>

      <div className="modal__right--text">
        <p className="text-information">
          {beer.description}
        </p>
      </div>

      <div className="modal__right--list">
        <p>Best served with:</p>
        <ul className="text-information">
          {beer.food_pairing && beer.food_pairing.map(item => <li key={item}> {item} </li>)}
        </ul>
      </div>
    </div>
  );

  const bottom = (
    <div className="modal__bottom">
      <div className="modal__bottom--title">
        <h1 className="modal__title">You might also like:</h1>
      </div>
      {similarBeersNormalized}
    </div>
  );

  return (
    <>
      <div className="modal" onClick={() => onClose()}>
        <div className="modal__content" onClick={e => e.stopPropagation()}>
          {close}
          {leftSide}
          {rightSide}
          {loadingSimilar
            ? <Loading />
            :
            similarBeersNormalized.length && bottom
          }
        </div>
      </div>
    </>
  );
}

export default Modal;