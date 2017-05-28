import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Styles from '../styles';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Actions} from 'react-native-router-flux';
import Song from '../components/Song';

export default class Downloads extends Component {
  onSongPlay(index) {
    Actions.player({songIndex: index})
  }

  deleteSong(index) {
    this.props.deleteSong(index, this.props.songs[index]);
  }

  render() {
    return (
        <ScrollView containerStyle={[Styles.homeContainer, Styles.noPaddingHorizontal]}>
          {
            this.props.songs.map((song, index) => {
              return <Song
                      key={index}
                      onPress={this.onSongPlay.bind(this, index)}
                      songName={song.title}
                      artistName={song.artist}
                      songImage={song.thumb}
                      deleteSong={this.deleteSong.bind(this, index)}
                      />
            })
          }
        </ScrollView>
   );
  }
}
