import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Animated, { Easing } from 'react-native-reanimated';
import {Actions } from 'react-native-router-flux';
import * as axios from 'axios';

const { width, height } = Dimensions.get('window');

export default class Signin extends React.Component {
  state = {
    username: '',
    password: '',
    auth_token: ''
  }
  handleSubmit = event => {
    event.preventDefault()
    axios
      .post('/user/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        JWT.keep(response.data.token)
        setPage('home')
      })
      .catch(error => {
        console.error(error)
      })
  }
 /* constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://192.168.1.70/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    })
    .then((response) => 
    {
      if (response.status == 200)
      {
        console.log("it work") 
      } else {
        console.log("it not work")
      }
      response.json()
    })
    .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: "login maybe",
        }, function(){
        });

    })
    .catch((error) =>{
      console.error(error);
    });
  }*/

  render() {
      return(
        <View style = {styles.container}>
        <TextInput placeholder = "Username" onChangeText={ TextInputValue => this.setState({username : TextInputValue }) } style = {styles.textInput} placeholderTextColor = "black" />
            <TextInput placeholder = "password" onChangeText={ TextInputValue => this.setState({password : TextInputValue }) } style = {styles.textInput} placeholderTextColor = "black" />
            <TouchableOpacity onPress={this.handleSubmit}>
            <Animated.View style = {styles.button1}>
              <Text style = {{fontSize: 20, fontWeight: 'bold',color: 'white'}}>
                SIGN IN
              </Text>
          </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.Signup()}>
            <Text>                             No account? SignUp</Text>
          </TouchableOpacity>
          </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white'

    },
    button: {
      backgroundColor: 'white',
      height: 70,
      marginHorizontal: 20,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      shadowOffset: { width: 2, height:2},
      shadowColor: 'black',
      shadowOpacity: 0.2
    },
    button1: {
      backgroundColor: '#000000',
      height: 70,
      marginHorizontal: 20,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      shadowOffset: { width: 2, height:2},
      shadowColor: 'black',
      shadowOpacity: 0.2
    },
    closeButton: {
      height: 40,
      width: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: -20,
      left: width /2 -20,
      shadowOffset: { width: 2, height:2},
      shadowColor: 'black',
      shadowOpacity: 0.2
    },
    textInput: {
      height: 50,
      borderRadius: 25,
      borderWidth:0.5,
      marginHorizontal: 20,
      paddingLeft: 10,
      marginVertical: 5,
      borderColor: 'rgba(0,0,0,0.2)'
    },
    
  });