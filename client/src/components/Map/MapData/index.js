import React from 'react'

export default function ZoneInfo(props) {
    const {zones, setZones, cords, setCords} = props
    console.log(zones)
    console.log(cords)
    return(
        <div   style={{float:'left', height: '100%'}}>
            {(zones.length != 0) && zones.map((zone) => 
                <div style={ {margin: 5}}>
                    {'{'}
                    {(zone.length !=0) && zone.map((point) => 
                        <div>
                            <div> {'[ lat:'} {point.lat}, </div>
                            <div> {'  lng:'} {point.lng} ]</div>
                        </div>
                    )}
                    {'}'}
                </div>
            )}
            {(cords.length != 0) && cords.map((point) => 
                        <div>
                            <div> {'[ lat:'} {point.lat}, </div>
                            <div> {'  lng:'} {point.lng} ]</div>
                        </div>
                    )}
        </div>
    )
}