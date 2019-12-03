import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet
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
        coordinates: [[
            {name: '1', latitude: 28.606242, longitude: -81.206311},
            {name: '2', latitude: 28.610376, longitude: -81.192297},
            {name: '3', latitude: 28.604032, longitude: -81.189344},
            {name: '4', latitude: 28.591729, longitude: -81.194586},
            {name: '5', latitude: 28.597840, longitude: -81.207318},
        ],[
            {name: '1', latitude: 28.606242, longitude: -81.206311},
            {name: '2', latitude: 28.610376, longitude: -81.192297},
            {name: '3', latitude: 28.604032, longitude: -81.189344},
            {name: '4', latitude: 28.591729, longitude: -81.194586},
            {name: '5', latitude: 28.597840, longitude: -81.207318},
        ],[
            {name: '1', latitude: 28.606242, longitude: -81.206311},
            {name: '2', latitude: 28.610376, longitude: -81.192297},
            {name: '3', latitude: 28.604032, longitude: -81.189344},
            {name: '4', latitude: 28.591729, longitude: -81.194586},
            {name: '5', latitude: 28.597840, longitude: -81.207318},
        ]]
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
                    {this.state.coordinates.map((item) => {
                        <Polygon
                        name = {item.name}
                        coordinates = {item.location.coordinates}
                        fillColor = {'rgba(100,200,200,0.3)'}
                        />
                    })}
                <Polygon
                coordinates = {this.state.coordinates}
                fillColor = {'rgba(100,200,200,0.3)'}
                />
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