import React from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Polygon, Polyline} from 'react-google-maps'
import mapStyles from './mapStyles.json';
import { compareDesc } from 'date-fns';

const defaultMapOptions = {
  styles: mapStyles
};



const Map = withScriptjs(withGoogleMap((props) => { 

    const [cords, setCords] = React.useState([{lat: 28.603425464148174, lng: -81.20161368122865}, {lat: 28.600072094150534, lng: -81.19901730290223}, {lat: 28.601334330248353, lng: -81.19644238224794}, {lat: 28.60459346677067, lng: -81.20030476322938}]);

    function handleClick(event) {
        var temp = cords
        if (temp.length == 0 ) {
            temp.push({ lat: event.latLng.lat(), lng: event.latLng.lng()})
        } else {
            var first = temp[0]
            temp.pop()
            temp.push({ lat: event.latLng.lat(), lng: event.latLng.lng()})
            temp.push(first)
        }
        setCords(temp)
        console.log(cords)
    }

   return ( <GoogleMap
        defaultZoom={16}
        defaultCenter={{lat: 28.602427, lng: -81.200058}}
        defaultOptions={defaultMapOptions}
        onClick={(e) => handleClick(e)}
        // options={{streetViewControl: false}}
    >
        <Polygon
        path={cords}
        key={1}
        options={{
            fillColor: "#000",
            fillOpacity: 0.4,
            strokeColor: "#000",
            strokeOpacity: 1,
            strokeWeight: 1
        }}
        onClick={() => {
            console.log("ahmet")
        }}/>
    </GoogleMap>
   )
}
))


const FullMap = (props) => {
    return (
        <div style={{width: '100%', height: '100%',  flexGrow: 1} }>
            <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAXBHEIWg8ArKySS48FHamqFou2nvUexU8`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

export default FullMap