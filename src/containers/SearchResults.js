import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../actions';
import Styles from '../styles';
import * as Progress from 'react-native-progress';
import Song from '../components/Song';
import * as Utils from '../helpers/utils';

class SearchResults extends Component {

  async songClick(data, index, downloaded) {
    if(!downloaded) {
      let song = this.props.searchResults[index];
      try {
        song.preparing = true;
        this.props.setSearchResults([...this.props.searchResults]);
        let songInfo = await Utils.getSongInfo(song.path);
        song.path = songInfo.url;
        song.pathChanged = true;
        song.preparing = false;
        this.props.setSearchResults([...this.props.searchResults]);
      } catch(err) {
        console.warn(err);
      }
    }
    this.props.setPlayingSong(index, this.props.searchResults);

  }

  render() {
    return (
      this.props.searchResults.length?<FlatList
        style={Styles.fullWidth}
        data={this.props.searchResults}
        renderItem={({item, index}) => {
          return (<Song
                keyExtractor={item => item.id}
                onPress={this.songClick.bind(this, item, index)}
                songName={item.title}
                artistName={item.artist}
                songImage={item.thumb}
                id={item.id}
                search={true}
                songIndex={index}
                />)}}
      />:(
        <View style={Styles.centerContainer}>
          <Text>No Search Results</Text>
        </View>
        )
    );
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {
    return {
      searchResults: store.searchResults,
      songs: store.songs
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
