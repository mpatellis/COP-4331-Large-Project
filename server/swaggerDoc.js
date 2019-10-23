var swaggerUI = require('swagger-ui-express')
var swaggerJsDoc = require('swagger-jsdoc')
require('./routes/index.js')

const options = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'FixIt',
      version: '1.0.0'
    }
  },
  explorer: true,
  // Path to the API docs
  tags: [
    {
      name: 'user',
      description: 'Everything about your Pets'
    }],
  apis: ['server/routes/**/*.js', 'server/*.yaml']
}

const specs = swaggerJsDoc(options)

module.exports = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
  })
}
