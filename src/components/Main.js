import React, { Component } from 'react';
import List from './List';
import Modal from './Modal';
import Header from './Header';
import { debounce } from 'lodash';
import { favouriteManager } from '../utils/utils';
import NoDataFound from './NoDataFound';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      infoBeer: null,
      similarBeers: null,
      searchQuery: null,
      loadingSimilar: false
    };
  }

  handleCloseModal = () => {
    this.setState({ infoBeer: null, similarBeers: null });
  }

  handleShowModal = (infoBeer) => {
    this.setState({ infoBeer });
    this.handleGetSimilar(infoBeer);
  }

  handleSelectFavourite = (id) => {
    const { onRemoveFavourite } = this.props;

    favouriteManager(id);
    this.forceUpdate()

    onRemoveFavourite && onRemoveFavourite(id);
  }

  handleSelectFavouriteAndReload = (id) => {
    this.handleSelectFavourite(id);
    this.handleFetchData(true);
  }

  debouncedOnChange = debounce(() => {
    this.handleFetchData(true);
  }, 900);

  handleChangeSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
    this.debouncedOnChange();
  };

  handleGetSimilar = async (infoBeer) => {
    /*
      Percentage of similarity 50%
    */
    this.setState({ loadingSimilar: true });
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

    this.setState({
      similarBeers: dataFiltered.slice((dataFiltered.length - 3), dataFiltered.length),
      loadingSimilar: false
    });
  }

  handleFetchData = (reload) => {
    const { searchQuery } = this.state;
    const { onFetchData } = this.props;
    onFetchData(searchQuery, reload);
  }

  render() {

    const { infoBeer, similarBeers, searchQuery, loadingSimilar } = this.state;
    const { beers, page, hasMore, noDataFound } = this.props;
  
    const boddy = (
      <List
        beers={beers}
        onShowModal={this.handleShowModal}
        onSelectFavourite={this.handleSelectFavourite}
        loadMore={this.handleFetchData}
        page={page}
        hasMore={hasMore}
      />
    );

    const modal = (
      <>
        {infoBeer && <Modal
          beer={infoBeer}
          similarBeers={similarBeers}
          loadingSimilar={loadingSimilar}
          onClose={this.handleCloseModal}
          onOpenSimilar={this.handleShowModal}
          onSelectFavourite={this.handleSelectFavouriteAndReload}
        />
        }
      </>
    );

    return (
      <>
        <Header
          searchQuery={searchQuery}
          onChange={this.handleChangeSearch}
        />

        {
          noDataFound
            ? <NoDataFound />
            : boddy
        }

        { modal }
      </>
    );
  }
}

export default Main;
