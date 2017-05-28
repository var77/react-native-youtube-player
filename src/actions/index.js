import * as musicActions from './music.actions';
import * as searchActions from './search.actions';
import * as playerActions from './player.actions';

export default {...musicActions, ...searchActions, ...playerActions};
