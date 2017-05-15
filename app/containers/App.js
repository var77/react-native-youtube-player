import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import Home from './Home';
import Player from './Player';

const store = createStore(reducer, applyMiddleware(thunk));


export default class App extends Component {
  render() {
    return (
     <Provider store={store}>
       <Router>
         <Scene key="root">
         <Scene key="home" component={Home} initial hideNavBar hideTabBar/>
          <Scene key="player" component={Player} hideNavBar hideTabBar/>
         </Scene>
       </Router>
     </Provider>
   );
  }
}
