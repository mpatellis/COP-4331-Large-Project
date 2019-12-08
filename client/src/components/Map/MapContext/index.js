import React from 'react'
import JWT from 'jwt-client'
import axios from 'axios'

const testZones = async (zone) => {
    const token = JWT.get()
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    var newZone = zone
    await axios
        .post(`/zone/test`, newZone)
        .then(response => {
        })
        .catch(error => {
        })
}

const getZones = async (zone) => {
    var Res ={Error: {}}
    const token = JWT.get()
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    var newZone = zone
    await axios
        .get(`/zone/`)
        .then(response => { 
            console.log(response.data)
            Res = response.data
            
        })
        .catch(error => {
        })
    return Res
}

const addZone = async (zone) => {
    const token = JWT.get()
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    var newZone = zone
    await axios
        .post(`/zone/`, newZone)
        .then(response => {
        })
        .catch(error => {
        })
}

const editZone = async (zone) => {
    const token = JWT.get()
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    var newZone = zone
    await axios
        .patch(`/zone/`, newZone)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
        })
}

export const MapContext = React.createContext()

export const MapProvider = props => {
    const [zones, setZones] = React.useState([])
    const [cords, setCords] = React.useState([])
    const [zoneData, setZoneData] = React.useState([])
    
    getZones().then(res => {
        for (var z in res) {
            zones.push(res[z])
        }
        if (zones[0]) {
        var tmp = zones[0]
        tmp.zone_id = tmp._id
        tmp.name = "test"
        editZone(tmp)
        }
    })
    console.log(process.env)


    return (
        <MapContext.Provider 
        value={[zones, setZones, cords, setCords, testZones, addZone]}
        >
            {props.children}
        </MapContext.Provider>
    )
}