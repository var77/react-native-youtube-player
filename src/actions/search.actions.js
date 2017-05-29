import _ from 'underscore';

import * as types from './types';
import * as Utils from '../helpers/utils';
import Config from '../config';

export function searchSong(query) {
  return async (dispatch) => {
    dispatch(setSearchResults([]));
    dispatch(setLoading(true));
    let res = await fetch(`${Config.SEARCH_API_URL}${query}`);
    res = await res.json();
    res = await setDownloadedSongs(Utils.filterSearchResults(res));
    dispatch(setLoading(false));
    return dispatch(setSearchResults(res));
  }
}

export function setSearchResults(res) {
  return {
    type: types.SEARCH,
    res
  }
}

function setLoading(res) {
    return {
        type: types.LOADING,
        res
    };
}

async function setDownloadedSongs(songs) {
  let downloadedSongs = await Utils.getSongsFromStorage();
  return _.map(songs, song => {
    let findedSong = _.findWhere(downloadedSongs, {id: song.id});
    if(findedSong) {
      findedSong.downloaded = true;
      return findedSong;
    }

    return song;
  });
}
