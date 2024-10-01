const User = require('../models/user');
const bcrypt = require('bcrypt');
const { uploadImage } = require('../config/cloudinary');

function randomSufix() {
  return Math.trunc(Math.random() * 100000).toString(36);
}

// Criar usuário
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = JSON.parse(req.body.data);
    const salt = await bcrypt.genSalt(10); // 10 é o número de rounds
    const hash = await bcrypt.hash(password, salt);
    let iconUrl;

    if(req.file) {
      const iconName = Date.now().toString(36) + randomSufix();
      const result = await uploadImage(req.file.buffer, 'rpgtools/users', iconName);

      iconUrl = result.secure_url;
    }

    const user = new User({ name, email, hash, iconUrl });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Erro ao criar usuário', error });
  }
};

// Buscar todos os usuários
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};