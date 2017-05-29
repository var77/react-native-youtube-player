import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Image
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
      if(song) {
        try {
          let songInfo = await Utils.getSongInfo(song.path);
          song.path = songInfo.url;
          song.pathChanged = true;
        } catch(err) {
          console.warn(err);
        }

      }
    }
    this.props.setPlayingSong(index, this.props.searchResults);
  }

  render() {
    let noVideoBox = this.props.loading ? (
        <Image
            style={{width: 100, height: 100}}
            source={{uri: 'http://www.miat.com/images/loading4.gif'}}
        />
    ) : <Text>No Search Results</Text>;

    return (
      this.props.searchResults.length?<FlatList
        style={Styles.fullWidth}
        data={this.props.searchResults}
        renderItem={({item, index}) => {
          return (<Song
                keyExtractor={item => item.id}
                onPress={this.songClick.bind(this, item, index, item.downloaded)}
                songName={item.title}
                artistName={item.artist}
                songImage={item.thumb}
                id={item.id}
                search={true}
                songIndex={index}
                />)}}
      />:(
        <View style={Styles.centerContainer}>
            {noVideoBox}
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
