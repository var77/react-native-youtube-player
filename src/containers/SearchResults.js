import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../actions';
import Styles from '../styles';
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
    let loadingText = this.props.loading ? <ActivityIndicator size="large" animating={true}/>: <Text>No Search Results</Text>;

    return (
      this.props.searchResults.length?<FlatList
        style={Styles.fullWidth}
        data={this.props.searchResults}
        renderItem={({item, index}) => {
          return (<Song
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
            {loadingText}
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
      songs: store.songs,
      loading: store.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
