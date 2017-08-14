'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var divisionSchema = new Schema({
  clave: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Division', divisionSchema);