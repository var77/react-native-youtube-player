import { ActionConst } from 'react-native-router-flux';
import createReducer from '../helpers/createReducer';

export const scene = createReducer({}, {
  [ActionConst.FOCUS](state, action) {
    return action.scene;
  }
})
