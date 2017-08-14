'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zonaSchema = new Schema({
  clave: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true
  },
  nemonico: {
    type: String,
    required: true
  },
  division:{
    type: Object
  }
})

module.exports = mongoose.model('Zona', zonaSchema);