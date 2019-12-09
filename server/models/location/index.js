var mongoose = require('mongoose')

const Schema = mongoose.Schema

exports.pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

exports.polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    default: 'Polygon'
  },
  coordinates: {
    type: [[[Number]]],
    required: true
  }
})
