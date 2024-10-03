const mongoose = require('mongoose');
const { schema: efeitoSchema } = require('../models/efeito');
const {schema: magiaSchema} = require('./magia');

const itemSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  efeitos: { type: [efeitoSchema], required: true},
  magias: { type: [magiaSchema], required: true},
  durabilidade: { type: Number, required: true },
  dano: { type: Number, required: true },
  iconUrl: { type: String, required: false }
});

module.exports = mongoose.model('Item', itemSchema);
module.exports.schema = itemSchema;