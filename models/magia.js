const mongoose = require('mongoose');
const { schema: efeitoSchema } = require('../models/efeito');

const magiaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  descricao: {type: String, required: true},
  efeitos: { type: [efeitoSchema], required: true},
  iconUrl: {type: String, required: false }
});

module.exports = mongoose.model('Magia', magiaSchema);
module.exports.schema = magiaSchema;