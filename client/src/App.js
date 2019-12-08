import React from 'react'
import Main from './components/Main'
import axios from 'axios'
import JWT from 'jwt-client'
import {AppProvider} from './AppContext'

const token = JWT.get()

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

function App() {
  return (
    <AppProvider>
      <Main />
      </AppProvider>
  )
}

export default App