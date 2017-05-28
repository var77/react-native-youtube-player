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

  songClick(data, index, downloaded) {
    Actions.player({searchedSongs: this.props.searchResults, songIndex: index, onMusicDownload: this.props.downloadMusic.bind(this), downloaded, search: true})
  }

  render() {
    return (
      this.props.searchResults.length?<FlatList
        style={Styles.fullWidth}
        data={this.props.searchResults}
        renderItem={({item, index}) => {
          return (<Song
                keyExtractor={(item, index) => item.id}
                key={item.id}
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
      searchResults: store.searchResults
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
