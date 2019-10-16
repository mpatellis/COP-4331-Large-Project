var express = require('express')
var config = require('../config')

var app = express()

app.use(express.static("client/build"))


const PORT = config.port

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})