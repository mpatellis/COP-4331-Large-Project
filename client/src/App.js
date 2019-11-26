import React from 'react'
import Main from './components/Main'
import axios from 'axios'
import JWT from 'jwt-client'

const token = JWT.get()

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

function App() {
  return <Main />
}

export default App