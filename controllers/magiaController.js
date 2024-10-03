const Magia = require('../models/magia');
const { uploadImage } = require('../config/cloudinary');

function randomSufix() {
  return Math.trunc(Math.random() * 100000).toString(36);
}

exports.salvar = async (req, res) => {
  try {
    const { nome, descricao, efeitos } = JSON.parse(req.body.data);
    let iconUrl;

    if(req.file) {
      const iconName = Date.now().toString(36) + randomSufix();
      const result = await uploadImage(req.file.buffer, 'rpgtools/magias', iconName);

      iconUrl = result.secure_url;
    }

    const magia = new Magia({ nome, descricao, efeitos, iconUrl });
    await magia.save();
    res.status(201).json(magia);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Erro ao criar magia', error });
  }
};

exports.pegarTudo = async (req, res) => {
  try {
    const magias = await Magia.find();
    res.json(magias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar magias', error });
  }
};