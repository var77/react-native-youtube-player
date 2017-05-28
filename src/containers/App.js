import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import Downloads from './Downloads';
import Search from './Search';
import Player from './Player';

const store = createStore(reducer, applyMiddleware(thunk));


export default class App extends Component {
  render() {
    return (
     <Provider store={store}>
       <Router>
         <Scene key="root">
          <Scene key="download" component={Downloads} initial title="Downloads" duration={0} animation="fade"/>
          <Scene key="search" component={Search} initial title="Search" duration={0} animation="fade"/>
          <Scene key="player" component={Player} hideNavBar hideTabBar/>
         </Scene>
       </Router>
     </Provider>
   );
  }
}
