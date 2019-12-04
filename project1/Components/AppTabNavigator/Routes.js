import React, {Component} from 'react';
import {Router, Stack, Scene } from 'react-native-router-flux';

import Signin from './Signin';
import Signup from './Signup';
import HomeTab from './HomeTab';
export default class Routes extends React.Component {
    
  render() {
      return(
        <Router>
        <Stack key="root" hideNavBar = {true}>
          <Scene  navigation = {this.props.navigation} key="login" component={Signin} title="Login" />
          <Scene  navigation = {this.props.navigation} key="Signup" component={Signup} title="Register" />
        </Stack>
      </Router>
      )
  }
}