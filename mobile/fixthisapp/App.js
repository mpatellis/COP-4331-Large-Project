/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    // the ip is my ip on my local network. It didn't work with localhost
    // Seemed like the only solution I found was just not using localhost
    return fetch('http://192.168.1.126/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'hello',
        password: 'asd',
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
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}
