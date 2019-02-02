import React, { Component } from 'react';
import Main from '../components/Main';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFavourites, clear, removeFavourite, clearAdvancedSearch } from '../modules/beer';

class Favourites extends Component {
  componentDidMount() {
    const { clear, clearAdvancedSearch } = this.props;
    clear();
    clearAdvancedSearch();
  }

  handleFetchFavourites = async (searchQuery, reload) => {
    const { isLoading, getFavourites, currentPage, clear } = this.props;
    let nextPage = currentPage + 1;
   
    /* Prevent fetch duplicate data when page is rendering */ 
    if (isLoading) {
      return;
    }

    /* Clear data and back to page 1 when filtering by input text */ 
    if(reload) {
      clear();
      nextPage = 1;
    }
    getFavourites(nextPage, searchQuery);
  }

  handleRemoveFavourite = (id) => {
    const { removeFavourite } = this.props;
    removeFavourite(id);
  }

  render() {
    const { beers, noDataFound, hasMore } = this.props;
    return (
      <Main
        beers={beers}
        hasMore={hasMore}
        noDataFound={noDataFound}
        onFetchData={this.handleFetchFavourites}
        onRemoveFavourite={this.handleRemoveFavourite}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getFavourites: bindActionCreators(getFavourites, dispatch),
  removeFavourite: bindActionCreators(removeFavourite, dispatch),
  clear: bindActionCreators(clear, dispatch),
  clearAdvancedSearch: bindActionCreators(clearAdvancedSearch, dispatch),
});

const mapStateToProps = state => ({
  beers: state.beer.data,
  isLoading: state.beer.isLoading,
  noDataFound: state.beer.noDataFound,
  currentPage: state.beer.currentPage,
  hasMore: state.beer.hasMore,
});
export default connect(mapStateToProps, mapDispatchToProps)(Favourites)