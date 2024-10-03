const mongoose = require('mongoose');

const efeitoSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  descricao: {type: String, required: true},
  iconUrl: {type: String, required: false }
});

module.exports = mongoose.model('Efeito', efeitoSchema);
module.exports.schema = efeitoSchema;