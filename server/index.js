var express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var app = express();
var routes = require('./routes');
var config = require('../config');
var swaggerDoc = require('./swaggerDoc');

app.use(bodyParser.urlencoded());

require('dotenv').config();
require('./middleware')(app)

app.use(express.static('client/build'));
swaggerDoc(app)
app.use(routes())

mongoose.set('useNewUrlParser', true)
  .set('useFindAndModify', false)
  .set('useCreateIndex', true)

var url = config.db.url
console.log(url)
mongoose.Promise = global.Promise
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const PORT = config.port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
