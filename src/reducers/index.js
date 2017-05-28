import { combineReducers } from 'redux';

import * as api from './api.reducer';

export default combineReducers({...api});
