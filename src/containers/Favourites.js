import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { getFavourites } from '../utils/utils';
import App from '../App';

export default class Favourites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: []
    }
  }

  async componentDidMount() {
    const { beers } = this.state;

    const favourites = getFavourites();

    if (!favourites) {
      return;
    }

    let ids = favourites.join().replace(/,/g, '|');

    const response = await fetch(`https://api.punkapi.com/v2/beers?ids=${ids}`)
    const data = await response.json();
    const favouritesMerged = [...beers, ...data];

    console.log(favouritesMerged)
    // this.setState({ favourites: favouritesMerged, loading: false, hasMore: !!data.length });
  }

  render() {
    // const cardBeers = beers && beers.map(beer =>
    //   <BeerCard
    //     key={beer.id}
    //     beer={beer}
    //     onShowModal={onShowModal}
    //     onSelectFavorite={onSelectFavorite}
    //   />
    // );

    return (
      // <div className="main-container">
      //   {/* <InfiniteScroll
      //     pageStart={1}
      //     loadMore={loadMore}
      //     hasMore={hasMore}
      //     initialLoad={page === 0}
      //     loader={<div className="loader" key={0}>Loading ...</div>}
      //   >
      //     <div className="grid">
      //       {cardBeers}
      //     </div>
      //   </InfiniteScroll> */}
      // </div>
      <App />
    );
  }
}