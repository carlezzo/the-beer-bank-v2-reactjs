import { getFavourites as getLocalFavourites } from '../utils/utils';

/* 
  Change PER_PAGE value for load more items per page
*/
const PER_PAGE = 20;

const LOAD = 'beer/LOAD';
const CLEAR = 'beer/CLEAR';
const LOADING = 'beer/LOADING';
const GET_SIMILAR = 'beer/GET_SIMILAR';
const ADVANCE_SEARCH = 'beer/ADVANCE_SEARCH';
const LOADING_SIMILAR = 'beer/LOADING_SIMILAR';
const REMOVE_FAVOURITE = 'beer/REMOVE_FAVOURITE';
const CLEAR_ADVANCE_SEARCH = 'beer/CLEAR_ADVANCE_SEARCH';
const NO_FAVOURITES_SELECTED = 'beer/NO_FAVOURITES_SELECTED';

const initialState = {
  data: [],
  hasMore: true,
  currentPage: 0,
  similarBeers: [],
  isLoading: false,
  advancedSearch: {},
  noDataFound: false,
  isLoadingSimilar: false,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD: {
      const beersMerged = [...state.data, ...payload.data];
      return {
        ...state,
        isLoading: false,
        data: beersMerged,
        currentPage: payload.currentPage,
        noDataFound: !payload.data.length && !beersMerged.length,
        hasMore: payload.data.length === PER_PAGE,
      }
    }
    case CLEAR:
      return {
        ...state,
        data: [],
        currentPage: 0,
        hasMore: true,
        noDataFound: false,
        isLoading: true,
      }
    case CLEAR_ADVANCE_SEARCH:
      return {
        ...state, advancedSearch: {
          ibuGt: '',
          ibuLt: '',
          abvGt: '',
          abvLt: '',
          ebcGt: '',
          ebcLt: '',
          brewedBefore: '',
          brewedAfter: '',
        },
        isLoading: false
      }
    case NO_FAVOURITES_SELECTED:
      return {
        ...state,
        data: [],
        currentPage: 0,
        hasMore: false
      }
    case ADVANCE_SEARCH: {
      const advancedSearch = { ...state.advancedSearch, ...payload.advancedSearch };
      return {
        ...state,
        advancedSearch,
        isLoading: false
      }
    }
    case REMOVE_FAVOURITE: {
      const favourites = state.data.filter(beer => beer.id !== payload.id);
      return {
        ...state,
        data: favourites,
        isLoading: false
      }
    }
    case GET_SIMILAR: {
      const dataFiltered = payload.data.filter(beer => beer.id !== payload.infoBeer.id);
      const similarBeers = dataFiltered.slice((dataFiltered.length - 3), dataFiltered.length);

      return {
        ...state,
        similarBeers,
        isLoadingSimilar: false
      }
    }
    case LOADING:
      return { ...state, currentPage: 0, isLoading: true }
    case LOADING_SIMILAR:
      return { ...state, isLoadingSimilar: true }
    default:
      return state;
  }
}

export function getBeers(currentPage, filterName, advancedSearch) {
  return dispatch => {

    dispatch({ type: LOADING });

    const filterPage = `&page=${currentPage}`
    filterName = filterName ? `&beer_name=${filterName}` : '';
    advancedSearch = normalizeAdvancedSearch(advancedSearch);

    return fetch(`https://api.punkapi.com/v2/beers?per_page=${PER_PAGE}${filterPage}${filterName}${advancedSearch}`)
      .then(toJson)
      .then(data => {
        dispatch({
          type: LOAD,
          payload: { data, currentPage },
        })
      })
  }
}

export function getFavourites(currentPage, filterName) {
  return dispatch => {
    dispatch({ type: LOADING });

    const favourites = getLocalFavourites();
    if (!favourites) {
      return dispatch({ type: NO_FAVOURITES_SELECTED });
    }

    const filterPage = `&page=${currentPage}`
    const ids = `&ids=${favourites.join().replace(/,/g, '|')}`;
    filterName = filterName ? `&beer_name=${filterName}` : '';

    return fetch(`https://api.punkapi.com/v2/beers?per_page=${PER_PAGE}${filterPage}${filterName}${ids}`)
      .then(toJson)
      .then(data => {
        dispatch({
          type: LOAD,
          payload: { data, currentPage },
        })
      })
  }
}

export function getSimilar(infoBeer) {
  return dispatch => {
    dispatch({ type: LOADING_SIMILAR });
    /*
      Fetch data with 60% percent of similarity
     */
    const percentage = 0.6;

    const abv_lt = `&abv_lt=${parseInt(infoBeer.abv + (infoBeer.abv * percentage))}`;
    const abv_gt = `&abv_gt=${parseInt(infoBeer.abv - (infoBeer.abv * percentage))}`;

    const ibu_lt = `&ibu_lt=${parseInt(infoBeer.ibu + (infoBeer.ibu * percentage))}`;
    const ibu_gt = `&ibu_gt=${parseInt(infoBeer.ibu - (infoBeer.ibu * percentage))}`;

    const ebc_lt = `&ebc_lt=${parseInt(infoBeer.ebc + (infoBeer.ebc * percentage))}`;
    const ebc_gt = `&ebc_gt=${parseInt(infoBeer.ebc - (infoBeer.ebc * percentage))}`;

    return fetch(`https://api.punkapi.com/v2/beers?per_page=4${abv_lt}${abv_gt}${ibu_lt}${ibu_gt}${ebc_lt}${ebc_gt}`)
      .then(toJson)
      .then(data => {
        dispatch({
          type: GET_SIMILAR,
          payload: { data, infoBeer },
        })
      })
  }
}

function normalizeAdvancedSearch(advancedSearch) {
  /* 
    Normalize advanced search fields, verifying if there are values 
    and normalize names for query
  */
  const ibuGt = advancedSearch['ibuGt'] ? `&ibu_gt=${advancedSearch['ibuGt']}` : '';
  const ibuLt = advancedSearch['ibuLt'] ? `&ibu_lt=${advancedSearch['ibuLt']}` : '';
  const abvGt = advancedSearch['abvGt'] ? `&abv_gt=${advancedSearch['abvGt']}` : '';
  const abvLt = advancedSearch['abvLt'] ? `&abv_lt=${advancedSearch['abvLt']}` : '';
  const ebcGt = advancedSearch['ebcGt'] ? `&ebc_gt=${advancedSearch['ebcGt']}` : '';
  const ebcLt = advancedSearch['ebcLt'] ? `&ebc_lt=${advancedSearch['ebcLt']}` : '';
  const brewedBefore = advancedSearch['brewedBefore'] ? `&brewed_before=${advancedSearch['brewedBefore']}` : '';
  const brewedAfter = advancedSearch['brewedAfter'] ? `&brewed_after=${advancedSearch['brewedAfter']}` : '';

  return `${ibuGt}${ibuLt}${abvGt}${abvLt}${ebcGt}${ebcLt}${brewedBefore}${brewedAfter}`;
}

export function clear() {
  return dispatch => {
    dispatch({ type: CLEAR });
  }
}

export function clearAdvancedSearch() {
  return dispatch => {
    dispatch({ type: CLEAR_ADVANCE_SEARCH });
  }
}

export function removeFavourite(id) {
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: REMOVE_FAVOURITE, payload: { id } });
  }
}

export function changeAdvancedSearch(advancedSearch) {
  return dispatch => {
    dispatch({ type: CLEAR });
    dispatch({ type: ADVANCE_SEARCH, payload: { advancedSearch } });
  }
}

function toJson(res) {
  return res.json();
}