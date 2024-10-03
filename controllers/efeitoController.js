const Efeito = require('../models/efeito');
const { uploadImage } = require('../config/cloudinary');

function randomSufix() {
  return Math.trunc(Math.random() * 100000).toString(36);
}

exports.salvar = async (req, res) => {
  try {
    const { nome, descricao } = JSON.parse(req.body.data);
    let iconUrl;

    if(req.file) {
      const iconName = Date.now().toString(36) + randomSufix();
      const result = await uploadImage(req.file.buffer, 'rpgtools/efeitos', iconName);

      iconUrl = result.secure_url;
    }

    const efeito = new Efeito({ nome, descricao, iconUrl });
    await efeito.save();
    res.status(201).json(efeito);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Erro ao criar o efeito', error });
  }
};

exports.pegarTudo = async (req, res) => {
  try {
    const magias = await Efeito.find();
    res.json(magias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os efeitos', error });
  }
};