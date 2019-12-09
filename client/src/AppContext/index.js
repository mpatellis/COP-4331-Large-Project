import React from 'react'
import JWT from 'jwt-client'
import axios from 'axios'


export const AppContext = React.createContext()

export const AppProvider = props => {
    const [page, setPage] = React.useState('login')



    return (
        <AppContext.Provider 
        value={[page, setPage]}
        >
            {props.children}
        </AppContext.Provider>
    )
}