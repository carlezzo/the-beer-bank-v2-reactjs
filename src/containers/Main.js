import React from 'react';
import BeerCard from '../components/BeerCard';
import InfiniteScroll from 'react-infinite-scroller';

const Main = ({ beers, onShowModal, onSelectFavourite, loadMore, page, hasMore }) => {
  const cardBeers = beers && beers.map(beer =>
    <BeerCard
      key={beer.id}
      beer={beer}
      onShowModal={onShowModal}
      onSelectFavourite={onSelectFavourite}
    />
  );

  return (
    <div className="main-container">
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={hasMore}
        initialLoad={page === 0}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <div className="grid">
          {cardBeers}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Main;