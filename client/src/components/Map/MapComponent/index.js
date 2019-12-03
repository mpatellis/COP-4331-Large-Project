import React from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Polygon, Polyline} from 'react-google-maps'
import mapStyles from './mapStyles.json';
import { compareDesc } from 'date-fns';
import { async } from 'rxjs/internal/scheduler/async';
import { tr } from 'date-fns/locale';

const defaultMapOptions = {
  styles: mapStyles
};


export default (props) => {
    const {zones, setZones, cords, setCords} = props
    
    const Map = withScriptjs(withGoogleMap((props) => { 
        const [render, setRender]= React.useState(true)
        const [shiftPressed, setShiftPressed] = React.useState(false)
        const [escPressed, setEscPressed] = React.useState(false)
        
        async function handleClick(event) {
            if (shiftPressed) {
            var temp = cords
    
            async function setPoint() {
                temp.push({ lat: event.latLng.lat(), lng: event.latLng.lng()})
                setCords(temp)
            }
    
            setPoint().then(rerender()).catch()
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
                setEscPressed(true)
                setCords([])
            }
            if (event.key == 'Backspace'){
                var temp = cords
                temp.pop()
                setCords(temp)
                rerender()
            }
            if (event.key == 'Enter'){
                var temp = zones
                temp.push(cords)
                setZones(temp)
                setCords([])
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
            {(cords.length >2) && (render) && !shiftPressed &&
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
            }}
            />}
            {render && shiftPressed &&
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
            }}/>}</div>
        }

        function AllZones() {
            return <div>
                {(zones.length !=0) && !shiftPressed && zones.map((zone) =>
                    <Polygon
                    path={zone}
                    key={1}
                    options={{
                        fillColor: "#000",
                        fillOpacity: 0.4,
                        strokeColor: "#000",
                        strokeOpacity: 1,
                        strokeWeight: 1
                    }}
                    onClick={() => {
                    }}/>
                    )}
            </div>
        }
    
       return ( 
            <GoogleMap
                defaultZoom={16}
                defaultCenter={{lat: 28.602427, lng: -81.200058}}
                defaultOptions={defaultMapOptions}
                onClick={(e) => handleClick(e)}
                // options={{streetViewControl: false}}
            >
                <NewZone/>
                <AllZones/>
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