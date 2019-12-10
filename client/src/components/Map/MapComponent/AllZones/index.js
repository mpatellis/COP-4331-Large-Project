import React from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Polygon, Polyline} from 'react-google-maps'
import { MapContext } from '../../MapContext'
import NewZoneTemplate from '../zoneTemplate'

export default (props) => {
    const [zones, setZones, cords, setCords, parentZone, setParentZone] = React.useContext(MapContext)
    const [renderInfo, setRenderInfo] = React.useState(true)
    const [newZone, setNewZone] = React.useState({})
    var tmpZone = zones.slice(0)
    var PAndCZones = zones.slice(0)
    if (parentZone[0] !=null) {
      PAndCZones.unshift(parentZone[0])
    }
    if(cords.length > 2) {
      
      newZone.coords = cords
      PAndCZones.push(newZone)
    }
    function rerenderInfo() {
        setRenderInfo(false)
        setRenderInfo(true)
    }

    React.useEffect(() => {
        const intervalId = setInterval(() => {  
          if (JSON.stringify(tmpZone)!=JSON.stringify(zones)) {
            rerenderInfo()
            tmpZone = zones.slice(0)
          }
            
        }, 500)
      
        return () => clearInterval(intervalId);
      
      })

    return <div>
        {(PAndCZones.length !=0) && PAndCZones.map((zone) =>
            <Polygon
            path={zone.coords}
            key={zone._id}
            options={{
                fillColor: zone.color,
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