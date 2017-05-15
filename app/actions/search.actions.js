import * as types from './types';
import * as Utils from '../helpers/utils';
import Config from '../config';

export function searchSong(query) {
  return async (dispatch) => {
    let res = await fetch(`${Config.SEARCH_API_URL}${query}`);
    res = await res.json();
    res = Utils.filterSearchResults(res);
    return dispatch(setSearchResults(res));
  }
}

export function setSearchResults(res) {
  return {
    type: types.SEARCH,
    res
  }
}
