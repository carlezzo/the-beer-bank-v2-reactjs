import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeAdvanceSearch } from '../modules/beer';

class AdvanceSearch extends Component {
  
  handleGoToHome = () => {
    const { history } = this.props;
    history.push("/")
  }

  handleChange = (e) => {
    let { changeAdvanceSearch } = this.props;
    let field = {};
    field[e.target.name] = e.target.value;
    changeAdvanceSearch(field);
  }

  render() {
    const { advancedSearch } = this.props;

    return (
      <div className="search">
        <div className="search__fields">
          <div>
            <label className="input-label" htmlFor="ibuGt">Max IBU</label>
            <input
              id="ibuGt"
              name="ibuGt"
              defaultValue={advancedSearch.ibuGt}
              className="input-search"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
              type="number"
            />
          </div>
          <div>
            <label className="input-label" htmlFor="ibuLt">Min IBU</label>
            <input
              id="ibuLt"
              name="ibuLt"
              defaultValue={advancedSearch.ibuLt}
              className="input-search"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
              type="number"
            />
          </div>

          <div>
            <label className="input-label" htmlFor="abvGt">Max ABV</label>
            <input
              id="abvGt"
              name="abvGt"
              defaultValue={advancedSearch.abvGt}
              className="input-search"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
              type="number"
            />
          </div>
          <div>
            <label className="input-label" htmlFor="abvLt">Min ABV</label>
            <input
              id="abvLt"
              name="abvLt"
              defaultValue={advancedSearch.abvLt}
              className="input-search"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
              type="number"
            />
          </div>

          <div>
            <label className="input-label" htmlFor="ebcGt">Max EBC</label>
            <input
              id="ebcGt"
              name="ebcGt"
              defaultValue={advancedSearch.ebcGt}
              className="input-search"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
              type="number"
            />
          </div>
          <div>
            <label className="input-label" htmlFor="ebcLt">Min EBC</label>
            <input
              id="ebcLt"
              name="ebcLt"
              defaultValue={advancedSearch.ebcLt}
              className="input-search"
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
              defaultValue={advancedSearch.brewedBefore}
              className="input-search"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div>
            <label className="input-label" htmlFor="brewedAfter">Brewed after</label>
            <input
              id="brewedAfter"
              name="brewedAfter"
              defaultValue={advancedSearch.brewedAfter}
              className="input-search"
              placeholder="0.0"
              onChange={(e) => this.handleChange(e)}
            />
          </div>

        </div>
        
        <div className="search__action">
          <button 
            className="btn btn--primary"
            onClick={() => this.handleGoToHome()} 
          > Search </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeAdvanceSearch: bindActionCreators(changeAdvanceSearch, dispatch),
});

const mapStateToProps = (state) => ({
  advancedSearch: state.beer.advancedSearch,
});
export default connect(mapStateToProps, mapDispatchToProps)(AdvanceSearch)