import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeAdvancedSearch, clear, clearAdvancedSearch } from '../modules/beer';

class AdvancedSearch extends Component {
  
  handleGoToHome = () => {
    const { history } = this.props;
    history.push("/")
  }

  handleChange = (e) => {
    let { changeAdvancedSearch } = this.props;

    let field = {};
    field[e.target.name] = e.target.value;
    changeAdvancedSearch(field);
  }

  handleClearAdvancedSearch = () => {
    const { clearAdvancedSearch, clear } = this.props;
    clear();
    clearAdvancedSearch();
  }

  render() {
    const { advancedSearch } = this.props;

    return (
      <div className="search">
        
        <div className="search__action--clear">
          <button className="btn-link" onClick={() => this.handleClearAdvancedSearch()}>
            Clear
          </button>
        </div>
        
        <div className="search__fields">
          <div>
            <label className="input-label" htmlFor="ibuGt">Min IBU</label>
            <input
              id="ibuGt"
              name="ibuGt"
              value={advancedSearch.ibuGt}
              className="input input--filter"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
              type="number"
            />
          </div>
          <div>
            <label className="input-label" htmlFor="ibuLt">Max IBU</label>
            <input
              id="ibuLt"
              name="ibuLt"
              value={advancedSearch.ibuLt}
              className="input input--filter"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
              type="number"
            />
          </div>

          <div>
            <label className="input-label" htmlFor="abvGt">Min ABV</label>
            <input
              id="abvGt"
              name="abvGt"
              value={advancedSearch.abvGt}
              className="input input--filter"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
              type="number"
            />
          </div>
          <div>
            <label className="input-label" htmlFor="abvLt">Max ABV</label>
            <input
              id="abvLt"
              name="abvLt"
              value={advancedSearch.abvLt}
              className="input input--filter"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
              type="number"
            />
          </div>

          <div>
            <label className="input-label" htmlFor="ebcGt">Min EBC</label>
            <input
              id="ebcGt"
              name="ebcGt"
              value={advancedSearch.ebcGt}
              className="input input--filter"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
              type="number"
            />
          </div>
          <div>
            <label className="input-label" htmlFor="ebcLt">Max EBC</label>
            <input
              id="ebcLt"
              name="ebcLt"
              value={advancedSearch.ebcLt}
              className="input input--filter"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
              type="number"
            />
          </div>

          <div>
            <label className="input-label" htmlFor="brewedBefore">Brewed before</label>
            <input
              id="brewedBefore"
              name="brewedBefore"
              value={advancedSearch.brewedBefore}
              className="input input--filter"
              placeholder="12-2019"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div>
            <label className="input-label" htmlFor="brewedAfter">Brewed after</label>
            <input
              id="brewedAfter"
              name="brewedAfter"
              value={advancedSearch.brewedAfter}
              className="input input--filter"
              placeholder="01-2011"
              onChange={(e) => this.handleChange(e)}
            />
          </div>

        </div>
        
        <div className="search__action">
          <button 
            className="btn btn--primary"
            onClick={() => this.handleGoToHome()} 
          > Search 
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeAdvancedSearch: bindActionCreators(changeAdvancedSearch, dispatch),
  clear: bindActionCreators(clear, dispatch),
  clearAdvancedSearch: bindActionCreators(clearAdvancedSearch, dispatch),
});

const mapStateToProps = (state) => ({
  advancedSearch: state.beer.advancedSearch,
});
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch)