import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../actions';

import Styles from '../styles';
import { Hideo } from 'react-native-textinput-effects';
import SearchResults from './SearchResults';
import BottomTabs from '../components/BottomTabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Search extends Component {
  state = {searchQuery: '', page: 'search'}

  componentDidMount() {
    //this.props.getSongs();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={[Styles.homeContainer, {paddingBottom: 100}]}>
          <View style={Styles.searchInputContainer}>
            <Hideo
              iconClass={FontAwesome}
              iconName={'search'}
              iconColor={'white'}
              iconBackgroundColor={'#c8c3c3'}
              inputStyle={{ color: '#464949' }}
              placeholder="Song name"
              value={this.state.searchQuery}
              onChangeText={searchQuery => this.setState({searchQuery})}
              onSubmitEditing={() => this.props.searchSong(this.state.searchQuery)}
              />
            </View>
            <SearchResults />
         </View>
          <BottomTabs page={this.state.page}/>
        </View>
   );
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {
    return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
