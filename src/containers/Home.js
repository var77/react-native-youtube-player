import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../actions';
import Styles from '../styles';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import * as Progress from 'react-native-progress';
import Downloads from './Downloads';
import Search from './Search';

class Home extends Component {
  componentDidMount() {
    this.props.getSongs();
  }

  deleteSong(index, song) {
    this.props.deleteSong(index, song);
  }

  search(query) {
    this.props.searchSong(query);
  }

  render() {
    return (
      <ScrollableTabView
          style={{marginTop: 12}}
          locked={true}
          tabBarUnderlineStyle={{backgroundColor: "#c8c3c3"}}
          tabBarActiveTextColor="#c8c3c3"
          initialPage={Platform.OS=='ios'?1: 0}>
        <Search
          tabLabel="Search"
          downloadMusic={this.props.downloadMusic}
          progress={this.props.progress}
          search={this.search.bind(this)}
        />
        <Downloads
          tabLabel="Downloads"
          songs={this.props.songs}
          deleteSong={this.deleteSong.bind(this)}
        />
      </ScrollableTabView>
   );
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {
    return {
      songs: store.songs,
      progress: store.progress
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
