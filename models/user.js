const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  iconUrl: {type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);
module.exports.schema = userSchema;