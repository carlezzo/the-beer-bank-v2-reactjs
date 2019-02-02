import React from 'react';

const labelFilters = {
  ibuGt: 'Min IBU',
  ibuLt: 'Max IBU',
  abvGt: 'Min ABV',
  abvLt: 'Max ABV',
  ebcGt: 'Min EBC',
  ebcLt: 'Max EBC',
  brewedBefore: 'Brewed before',
  brewedAfter: 'Brewed after',
};

const AdvancedSearchInfo = ({ filters }) => {
  let filtersNormalized = Object.keys(filters).map(filter => {
    if (filters[filter]) { 
      return (
        <div>
          <span> {labelFilters[filter]}: </span> <span> {filters[filter]} </span>
        </div>
      );
    }
  }).filter(x => x);

  if (!filtersNormalized.length) {
    return <></>
  }

  return (
    <div className="filters-container">
      <p className="filters-container__title">Advanced filters selected</p>
      <div className="grid-filters">
        {filtersNormalized}
      </div>
    </div>
  );
}

export default AdvancedSearchInfo;