import { combineReducers } from 'redux';

import * as api from './api.reducer';
import * as player from './player.reducer';
import * as routes from './routes';

export default combineReducers({...api, ...player, ...routes});
