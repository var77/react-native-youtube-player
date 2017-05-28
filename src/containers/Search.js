import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';

import Styles from '../styles';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import SearchResults from './SearchResults';


export default class Search extends Component {
  state = {searchQuery: ''}

  render() {
    return (
        <View style={Styles.homeContainer}>
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
              onSubmitEditing={() => this.props.search(this.state.searchQuery)}
              />
            </View>
            <SearchResults />
        </View>
   );
  }
}
