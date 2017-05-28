import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  Dimensions,
  Platform
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import Styles from '../styles';
import * as Utils from '../helpers/utils';
import {ForwardButton, BackwardButton, PlayButton, ShuffleButton, VolumeButton, DownloadButton, SongSlider} from '../components/PlayerButtons';
import MusicControl from 'react-native-music-control';
import * as Progress from 'react-native-progress';

let {height, width} = Dimensions.get('window');

class Player extends Component {
  constructor(props){
    super(props);
    this.state = {
      playing: true,
      muted: false,
      shuffle: false,
      sliding: false,
      currentTime: 0,
      songIndex: props.songIndex,
      songs: props.searchedSongs || this.props.songs
    };
  }

  setPlayingSong(duration) {
    let song = this.state.songs[this.state.songIndex];
    MusicControl.setNowPlaying({
      title: song.title,
      artwork: song.thumb,
      artist: song.artist,
      duration
    });
  }

  togglePlay(){
    this.setState({ playing: !this.state.playing });
  }

  toggleVolume(){
    this.setState({ muted: !this.state.muted });
  }

  toggleShuffle(){
    this.setState({ shuffle: !this.state.shuffle });
  }

  goBackward(){
    if(this.state.currentTime < 3 && this.state.songIndex !== 0 ){
      this.setState({
        songIndex: this.state.songIndex - 1,
        currentTime: 0,
      });
    } else {
      this.refs.audio.seek(0);
      this.setState({
        currentTime: 0,
      });
    }
  }

  goForward(){
    if(this.state.shuffle || this.state.songIndex + 1 != this.state.songs.length) {
      this.setState({
        songIndex: this.state.shuffle ? this.randomSongIndex() : this.state.songIndex + 1,
        currentTime: 0,
        playing: true
      });
      this.refs.audio.seek(0);
    }
  }

  randomSongIndex(){
    let maxIndex = this.state.songs.length - 1;
    return Math.floor(Math.random() * (maxIndex - 0 + 1)) + 0;
  }

  setTime(params) {
    if( !this.state.sliding ){
      this.setState({ currentTime: params.currentTime });
    }
  }

  onLoad(params) {
    let duration = params.duration / 2; //react-native-vide bug
    this.setState({ songDuration: duration });
    this.setPlayingSong(duration);
  }

  onSlidingStart(){
    this.setState({ sliding: true });
  }

  onSlidingChange(value){
    let newPosition = value * this.state.songDuration;
    this.setState({ currentTime: newPosition });
  }

  onSlidingComplete(){
    this.refs.audio.seek( this.state.currentTime );
    this.setState({ sliding: false });
  }

  onEnd(){
    this.setState({ playing: false });
  }

  renderVideoPlayer() {
    if(this.state.songs[this.state.songIndex]) {
    return (<Video
              source={{uri: this.state.songs[this.state.songIndex].path }}
              volume={this.state.muted ? 0 : 1.0}
              muted={false}
              ref="audio"
              paused={!this.state.playing}
              playInBackground={true}
              onLoad={ this.onLoad.bind(this) }
              onProgress={ this.setTime.bind(this) }
              onEnd={ this.onEnd.bind(this) }
              resizeMode="cover"
              repeat={false}/>);
      }
      return null;
  }

  componentDidMount() {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableControl('seekForward', false);
    MusicControl.enableControl('seekBackward', false);
    MusicControl.enableBackgroundMode(true);
    MusicControl.on('play', ()=> {
      this.setState({playing: true});
    });
    MusicControl.on('pause', ()=> {
      this.setState({playing: false});
    });
    MusicControl.on('nextTrack', this.goForward.bind(this));
    MusicControl.on('previousTrack', this.goBackward.bind(this));
  }

  songImage = require('../img/music.jpg');

  renderProgressBar() {
    if(this.props.searchedSongs) {
      let song = this.state.songs[this.state.songIndex];
      return <Progress.Bar progress={this.props.progreses[song.id]} width={width} color="#fff" borderColor="transparent"/>
    }
    return null
  }

  render() {
    let songPercentage;
    if( this.state.songDuration !== undefined ){
      songPercentage = this.state.currentTime / this.state.songDuration;
    } else {
      songPercentage = 0;
    }

    return (
      <View style={Styles.container}>
        {this.renderVideoPlayer()}
        <View style={ Styles.header }>
          <Text style={ Styles.headerText }>
            {this.state.songs[this.state.songIndex].artist}
          </Text>
        </View>
        <View style={ Styles.headerClose }>
          <FontAwesome onPress={ Actions.pop } name="chevron-left" size={15} color="#fff" />
        </View>
        <DownloadButton
          download={this.props.searchedSongs}
          downloading={this.state.songs[this.state.songIndex].downloading}
          downloadMusic={() => this.props.onMusicDownload(this.state.songs[this.state.songIndex])}
        />
        {this.renderProgressBar()}
        <Image
          style={ Styles.songImage }
          source={{uri: (Platform.OS == 'android'?"file://": "") + this.state.songs[this.state.songIndex].thumb}}/>
        <Text style={ Styles.songTitle }>
          {this.state.songs[this.state.songIndex].title}
        </Text>
        <SongSlider
          onSlidingStart={this.onSlidingStart.bind(this)}
          onSlidingComplete={ this.onSlidingComplete.bind(this) }
          onValueChange={ this.onSlidingChange.bind(this) }
          value={ songPercentage }
          songDuration={this.state.songDuration}
          currentTime={this.state.currentTime}
          disabled={true}
        />
        <View style={ Styles.controls }>
          <ShuffleButton
            shuffle={this.state.shuffle}
            toggleShuffle={this.toggleShuffle.bind(this)}
            disabled={this.props.search}
          />
          <BackwardButton
            goBackward={this.goBackward.bind(this)}
          />
          <PlayButton
            togglePlay={this.togglePlay.bind(this)}
            playing={this.state.playing}
          />
          <ForwardButton
            songs={this.state.songs}
            shuffle={this.state.shuffle}
            songIndex={this.state.songIndex}
            goForward={this.goForward.bind(this)}
            disabled={this.props.search}
          />
          <VolumeButton
            muted={this.state.muted}
            toggleVolume={this.toggleVolume.bind(this)}
          />
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {
    return {
      songs: store.songs,
      searchResults: store.searchResults,
      progreses: store.progreses
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
