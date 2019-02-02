import React, { Component } from 'react';
import Main from '../components/Main';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBeers, clear } from '../modules/beer';

class Home extends Component {
  handleFetchData = async (searchQuery, reload) => {
    const { isLoading, getBeers, currentPage, clear, advancedSearch } = this.props;
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

    getBeers(nextPage, searchQuery, advancedSearch);
  }

  render() {
    const { beers, noDataFound, hasMore } = this.props;
    return (
      <Main
        beers={beers}
        hasMore={hasMore}
        noDataFound={noDataFound}
        onFetchData={this.handleFetchData}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBeers: bindActionCreators(getBeers, dispatch),
  clear: bindActionCreators(clear, dispatch),
});

const mapStateToProps = state => ({
  beers: state.beer.data,
  isLoading: state.beer.isLoading,
  noDataFound: state.beer.noDataFound,
  currentPage: state.beer.currentPage,
  hasMore: state.beer.hasMore,
  advancedSearch: state.beer.advancedSearch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Home)