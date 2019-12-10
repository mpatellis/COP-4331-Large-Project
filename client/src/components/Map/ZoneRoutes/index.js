import React from 'react'
import JWT from 'jwt-client'
import axios from 'axios'


const testZones = async (zone) => {
    const token = JWT.get()
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    var newZone = zone
    return await axios
        .post(`/zone/test`, newZone)
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
}

const getOwnedZones = async (zone) => {
    var Res ={Error: {}}
    const token = JWT.get()
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    var newZone = zone
   return await axios
        .get(`/zone/owned`)
        .then(response => { 
            console.log(response.data)
            return response.data   
        })
        .catch(error => {
        })
}

const addZone = async (zone) => {
    const token = JWT.get()
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    var newZone = zone
    return await axios
        .post(`/zone/`, newZone)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return {success: false}
        })
}

const editZone = async (zone) => {
    const token = JWT.get()
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    var newZone = zone
    return await axios
        .patch(`/zone/`, newZone)
        .then(response => {
            return response.data
        })
        .catch(error => {
        })
}

const deleteZone = async (zone) => {
    const token = JWT.get()
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    var newZone = zone
    console.log(newZone)
    return await axios
        .delete(`/zone/`, { data: newZone})
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => {
        })
}

const getChildrenZone = async (zone) => {
    const token = JWT.get()
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    var newZone = zone
    return await axios
        .get(`/zone/children`, { params: newZone})
        .then(response => {
            return response.data
        })
        .catch(error => {
        })
}

const getZoneInfo = async (zone) => {
    const token = JWT.get()
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    var newZone = zone
    return await axios
        .get(`/zone/info`, { params: newZone})
        .then(response => {
            return response.data
        })
        .catch(error => {
        })
}

export {getOwnedZones, getChildrenZone, addZone, editZone, deleteZone, testZones, getZoneInfo}