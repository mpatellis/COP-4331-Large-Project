var _ = require('lodash')
require('dotenv').config()

var config = {
  dev: 'development',
  prod: 'production',
  port: process.env.PORT || 80,
  expireTime: 24 * 60,
  hashlength: 10,
  secrets: {
    jwt: process.env.JWT || 'greenbanana'
  }
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev
config.env = process.env.NODE_ENV

var envConfig
try {
  envConfig = require('./' + config.env)
  envConfig = envConfig || {}
} catch (e) {
  envConfig = {}
}

module.exports = _.merge(config, envConfig)
