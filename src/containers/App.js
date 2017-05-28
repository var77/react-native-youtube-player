import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import Downloads from './Downloads';
import Search from './Search';
import Player from './Player';
import MiniPlayer from './MiniPlayer';
import Styles from '../styles';

const store = createStore(reducer, applyMiddleware(thunk));
const RouterWithRedux = connect()(Router);

export default class App extends Component {
  render() {
    return (
     <Provider store={store}>
      <View style={{flex: 1}}>
      <MiniPlayer />
       <RouterWithRedux>
         <Scene key="root">
          <Scene key="download" component={Downloads} initial title="Downloads" duration={0} animation="fade"/>
          <Scene key="search" component={Search} initial title="Search" duration={0} animation="fade"/>
          <Scene key="player" component={Player} hideNavBar hideTabBar direction="vertical"/>
         </Scene>
       </RouterWithRedux>
       </View>
     </Provider>
   );
  }
}
