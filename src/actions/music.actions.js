import * as types from './types';
import RNFetchBlob from 'react-native-fetch-blob';
import * as Utils from '../helpers/utils';
import {AsyncStorage} from 'react-native';
import RNFS from 'react-native-fs';

let DOWNLOADING_SONGS = [], DOWNLOADED_SONGS = [];

export function downloadMusic(song, changedPath) {
    return async (dispatch) => {
      try {
        if(song.downloading) return;
        song.preparing = true;
        song.downloading = true;
        let songs = await Utils.getSongsFromStorage();
        if(Utils.findSongInCollection(song.id, songs)) return {};
        DOWNLOADING_SONGS.push(song);
        let dirs = RNFetchBlob.fs.dirs;
        let songInfo = {url: song.path}
        if(!changedPath) {
          songInfo = await Utils.getSongInfo(song.path);
        }
        song.preparing = false;
        const songRes = await RNFetchBlob
                        .config({
                          path: `${dirs.DocumentDir}/${song.id}.mp3`
                        })
                        .fetch('GET', songInfo.url, {})
                        .progress((received, total) => {
                          dispatch(setProgress(received / total, song.id));
                        });
          const imgRes = await RNFetchBlob
                          .config({
                            path: `${dirs.DocumentDir}/${song.id}.jpg`
                          })
                          .fetch('GET', song.thumb, {});
          song.downloading = false;
          song.downloaded = true;
          song.path = songRes.path();
          song.thumb = imgRes.path();
          DOWNLOADING_SONGS.pop();
          DOWNLOADED_SONGS.push(song);
          if(!DOWNLOADING_SONGS.length) {
            let updatedSongs = await Utils.setSongsToStorage(DOWNLOADED_SONGS);
            DOWNLOADED_SONGS = [];
            return dispatch(setSongs(updatedSongs));
          }
      } catch(err) {
        DOWNLOADING_SONGS.pop();
        song.downloading = false;
        song.preparing = false;
        let songs = await Utils.getSongsFromStorage();
        dispatch(setSongs(songs));
        console.warn(err);
      }
    }
}

export function musicDownloaded(path) {
  return {
    type: types.DOWNLOADED,
    path
  }
}

export function deleteSong(index, song) {
  return async (dispatch) => {
    let songs = await Utils.getSongsFromStorage();
    try {
      await RNFS.unlink(song.path);
      await RNFS.unlink(song.thumb);
      songs.splice(index, 1);
      await AsyncStorage.setItem('songs', JSON.stringify(songs));
      return dispatch(setSongs(songs));
    } catch(err) {
        //If song not found in path
        songs.splice(index, 1);
        await AsyncStorage.setItem('songs', JSON.stringify(songs));
        return dispatch(setSongs(songs));
    }
  }
}

export function setSongs(songs) {
  return {
    type: types.SONGS,
    songs
  }
}

export function setProgress(progress, id) {
  return {
    type: types.PROGRESS,
    progress,
    id
  }
}
