import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import Tabs from 'react-native-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BottomTabs extends Component {

  onSelect(el) {
    if(el.props.name == this.props.page) return;
    return Actions.pop() || Actions[el.props.name]()
  }

  render() {
    return (
      <Tabs selected={this.props.page} style={{backgroundColor:'white'}}
            selectedStyle={{color: 'black'}} onSelect={this.onSelect.bind(this)}>
          <Icon size={24} name="search" color="#c8c3c3"/>
          <Icon size={24} name="download" color="#c8c3c3"/>
      </Tabs>
    )
  }
}
