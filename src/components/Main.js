import React, { Component } from 'react';
import List from './List';
import Modal from './Modal';
import Header from './Header';
import { debounce } from 'lodash';
import { favouriteManager } from '../utils/utils';
import NoDataFound from './NoDataFound';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSimilar } from '../modules/beer';
import AdvancedSearchInfo from './AdvancedSearchInfo';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      infoBeer: null,
      searchQuery: null,
    };
  }

  handleCloseModal = () => {
    this.setState({ infoBeer: null });
  }

  handleShowModal = (infoBeer) => {
    const { getSimilar } = this.props;
    getSimilar(infoBeer);
    this.setState({ infoBeer });
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

  /* Wait a time before fetch data when stop typing */
  debouncedOnChange = debounce(() => {
    this.handleFetchData(true);
  }, 900);

  handleChangeSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
    this.debouncedOnChange();
  };

  handleFetchData = (reload) => {
    const { searchQuery } = this.state;
    const { onFetchData } = this.props;
    onFetchData(searchQuery, reload);
  }

  handleClearSearch = () => {
    const { onFetchData } = this.props;
    this.setState({ searchQuery: '' });
    onFetchData(null, true);
  }

  render() {
    const { infoBeer, searchQuery } = this.state;
    const { beers, hasMore, noDataFound, 
      isLoadingSimilar, similarBeers, advancedSearch
    } = this.props;
    
    const boddy = (
      <List
        beers={beers}
        onShowModal={this.handleShowModal}
        onSelectFavourite={this.handleSelectFavourite}
        loadMore={this.handleFetchData}
        hasMore={hasMore}
      />
    );

    const modal = (
      <>
        {infoBeer && <Modal
          beer={infoBeer}
          similarBeers={similarBeers}
          loadingSimilar={isLoadingSimilar}
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
          onClear={this.handleClearSearch}
        />

        <AdvancedSearchInfo filters={advancedSearch} />

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

const mapDispatchToProps = dispatch => ({
  getSimilar: bindActionCreators(getSimilar, dispatch),
});

const mapStateToProps = state => ({
  similarBeers: state.beer.similarBeers,
  isLoadingSimilar: state.beer.isLoadingSimilar,
  advancedSearch: state.beer.advancedSearch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Main)