import React from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Polygon, Polyline} from 'react-google-maps'
import { MapContext } from '../../MapContext'

export default (props) => {
    const [zones, setZones, cords, setCords] = React.useContext(MapContext)
    console.log(zones)

    return <div>
        {(zones.length !=0) && zones.map((zone) =>
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