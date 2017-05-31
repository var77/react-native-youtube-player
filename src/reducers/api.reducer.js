import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';
import _ from 'underscore';

export const songs = createReducer([], {
    [types.DOWNLOADED](state, action) {
        if(state.indexOf(action.path) > -1) {
          return state;
        }

        return [...state, action.path];
    },
    [types.SONGS](state, action) {
      return action.songs;
    }
});

export const progreses = createReducer({}, {
  [types.PROGRESS](state, action) {
    state[action.id] = action.progress;
    return {...state};
  }
});

export const searchResults = createReducer([], {
  [types.SEARCH](state, action) {
    return action.res;
  }
});

export const loading = createReducer(false, {
    [types.LOADING](state, action) {
        return action.res;
    }
});
