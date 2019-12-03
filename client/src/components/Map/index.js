import React from 'react'
import MapComponent from './MapComponent'
import SplitPane from '../SplitPane'
import MapData from './MapData'




export default () => {
    const [zones, setZones] = React.useState([])
    const [cords, setCords] = React.useState([]);
    
    function Left() {
        return <MapComponent zones={zones} setZones={setZones}
                            cords={cords} setCords={setCords}/>
    }
    function Right() {
        return <MapData zones={zones} setZones={setZones}
                    cords={cords} setCords={setCords}/>
    }
return (
    <SplitPane Left={Left} Right={Right}/>
)
}