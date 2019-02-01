import React, { Component } from 'react';
import { getFavourites } from '../utils/utils';
import Main from '../components/Main';

export default class Favourites extends Component {
  constructor(props) {
    super(props);
    
    this.perPage = 20;

    this.state = {
      beers: [],
      page: 0,
      loading: false,
      hasMore: true,
      noDataFound: false
    }
  }

  componentDidMount() {
    this.handleFetchFavorites();
  }

  handleFetchFavorites = async (searchQuery, reload) => {
    const { beers, loading, hasMore, page } = this.state;

    if (reload) {
      this.setState({page: 0, beers: [], hasMore: true});
    }

    if (loading || !hasMore) {
      return;
    }

    const favourites = getFavourites();

    if (!favourites) {
      this.setState({ hasMore: false })
      return;
    }

    this.setState({ loading: true })

    const nextPage = page + 1;
    const filterPage = `&page=${nextPage}`
    const ids = `&ids=${favourites.join().replace(/,/g, '|')}`;
    const filterName = searchQuery ? `&beer_name=${searchQuery}` : '';
    const perPage = `per_page=${20}`;

    const response = await fetch(`https://api.punkapi.com/v2/beers?${perPage}${filterPage}${ids}${filterName}`)
    const data = await response.json();

    const favouritesMerged = [...beers, ...data];

    this.setState({ 
      beers: favouritesMerged, 
      loading: false,
      page: nextPage,
      hasMore: data.length === this.perPage,
      noDataFound: !data.length && !favouritesMerged.length
    });
  }

  handleRemoveFavourite = (id) => {
    const { beers } = this.state;
    const beersNormalized = beers && beers.filter(beer => beer.id !== id);
    
    this.setState({ beers: beersNormalized });
  }

  render() {
    const { beers, page, hasMore, noDataFound } = this.state;

    return (
      <Main
        beers={beers}
        page={page}
        hasMore={hasMore}
        noDataFound={noDataFound}
        onFetchData={this.handleFetchFavorites}
        onRemoveFavourite={this.handleRemoveFavourite}
      />
    );
  }
}