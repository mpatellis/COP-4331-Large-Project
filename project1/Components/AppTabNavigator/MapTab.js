import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from "react-native";
import {Icon} from 'native-base';
import MapView, {PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import * as Permissions from 'expo-permissions';

class MapTab extends Component{
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "md-map" style = {{color: tintColor}}/>
        )
    }
    state = {
        latitude: null,
        longitude: null,
        coordinates: []
    }

    async componentDidMount() {
        const { status } = await Permissions.getAsync(Permissions.LOCATION)
        if (status !== 'granted'){
            const response = await Permissions.askAsync(Permissions.LOCATION)
        }
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => this.setState({latitude, longitude}),
            (error) => console.log('Error:',error)
        )
        var token = await AsyncStorage.getItem('token');
        try{
            const response =  await fetch("https://fix-this.herokuapp.com/zone/ownedBy?user_id=5dee4e96939297001783e17f&mobile=true", {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        })
        const data = await response.json();
        console.log(data);
        console.log(data[0].coordinates)
        this.setState({coordinates: data})
    }catch(err) {
        console.log("Error fetching data-----------", err);
    }
    }
    render(){
        const {latitude,longitude} = this.state
        if(latitude){
            return (
                <MapView 
                showsUserLocation
                style = {{flex: 1}}
                provider={PROVIDER_GOOGLE}
                initialRegion = {{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                >
               {
                    this.state.coordinates.map((y)=>{
                        return (<Polygon key = {y._id} coordinates = {y.coordinates}
                            fillColor = {y.color}
                            />)
                    })
                }
                </MapView>
            );
        }
        return(
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>we need your location</Text>
            </View>
        )
    }

}
export default MapTab;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});