import React, { Component } from 'react';
import Header from './containers/Header';
import Main from './containers/Main';
import Modal from './components/Modal';
import { debounce } from 'lodash';
import { favouriteManager } from './utils/utils';

class App extends Component {
 
  constructor(props) {
    super(props);

    this.perPage = `per_page=${20}`;

    this.state = {
      page: 0,
      infoBeer: null,
      similarBeers: null,
      beers: [],
      loading: false,
      hasMore: true,
      searchQuery: null,
    };
  }

  componentDidMount() {

    // this.getData();
  }

  getData = async () => {
    const { page, beers, loading, hasMore, searchQuery } = this.state;
    
    if (loading || !hasMore) {
      return;
    }

    const nextPage = page + 1;

    const filterPage = `&page=${nextPage}`
    const filterName = searchQuery ? `&beer_name=${searchQuery}` : '';

    this.setState({ page: nextPage, loading: true })

    const response = await fetch(`https://api.punkapi.com/v2/beers?${this.perPage}${filterPage}${filterName}`)
    const data = await response.json();
    const beersMerged = [...beers, ...data];

    this.setState({ beers: beersMerged, loading: false, hasMore: !!data.length });
  }

  handleCloseModal = () => {
    this.setState({ infoBeer: null, similarBeers: null });
  }

  handleShowModal = (infoBeer) => {
    this.setState({ infoBeer });
    this.handleGetSimilar(infoBeer);
  }

  handleSelectFavourite = (id) => {
    favouriteManager(id);
    this.forceUpdate()
  }

  debouncedOnChange = debounce(() => {
    this.setState({page: 0, beers: [], hasMore: true});
    this.getData();
  }, 900);

  handleChangeSearch = (e) => {
    this.setState({searchQuery: e.target.value});
    this.debouncedOnChange();
  };

  handleGetSimilar = async (infoBeer) => {
    /*
      Percentage of similarity 50%
    */

    const percentage = 0.5;

    const abv_lt = `&abv_lt=${parseInt(infoBeer.abv + (infoBeer.abv * percentage))}`;
    const abv_gt = `&abv_gt=${parseInt(infoBeer.abv - (infoBeer.abv * percentage))}`;

    const ibu_lt = `&ibu_lt=${parseInt(infoBeer.ibu + (infoBeer.ibu * percentage))}`;
    const ibu_gt = `&ibu_gt=${parseInt(infoBeer.ibu - (infoBeer.ibu * percentage))}`;

    const ebc_lt = `&ebc_lt=${parseInt(infoBeer.ebc + (infoBeer.ebc * percentage))}`;
    const ebc_gt = `&ebc_gt=${parseInt(infoBeer.ebc - (infoBeer.ebc * percentage))}`;


    const response = await fetch(`https://api.punkapi.com/v2/beers?per_page=4${abv_lt}${abv_gt}${ibu_lt}${ibu_gt}${ebc_lt}${ebc_gt}`)
    const data = await response.json();
    const dataFiltered = data && data.filter(beer => beer.id !== infoBeer.id);
    
    this.setState({similarBeers: dataFiltered});
  }

  render() {

    const { infoBeer, page, beers, hasMore, searchQuery, similarBeers } = this.state;

    return (
      <div className="">
        <Header 
          searchQuery={searchQuery}
          onChange={this.handleChangeSearch}
        />

        <Main
          beers={beers}
          onShowModal={this.handleShowModal}
          onSelectFavourite={this.handleSelectFavourite}
          loadMore={this.getData}
          page={page}
          hasMore={hasMore}
        />

        {infoBeer && <Modal
          beer={infoBeer}
          similarBeers={similarBeers}
          onClose={this.handleCloseModal}
          onOpenSimilar={this.handleShowModal}
        />
        }
      </div>
    );
  }
}

export default App;
