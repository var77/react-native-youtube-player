import * as types from './types';
import * as Utils from '../helpers/utils';
import Config from '../config';
import _ from 'underscore';

export function searchSong(query) {
  return async (dispatch) => {
    let res = await fetch(`${Config.SEARCH_API_URL}${query}`);
    res = await res.json();
    res = await setDownloadedSongs(Utils.filterSearchResults(res));
    return dispatch(setSearchResults(res));
  }
}

export function setSearchResults(res) {
  return {
    type: types.SEARCH,
    res
  }
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
