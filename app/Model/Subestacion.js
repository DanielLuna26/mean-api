'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subestacionSchema = new Schema({
  clave: {
    type: String, 
    required: true,
    unique: true
  },
  nombre:{
    type: String,
    required: true
  },
  zona:{
    type: Object,
    required: true
  }, 
  latitud:{
    type: String,
    required: true
  },
  longitud:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Subestacion', subestacionSchema);