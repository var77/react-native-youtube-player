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
import Icon from 'react-native-vector-icons/FontAwesome';


const TabIcon = (props) => <Icon size={24} name={props.name} color={props.selected? "black": "#c8c3c3"}/>;

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
          <Scene key="home" initial tabs={true}>
              <Scene key="search" component={Search} title="Search" duration={0} icon={TabIcon} animation="fade"/>
              <Scene key="download" component={Downloads} initial title="Downloads" icon={TabIcon} duration={0} animation="fade"/>
          </Scene>
          <Scene key="player" component={Player} hideNavBar hideTabBar direction="vertical"/>
         </Scene>
       </RouterWithRedux>
       </View>
     </Provider>
   );
  }
}
