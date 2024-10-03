const mongoose = require('mongoose');
const {schema: itemSchema} = require('./item');
const {schema: magiaSchema} = require('./magia');
const {schema: efeitoSchema} = require('./efeito');

const personagemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: {type: String},
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  atributos: {
    forca: { type: Number, default: 1 },
    resistencia: { type: Number, default: 1 },
    vida: { type: Number, default: 1 },
    agilidade: { type: Number, default: 1 },
    mana: { type: Number, default: 1 }
  },
  inventario: [itemSchema],
  magias: [magiaSchema],
  efeitos: [efeitoSchema],
  iconUrl: { type: String, required: false }
});

module.exports = mongoose.model('Personagem', personagemSchema);
module.exports.schema = personagemSchema;