import React from 'react';
import BeerCard from './BeerCard';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from './Loading';

const List = ({ beers, onShowModal, onSelectFavourite, loadMore, hasMore }) => {

  const cardBeers = beers.length && beers.map(beer =>
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
        loadMore={() => loadMore(false)}
        hasMore={hasMore}
        loader={
          <Loading key={0} /> 
        }
      >
        <div className="grid">
          { cardBeers.length && cardBeers }
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default List;