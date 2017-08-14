'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var concentradorSchema = new Schema({
  ip: {
    type: String,
    required: true,
    unique: true
  },
  subestacion:{
    type: Object,
    required: true
  },
  ultimo_status:{
    type: String,
    required: true
  },
  ts_ultimo_status:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Concentrador', concentradorSchema);