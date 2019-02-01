import React, { Component } from 'react';
import Main from '../components/Main';

export default class Home extends Component {
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
    this.handleFetchData();
  }

  handleFetchData = async (searchQuery, reload) => {
    const { page, beers, loading, hasMore } = this.state;

    if (reload) {
      this.setState({page: 0, beers: [], hasMore: true});
    }

    if (loading || !hasMore) {
      return;
    }

    const nextPage = page + 1;
    const filterPage = `&page=${nextPage}`
    const filterName = searchQuery ? `&beer_name=${searchQuery}` : '';
    const perPage = `per_page=${20}`;

    this.setState({ loading: true })

    const response = await fetch(`https://api.punkapi.com/v2/beers?${perPage}${filterPage}${filterName}`)
    const data = await response.json();
    const beersMerged = [...beers, ...data];

    this.setState({
      page: nextPage,
      beers: beersMerged,
      loading: false,
      hasMore: data.length === this.perPage,
      noDataFound: !data.length && !beersMerged.length
    });
  }

  render() {
    const { beers, page, hasMore, noDataFound } = this.state;

    return (
      <Main
        beers={beers}
        page={page}
        hasMore={hasMore}
        noDataFound={noDataFound}
        onFetchData={this.handleFetchData}
      />
    );
  }
}