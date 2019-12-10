import React from 'react'
import JWT from 'jwt-client'
import axios from 'axios'
import {getOwnedZones, getChildrenZone} from '../ZoneRoutes'



export const MapContext = React.createContext()

export const MapProvider = props => {
    const [zones, setZones] = React.useState([])
    const [parentZone, setParentZone] = React.useState([])
    const [cords, setCords] = React.useState([])
    const [zoneData, setZoneData] = React.useState([])

    var tmpParentZone = parentZone.slice(0)


    populate()
    React.useEffect(() => {
        const intervalId = setInterval(() => {  
        if (JSON.stringify(tmpParentZone)!=JSON.stringify(parentZone)) {
            populate()
            tmpParentZone = parentZone.slice(0)
        }
            
        }, 500)
    
        return () => clearInterval(intervalId);
    
    })
    function populate() {
        if (parentZone[0]==null) {
            while(zones.length > 0) zones.pop()
            getOwnedZones().then( async (res) => {
                for (var z in res) {
                    zones.push(res[z])
                    var id = res[z]._id
                    zones[z].children =  await getChildrenZone({zone_id: id})
                }
            })
        } else {
            while(zones.length > 0) zones.pop()
            getChildrenZone({zone_id: parentZone[0]._id}).then( async (res) => {
                for (var z in res) {
                    zones.push(res[z])
                    var id = res[z]._id
                    zones[z].children =  await getChildrenZone({zone_id: id})
                }
            })
        }
    }
    
    
    // .then(async res => {
    //     for (var z in zones) {
    //         zones[z].children =  await getChildrenZone({zone_id: zones[z]._id})
    //     }
    //     console.log(zones)
    // })

    


    return (
        <MapContext.Provider 
        value={[zones, setZones, cords, setCords, parentZone, setParentZone]}
        >
            {props.children}
        </MapContext.Provider>
    )
}