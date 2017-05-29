import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const songDuration = createReducer(0, {
  [types.SET_DURATION](state, action) {
    return action.duration;
  }
})

export const playing = createReducer(false, {
  [types.SET_PLAYING](state, action) {
    return action.status;
  }
})

export const songProgress = createReducer(0, {
  [types.SET_PROGRESS](state, action) {
    return action.time;
  }
})

export const songIndex = createReducer(0, {
  [types.SET_SONG_INDEX](state, action) {
    return action.index;
  }
})

export const playlist = createReducer([], {
  [types.SET_PLAYLIST](state, action) {
    return action.songs;
  }
})

export const shuffle = createReducer(false, {
  [types.SET_SHUFFLE](state, action) {
    return action.status;
  }
})

export const volume = createReducer(1, {
  [types.SET_VOLUME](state, action) {
    return action.volume;
  }
})
