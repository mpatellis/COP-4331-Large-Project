import React from 'react'
import MapComponent from './MapComponent'
import SplitPane from '../SplitPane'
import { MapProvider } from './MapContext'
import ZoneInfo from './ZoneInfo'



export default () => {

    
    function Left() {
        return <MapComponent />
    }
    function Right() {
        return <ZoneInfo/>
    }
return (
    <MapProvider>
    <SplitPane Left={Left} Right={Right}/>
    </MapProvider>
)
}