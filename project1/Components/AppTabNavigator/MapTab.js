import React, {Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import {Icon} from 'native-base';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Permissions from 'expo-permissions';

class MapTab extends Component{
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name = "md-map" style = {{color: tintColor}}/>
        )
    }
    state = {
        latitude: null,
        longitude: null
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