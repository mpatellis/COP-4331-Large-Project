import React from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Polygon, Polyline, Marker} from 'react-google-maps'
import mapStyles from './mapStyles.json';
import { compareDesc } from 'date-fns';
import { async } from 'rxjs/internal/scheduler/async';
import { tr } from 'date-fns/locale';
import { MapContext } from '../MapContext'
import AllZones from './AllZones'
import NewZoneTemplate from './zoneTemplate'
import {addZone} from '../ZoneRoutes'

const defaultMapOptions = {
  styles: mapStyles
};


export default (props) => {
    const [zones, setZones, cords, setCords, parentZone, setParentZone] = React.useContext(MapContext)

    
    const Map = withScriptjs(withGoogleMap((props) => { 
        const [render, setRender]= React.useState(true)
        const [shiftPressed, setShiftPressed] = React.useState(false)
        const [escPressed, setEscPressed] = React.useState(false)
        const [newZone ,setNewZone] = React.useState(true)
        
        
        async function handleClick(event) {
            if (shiftPressed) {

    
            async function setPoint() {
                cords.push({ lat: event.latLng.lat(), lng: event.latLng.lng()})
                if (newZone) {
                    zones.push(NewZoneTemplate())
                    setNewZone(false)
                }
                zones[zones.length-1].coords.push({ lat: event.latLng.lat(), lng: event.latLng.lng()})
                console.log(cords)
                console.log(zones)
            }
    
            setPoint().then(rerender()).catch()
            }
        }


        function handleMouseMove (event) {
            if(!newZone) {
                if (zones[zones.length-1].coords.length < cords.length) {
                    cords.pop()
                }
                cords.push({ lat: event.latLng.lat(), lng: event.latLng.lng()})
            }
            if(shiftPressed) {
                rerender()
            }
        }
    
        function rerender() {
            setRender(false)
            setRender(true)
        }
    
        function keydown(event) {
            if (event.isComposing || event.keyCode === 229) {
                return;
              }
              console.log(event.key)
            if (event.key == 'Shift')
              setShiftPressed(true)
            if (event.key == 'Escape'){
                if (!newZone) {
                    setEscPressed(true)
                    while (cords.length > 0) {
                        cords.pop()
                    }
                    zones.pop()
                    setNewZone(true) 
                }
                
            }
            if (event.key == 'Backspace'){
                cords.pop()
                if (!newZone) {
                    zones[zones.length-1].coords = cords.slice(0)
                    if (cords.length == 0) {
                        zones.pop()
                        setNewZone(true)
                    }
                }
                
                    
                rerender()
            }
            if (event.key == 'Enter'){  
                if (!newZone) {
                    if (cords.length < 3 && !newZone) {
                        zones.pop()
                    } else {
                        setNewZone(true)
                        addZone(zones[zones.length-1]).then((res) => {
                            zones[zones.length-1]._id =res._id
                            while (cords.length > 0) {
                                cords.pop()
                            }
                            rerender()
                        }).catch()
                    }   
                }    
            }
        }
    
        function keyup(event) {
            if (event.isComposing || event.keyCode === 229) {
                return;
              }
            if (event.key == 'Shift')
              setShiftPressed(false)
            if (event.key == 'Escape')
              setEscPressed(false)
        }
    
        React.useEffect(() => {
            document.addEventListener("keydown", keydown);
            document.addEventListener("keyup", keyup);
        
            return () => {
              document.removeEventListener("keydown", keydown);
              document.removeEventListener("keyup", keyup);
            };
          });

        function NewZone() {
            return <div>
            {cords.length > 1 &&render && shiftPressed &&
            <Polyline
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
            }}/>}
            </div>
        }
    
       return ( 
            <GoogleMap
                defaultZoom={16}
                defaultCenter={{lat: 28.602427, lng: -81.200058}}
                defaultOptions={defaultMapOptions}
                onClick={(e) => handleClick(e)}
                // onMouseMove={(e) => handleMouseMove(e)}
                // options={{streetViewControl: false}}
            >
                <NewZone/>
                {!shiftPressed && render && <AllZones/> }
            </GoogleMap>
       )
    }
    ))



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