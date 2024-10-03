const Personagem = require('../models/personagem');
const { uploadImage } = require('../config/cloudinary');

function randomSufix() {
  return Math.trunc(Math.random() * 100000).toString(36);
}

exports.salvar = async (req, res) => {
  try {
    const { nome } = JSON.parse(req.body.data);
    let iconUrl;

    if(req.file) {
      const iconName = Date.now().toString(36) + randomSufix();
      const result = await uploadImage(req.file.buffer, 'rpgtools/itens', iconName);

      iconUrl = result.secure_url;
    }

    const item = new Personagem({ nome, iconUrl });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Erro ao criar item', error });
  }
};

exports.pegarTudo = async (req, res) => {
  try {
    const itens = await Personagem.find();
    res.json(itens);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar itens', error });
  }
};