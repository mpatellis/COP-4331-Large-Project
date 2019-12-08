import React from 'react';
import { StyleSheet, Text, View,Platform,StatusBar } from 'react-native';
import {createAppContainer, createSwitchNavigator, withNavigation } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'native-base';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Entypo } from '@expo/vector-icons';

import HomeTab from './Components/AppTabNavigator/HomeTab';
import AddMediaTab from './Components/AppTabNavigator/AddMediaTab';
import SearchTab from './Components/AppTabNavigator/SearchTab';
import MapTab from './Components/AppTabNavigator/MapTab';
import SettingTab from './Components/AppTabNavigator/SettingTab';
import Login from './Components/AppTabNavigator/Login';
import Signup from './Components/AppTabNavigator/Signup';

const createTabBarIconWrapper = (
  TabBarIconComponent,
  defaultProps,
) => props => <TabBarIconComponent {...defaultProps} color={props.tintColor} />

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerLeft: <Icon name = 'camera'style = {{paddingLeft: 10}}/>,
    title: "Fix",
    headerRight: <Icon name = 'send'style = {{paddingRight: 10}}/>,
  }
  render() {
    return (
      <AppTabNavigator />
    );
  }
}

const AppTabNavigator = createBottomTabNavigator({
  
  HomeTab:{
    screen:HomeTab,
    navigationOptions: {
      headerLeft:(<Icon name = 'camera'style = {{paddingLeft: 10}}/>),
      title: "FixThis",
      headerRight:(<Icon name = 'send'style = {{paddingRight: 10}}/>)
    }
  },
  SearchTab:{
    screen:SearchTab
  },
  AddMediaTab:{
    screen: AddMediaTab,
    navigationOptions: {
      header: 'null',
      tabBarVisible: false,
      tabBarIcon: createTabBarIconWrapper(Entypo, {
        name: 'squared-plus',
        size: 30,
      })
    },
  
  },
  MapTab:{
    screen: MapTab
  },
  SettingTab:{
    screen: SettingTab
  }
},{
  tabBarOptions:{
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    showLabel: false,
    showIcon: true
  }
})

const AppNavigator = createStackNavigator({
  Home: {
    screen: AppTabNavigator,
  },
},{
  defaultNavigationOptions:({navigation}) =>{
    return{
      headerLeft:(<Icon name = 'camera'style = {{paddingLeft: 10}}/>),
      title: "FixThis",
      headerRight:(<Icon name = 'send'style = {{paddingRight: 10}}/>)
    }
  }
});
const AppSwitchNavigator = createSwitchNavigator({
  login: {screen:Login},
  Home: {screen: AppNavigator},
  Signup: {screen: Signup}
},{
  headerMode: 'none'
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidHeader: {
    ...Platform.select({
        android: {
            marginTop: StatusBar.currentHeight,
            backgroundColor: 'white'
        }
    })
},
androidHeaderTitle: {
    ...Platform.select({
        android: {
            alignItems: 'flex-end'
        }
    })

}
});

export default createAppContainer(withNavigation(AppSwitchNavigator));
